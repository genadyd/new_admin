import AbstractListController from "../../app/Ship/Interfaces/ListControllers/AbstractListController";
import StateManagerInterface from "../../app/state_manager/StateManagerInterface";

class ListController extends AbstractListController{
    // protected token:any
    protected listener: any
    protected controlsControllerObject:any


    constructor(protected shipState: ShipStateInterface) {
       super(shipState)
       this.listContainer = document.getElementById('categories_list_container')
        /*parent abstract list controllers methods */
        this.includeDeleted()
        this.onlyDeleted()
        // this.sortByDate()
        this.searchItems()
        this.pageSwitch()
        this.renderPerPage()
        this.sortByField()
    }

}

export default ListController
