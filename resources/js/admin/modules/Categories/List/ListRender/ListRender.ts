import ShipListFilters from "../../../../app/Ship/Components/List/ShipListFilters";
import ListBuilder from "../html_builders/ListBuilder";
import PaginationBuilder from "../html_builders/PaginationBuilder";
import ShipListSearch from "../../../../app/Ship/Components/List/ShipListSearch";
import StatesRepository from "../../../../app/Ship/State/StatesRepository";


class ListRender implements ShipListRendersInterface{

    public  render(state: any) {
        const filteredList = ListRender.listFilter(state)
        const listHtml = ListRender.htmlBuilder(filteredList)
        const lastPage = Math.ceil(filteredList.length / state.per_page)
        let currentPage = state.current_page
        if (currentPage > lastPage) {
            state.current_page = lastPage
        }
        const tableBody = document.querySelector('#categories_list_container .table_container .table_body')
        if (tableBody) tableBody.innerHTML = listHtml
        const paginatorContainer:any = document.querySelector('#categories_list_container .pagination')!
        paginatorContainer.innerHTML = ListRender.paginationBuilder(state, filteredList)
        ListRender.perPageNumberFill(state,filteredList)
    }

    private static listFilter(state: any) {
        const listFilters = new ShipListFilters()
        let list = [...state.list.filter((item: any) => item.parent === state.parent_id)]
        list = ShipListSearch.search( list, state.search_string,['heading', 'name'])
        list = listFilters.sortByField(list, state.sort_by)
        list = listFilters.includeDeleted(list, state.include_deleted)
        list = listFilters.onlyDeleted([...list], state.only_deleted)
        list = listFilters.renderPerPage(list, state.per_page, state.current_page)
        return list
    }

    private static  htmlBuilder(filteredList: any) {
        const htmlBuilder = new ListBuilder()
        return htmlBuilder.build(filteredList)
    }

    private static  paginationBuilder(state:any, filteredList:any[]){
       if(filteredList.length>+state.per_page) {
           const itemsNum = filteredList.reduce((acc:number, current:any)=>{
            return current.parent === 0? acc+1:acc
           },0)
           state.last_page = Math.ceil(itemsNum/state.per_page)/*all button number*/
           console.log(state.per_page)
           state.end_page = 3
           ListRender.setStartPage(state)
           ListRender.setEndPage(state)
           const paginatingBuilder = new PaginationBuilder()
           return paginatingBuilder.build(state)
       }
       return ''
    }
    private static setStartPage(state:any){
        state.start_page = 1
        if(state.current_page !==1 ){
            if(state.current_page != state.last_page){
                state.start_page = (state.start_page = (state.current_page-1))
            }else{
                if((state.current_page-2)>=1){
                    state.start_page = (state.current_page-2)
                }else{
                    state.start_page = 1
                }
            }
        }
    }

    private static setEndPage(state:any){
        if(state.end_page > state.last_page){
            state.end_page = state.last_page
        }else {
            if (state.current_page !== 1) {
                if (state.current_page !== state.last_page) {
                    if ((state.current_page + 1) >= state.last_page) {
                        state.end_page = state.last_page
                    } else {
                        state.end_page = (state.current_page + 1)
                    }
                } else {
                    state.end_page = state.last_page

                }
            }
        }
    }

    /*
    * fill per_page field (if state.per_page > list length)
    * @state:object module state object
    * @filteredList:array of objects - list where item parent == 0
    *
    * */
    private static perPageNumberFill(state:any,filteredList:any[]){
        let perPage = state.per_page
        if(perPage>filteredList.length){
            perPage = filteredList.length
        }
        const perPageField:any = document.querySelector('input#per_page')!
        perPageField.value = perPage
    }

}

export default ListRender
