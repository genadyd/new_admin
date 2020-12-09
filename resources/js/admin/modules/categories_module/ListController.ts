import AbstractListController from "../../app/controllers/list_controllers/AbstractListController";
import StateManagerInterface from "../../app/state_manager/StateManagerInterface";

class ListController extends AbstractListController{
    // protected token:any
    protected listener: any
    protected controlsControllerObject:any
    protected listContainer = document.getElementById('categories_list_container')

    constructor(stateManager:StateManagerInterface) {
       super(stateManager)
        /*parent abstract list controllers methods */
        this.includeDeleted()
        this.onlyDeleted()
        this.sortByDate()
        this.searchItems()
        this.pageSwitch()
        this.renderPerPage()
        this.sortByField()
    }

}

export default ListController
