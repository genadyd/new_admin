import ShipListFilters from "../../app/Ship/Components/List/ShipListFilters";
import ListBuilder from "./list/html_builders/ListBuilder";
import PaginationBuilder from "./list/html_builders/PaginationBuilder";
import ShipListSearch from "../../app/Ship/Components/List/ShipListSearch";


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
        const paginatorContainer = document.querySelector('#categories_list_container .pagination')
        if(paginatorContainer) paginatorContainer.innerHTML = ListRender.paginationBuilder(state)
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
    private static  paginationBuilder(state:any){
        const paginatingBuilder = new PaginationBuilder()
       return  paginatingBuilder.build(state)
    }

}

export default ListRender
