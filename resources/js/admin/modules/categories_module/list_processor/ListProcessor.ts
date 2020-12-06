import AbstractListProcessor from "../../../app/list_processor/AbstractListProcessor";
import StateManagerInterface from "../../../app/state_manager/StateManagerInterface";
import {recursiveSearchFunction} from "../../../lib/list_search_recursive/recursive_search";

class ListProcessor extends AbstractListProcessor{
    constructor(stateManager: StateManagerInterface) {
        super(stateManager);
    }
    public getList() {
        let list = [...this.stateManager.getState('list')]
        list = this.searchItems(list)
        list = this.sortByField(list)
        list = this.includeDeleted(list)
        list = this.onlyDeleted(list)
        list = this.renderPerPage(list)
        return list
    }
    protected searchItems(list: any[]) {
        const searchString = this.stateManager.getState('search_string')
           return searchString ? recursiveSearchFunction(searchString,['heading','name'], list):list
    }
}
export default ListProcessor
