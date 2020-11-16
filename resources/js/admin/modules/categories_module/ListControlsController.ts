import AbstractListControlsController
    from "../../app/controllers/list_controllers/list_controls_controller/AbstractListControlsController";
import CategoriesApi from "../../app/api/CategoriesApi";
import ListControlsControllerInterface
    from "../../app/controllers/list_controllers/list_controls_controller/ListControlsControllerInterface";
import InfoModalController from "./modals_controllers/InfoModalController";

class ListControlsController extends AbstractListControlsController implements ListControlsControllerInterface{
     protected infoModalController:ModalControllerInterface
    constructor(stateManager:any) {
        super(stateManager);
        this.infoModalController = new InfoModalController()
        this.itemInfo()
        this.itemDelete()
        this.deleteModalCloseWithoutSave()
        this.deleteConfirm()
    }


    deleteConfirm(){
        const button = document.querySelector('#itemDeleteModal .modal_confirm')
        if (button) {
            button.addEventListener('click', () => {
                const readySelectionElement:any = document.querySelector('.items_list_container tbody tr.ready_to_delete')
                if(!readySelectionElement) return
                const itemId = readySelectionElement.dataset.id
                const formData = {
                    id: itemId,
                    'X-CSRF-TOKEN': this.token ? this.token : ''
                }
                const Api = new CategoriesApi('/admin/categories/category_delete', 'POST', {formData: JSON.stringify(formData)})
                const promise: any = Api.exeq()
                promise.then((res: any[]) => {
                        if (res[0] == 1) {
                            const list = this.list.getState('list')
                            const deletedIndex = list.findIndex((item:any) =>item.id === +itemId)
                            const currentPage = this.stateManager.getState('current_page')
                            list[deletedIndex].deleted_at = res[1]
                            this.listRenderFunction(currentPage)
                        }
                    }
                )
            })
        }
    }


    itemUpdate(): void {
    }

    public categoryRestore(id:number){
        // const formData = {
        //     action: {},
        //     id: id,
        //     'X-CSRF-TOKEN': this.token ? this.token.getAttribute('content') : ''
        // }
        // const Api = new CategoriesApi('/admin/categories/category_restore', 'POST', {formData: JSON.stringify(formData)})
        // const promise: any = Api.exeq()
        // promise.then((res: number) => {
        //         if (res === 1) {
        //             const deletedIndex = this.store.findIndexOfItemsByItemId('categories', id)
        //             const currentPage = this.store.getState('current_page')
        //             const categories = this.store.getState('categories')
        //             categories[deletedIndex].deleted_at = null
        //             this.regularPage(currentPage)
        //         }
        //     }
        // )
    }

}


export default ListControlsController
