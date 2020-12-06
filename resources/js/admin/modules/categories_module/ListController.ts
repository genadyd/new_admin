import AbstractListController from "../../app/controllers/list_controllers/AbstractListController";
import ListBuilder from "./list/html_builders/ListBuilder";
import AbstractPaginationBuilder from "../../app/UI/list_builders/AbstractPaginationBuilder";
import PaginationBuilder from "./list/html_builders/PaginationBuilder";
import StateManagerInterface from "../../app/state_manager/StateManagerInterface";
import ListProcessor from "../../app/list_processor/AbstractListProcessor";
class ListController extends AbstractListController{
    // protected token:any
    protected listener: any
    protected controlsControllerObject:any
    protected listContainer = document.getElementById('categories_list_container')

    constructor(stateManager:StateManagerInterface, listProcessor:ListProcessor) {
       super(stateManager,listProcessor)
        this.getListBuilder()
        /*parent abstract list controllers methods */
        this.includeDeleted()
        this.onlyDeleted()
        this.sortByDate()
        this.searchItems()
        this.pageSwitch()
        this.renderPerPage()
        this.sortByField()
        /*parent abstract list controllers methods */
    }

    protected getListBuilder=() => {
        return new ListBuilder()
    }

    protected getPaginationBuilder(): AbstractPaginationBuilder {
        return new PaginationBuilder();
    }

    public renderList =()=> {
        const list = this.listProcessor.getList()
        const builder = this.getListBuilder()
        const listHtml: string = builder.build(list)
        const tableContainer = document.querySelector('#categories_list_container .table .table_body')
        if (tableContainer) {
            tableContainer.innerHTML = listHtml
        }
        const paginationContainer = document.querySelector('.cat_list_nav')
        const pagination = this.getPaginationBuilder()

        if (paginationContainer) {
            paginationContainer.innerHTML = pagination.build(this.renderPaginationButtons(list))
        }
        this.setListItemsNumberMaxParam(list)
    }

}

export default ListController
