import AbstractListProcessor from "../../../app/list_processor/AbstractListProcessor";
import {recursiveSearchFunction} from "../../../lib/list_search_recursive/recursive_search";

class ListProcessor extends AbstractListProcessor{

    public getList(list = [...this.state.list.filter((item:any)=>item.parent === 0)]) {
        list = this.searchItems(list)
        list = this.sortByField(list)
        list = this.includeDeleted(list)
        list = this.onlyDeleted(list)
        list = this.checkItemIfReallyHasChildren(list)
        list = this.renderPerPage(list)
        return list
    }
    protected searchItems(list: any[]) {
           return this.state.search_string !=='' ? recursiveSearchFunction(this.state.search_string,['heading','name'], [...this.state.list]):list
    }
}
export default ListProcessor
