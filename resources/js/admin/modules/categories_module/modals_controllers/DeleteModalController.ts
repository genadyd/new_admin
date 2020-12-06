import CategoriesApi from "../../../app/api/CategoriesApi";
import {itemFindById, itemsFindTree} from "../../../lib/item_find/items_find";

class DeleteModalController implements ModalControllerInterface{
    protected stateManager:any
    protected token:string|null
    protected listRenderFunc:any
    constructor(stateManager:any) {
        this.stateManager = stateManager
        const tokenElem = document.querySelector('[name=csrf-token]')
        this.token = tokenElem? tokenElem.getAttribute('content') : ''
        this.confirmModal()
    }
    setListRenderFunction(listRenderFunc:any, context:any){
        this.listRenderFunc = listRenderFunc.bind(context)
    }
    closeModal() {
        const table = document.querySelector('.items_list_container .table')
        const buttons: any = document.querySelectorAll('#itemDeleteModal .modal_close')
        if (buttons) {
            buttons.forEach((button: any) => {
                button.addEventListener('click', () => {
                    if (table) {
                        let readyToDelete: any = table.querySelectorAll('.table_body .one_item.ready_to_delete')
                        if (readyToDelete.length > 0) {
                            readyToDelete.forEach(
                                (item: any) => {
                                    item.classList.remove('ready_to_delete')
                                }
                            )
                        }
                    }
                })
            })
        }
    }

    confirmModal(): void {
        const button = document.querySelector('#itemDeleteModal .modal_confirm')
        if (button) {
            button.addEventListener('click', (e) => {
                const readySelectionElement:any = document.querySelector('.items_list_container .table_body .one_item.ready_to_delete')
                if(!readySelectionElement) return
                const itemId = readySelectionElement.dataset.id
                const list = this.stateManager.getState('list')
                let idsList:any = []
                const element = itemFindById(list, +itemId)
                if(element){
                    idsList = itemsFindTree(element)
                }
                const formData = {
                    ids: idsList,
                    'X-CSRF-TOKEN': this.token ? this.token : ''
                }
                const Api = new CategoriesApi('/admin/categories/category_delete', 'POST', {formData: JSON.stringify(formData)})
                const promise: any = Api.exeq()
                promise.then((res: any) => {
                        if (res.deleted_num > 0) {
                            // const list = this.stateManager.getState('list')
                            res.deleted_items.forEach((item:any)=>{
                                let element:any = itemFindById(list, +item.id)
                                element.deleted_at = item.deleted_at
                            })
                            this.listRenderFunc()
                            const closeButton: any = document.querySelector('#itemDeleteModal .modal_close')
                            if(closeButton) closeButton.click()
                        }
                    }
                )
            })
        }
    }

    renderModal(modalData: any): void {
    }

}
export default DeleteModalController
