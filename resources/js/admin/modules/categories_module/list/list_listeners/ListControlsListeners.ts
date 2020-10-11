import AbstractListController from "../controllers/AbstractListController";
import ListControlsController from "../controllers/ListControlsController";

class ListControlsListeners{
    private listContainer:HTMLElement|null = document.getElementById('categories_list_container')
    private listController = new ListControlsController()
    constructor() {

        this.categoryDeleteButtonOnclick()
        this.modalCloseWithoutSave()
        this.categoryDeleteConfirm()
    }
    private categoryDeleteButtonOnclick() {
        if (this.listContainer) {
            const cont = this.listContainer
            this.listContainer.addEventListener('click', (e: any) => {
                const target = e.target
                if (target && (target.classList.contains('category_delete_button') || target.matches('span.material-icons.delete'))) {
                    cont.querySelectorAll('tr.ready_to_delete').forEach((i) => {
                        i.classList.remove('ready_to_delete')
                    })
                    target.closest('tr').classList.add('ready_to_delete')
                }
            })
        }
    }

    private modalCloseWithoutSave() {
        const closeButtons = document.querySelectorAll('#categoryDeleteModal .modal-content .modal_close')
        const listContainer = this.listContainer
        if (closeButtons) {
            closeButtons.forEach((i) => {
                i.addEventListener('click', () => {
                    if (listContainer) {
                        listContainer.querySelectorAll('tr.ready_to_delete').forEach((i) => {
                            i.classList.remove('ready_to_delete')
                        })
                    }
                })
            })
        }
    }

    categoryDeleteConfirm() {
        const submitButton: any = document.querySelector('#categoryDeleteModal .modal-content .modal_confirm')
        const closeButton:any = document.querySelector('#categoryDeleteModal .modal-content .modal_close')
        const listContainer = this.listContainer
        if (submitButton) {
            submitButton.onclick = () => {
                if (listContainer) {
                    const target: any = listContainer.querySelector('tr.ready_to_delete')
                    const id = target.dataset.id
                    this.listController.categoryDeleteConfirm(+id)
                    if(closeButton) closeButton.click()
                }
            }
        }
    }
}
export default ListControlsListeners
