import CategoriesStateObj from "../../../../states/content/categories/CategoriesState";
import RegularRender from "../renders/list_render/RegularRender";
import RegularListBuilder from "../html_builders/html_list_builder/RegularListBuilder";


abstract class AbstractListController implements ListControllerInterface{
    protected store:any
    protected token:any
    protected promise:any
    constructor() {
        this.store = CategoriesStateObj
        this.token = document.querySelector('[name=csrf-token]')
    }

    public regularPage = (curentPage: number) => {
        this.store.setState('current_page', curentPage)
        const render = new RegularRender(this.store)
        render.listRender(new RegularListBuilder())
    }
}
export default AbstractListController
