import CategoriesApi from "../../../app/api/CategoriesApi";
import {findChildrenIdsList, itemFindById, itemsFindTree} from "../../../lib/item_find/items_find";
import StatesRepository from "../../../app/Ship/State/StatesRepository";

class DeleteModalController implements ModalControllerInterface{
    protected token:string|null
    protected listRenderFunc:any
    private readonly MODULE_STATE_CONTAINER_NAME:string = 'categoriesState'
    constructor(protected stateRepo:StatesRepository) {
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
                const list = this.stateRepo.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'list')
                const indexes = this.stateRepo.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'indexes')
                const ids = findChildrenIdsList(+itemId,list)

                const formData = {
                    ids: ids,
                    'X-CSRF-TOKEN': this.token ? this.token : ''
                }
                const Api = new CategoriesApi('/admin/categories/category_delete', 'POST', {formData: JSON.stringify(formData)})
                const promise: any = Api.exeq()
                promise.then((res: any) => {
                    ids.forEach((item:any)=>{
                        const element = list[indexes[item]]
                                const date = new Date()
                                element.deleted_at = date.getFullYear()+'-'+date.getMonth()+1+'-'+date.getDate()+' '+
                                    date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
                            })
                            this.stateRepo.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'list',list)
                            const closeButton: any = document.querySelector('#itemDeleteModal .modal_close')
                            if(closeButton) closeButton.click()
                        })
                    }
                )
            }
        }

    renderModal(modalData: any): void {
    }

}
export default DeleteModalController
