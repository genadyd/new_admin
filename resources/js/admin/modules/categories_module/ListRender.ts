import ListBuilder from "./list/html_builders/ListBuilder";
import PaginationBuilder from "./list/html_builders/PaginationBuilder";
import ListProcessor from "./list_processor/ListProcessor";

class ListRender{
    private readonly state:any
    constructor(state:any) {
        this.state = state
    }
    public  renderList =(list:any[] = [] )=> {
        const listProcessor = new ListProcessor(this.state)
        const resList = list.length ===0 ? listProcessor.getList(): listProcessor.getList(list)
        const builder = new ListBuilder()
        const listHtml: string = builder.build(resList)
        if(list.length ===0){
            this.renderMainList(resList,listHtml )
        } else{
            ListRender.renderChildList(resList,listHtml)
        }

    }
    private renderMainList(resList:any[],listHtml:string){
        const tableContainer = document.querySelector('#categories_list_container .table .table_body')
        if (tableContainer) {
            tableContainer.innerHTML = listHtml
        }
        const paginationContainer = document.querySelector('.cat_list_nav')
        const pagination = new PaginationBuilder()

        if (paginationContainer) {
            paginationContainer.innerHTML = pagination.build(this.renderPaginationButtons(resList))
        }
        this.setListItemsNumberMaxParam(resList)
    }
    private static renderChildList(resList:any[],listHtml:string){
        if(resList.length >0) {
            const parentId = resList[0].parent
            const target = document.querySelector('.one_item[data-id="' + parentId + '"] .one_cat_body')
            if (target) target.innerHTML = listHtml
        }

    }

    protected renderPaginationButtons(list: any) {
        const lastPage = Math.ceil(list.length / +this.state.per_page)
        const objectToBuilder = {
            start_page: 1,
            current_page: +this.state.current_page,
            last_page: +lastPage,
            buttons_num: lastPage < 3 ? lastPage : 3
        }
        if (objectToBuilder.current_page == objectToBuilder.last_page) { /*if last page*/
            if (objectToBuilder.last_page > 2) {
                objectToBuilder.start_page = objectToBuilder.current_page - 2
                objectToBuilder.buttons_num = objectToBuilder.last_page
            } else if (objectToBuilder.last_page == 2) {
                objectToBuilder.start_page = objectToBuilder.current_page - 1
                objectToBuilder.buttons_num = objectToBuilder.last_page
            } else {
                objectToBuilder.buttons_num = 0
            }
        } else if (objectToBuilder.current_page > 1 && objectToBuilder.current_page < objectToBuilder.last_page) {
            objectToBuilder.start_page = objectToBuilder.current_page - 1
            objectToBuilder.buttons_num = objectToBuilder.current_page + 1
        } else {
            objectToBuilder.start_page = 1
        }

        return objectToBuilder
    }

    protected setListItemsNumberMaxParam = (list: any[]) => {
        const perPageInput: any = document.getElementById('per_page')
        if (perPageInput) {
            let len:any = list.length
            perPageInput.setAttribute('max', len)
            if (this.state.per_page > len) {
                perPageInput.value = len
            } else {
                perPageInput.value = this.state.per_page
            }
        }
    }
}
export default ListRender
