import CategoriesApi from "../../../app/api/CategoriesApi";

class DeleteModalController implements ModalControllerInterface{
    protected stateManager:any
    protected token:string|null
    constructor(stateManager:any) {
        this.stateManager = stateManager
        const tokenElem = document.querySelector('[name=csrf-token]')
        this.token = tokenElem? tokenElem.getAttribute('content') : ''
    }
    closeModal() {
        const table = document.querySelector('.items_list_container .table')
        const buttons: any = document.querySelectorAll('#itemDeleteModal .modal_close')
        if (buttons) {
            buttons.forEach((button: any) => {
                button.addEventListener('click', () => {
                    if (table) {
                        let readyToDelete: any = table.querySelectorAll('tbody tr.ready_to_delete')
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
    confirmModal(renderFunc:any): void {
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
                            const list = this.stateManager.getState('list')
                            const deletedIndex = list.findIndex((item:any) =>item.id === +itemId)
                            list[deletedIndex].deleted_at = res[1]
                            renderFunc()
                            const button: any = document.querySelector('#itemDeleteModal .modal_close')
                            if(button) button.click()
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
