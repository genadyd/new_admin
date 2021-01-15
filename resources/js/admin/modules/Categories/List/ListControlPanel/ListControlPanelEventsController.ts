import AbstractListControlPanelEventsController from "../../../../app/Ship/Components/List/AbstractListControlPanelEventsController";
import StatesRepository from "../../../../app/Ship/State/StatesRepository";

class ListControlPanelEventsController extends AbstractListControlPanelEventsController{
    protected listener: any
    protected controlsControllerObject:any


    constructor(protected shipState: StatesRepository) {
       super(shipState)
        this.MODULE_STATE_CONTAINER_NAME = 'categoriesState'
       this.listContainer = document.getElementById('categories_list_container')
        /*parent abstract list controllers methods */
        this.includeDeleted()
        this.onlyDeleted()
        this.searchItems()
        this.pageSwitch()
        this.renderPerPage()
        this.sortByField()
    }

}

export default ListControlPanelEventsController
