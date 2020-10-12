import CategoriesApi from "../../../../api/CategoriesApi";
import AbstractListController from "./AbstractListController";

class ListControlsController extends AbstractListController implements ListControllerInterface{
    public categoryDeleteConfirm(id: number) {
        const formData = {
            action: {},
            id: id,
            'X-CSRF-TOKEN': this.token ? this.token.getAttribute('content') : ''
        }
        const Api = new CategoriesApi('/admin/categories/category_delete', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
        promise.then((res: any[]) => {
                if (res[0] == 1) {
                    const deletedIndex = this.store.findIndexOfItemsByItemId('categories', id)
                    const currentPage = this.store.getState('current_page')
                    const categories = this.store.getState('categories')
                    categories[deletedIndex].deleted_at = res[1]
                    this.regularPage(currentPage)
                }
            }
        )
    }
    public categoryRestory(id:number){
        const formData = {
            action: {},
            id: id,
            'X-CSRF-TOKEN': this.token ? this.token.getAttribute('content') : ''
        }
        const Api = new CategoriesApi('/admin/categories/category_restore', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
        promise.then((res: number) => {
                if (res === 1) {
                    const deletedIndex = this.store.findIndexOfItemsByItemId('categories', id)
                    const currentPage = this.store.getState('current_page')
                    const categories = this.store.getState('categories')
                    categories[deletedIndex].deleted_at = null
                    this.regularPage(currentPage)
                }
            }
        )
    }

}


export default ListControlsController
