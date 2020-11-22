import ListControlsControllerInterface from "./ListControlsControllerInterface";
import DeleteModalController from "../../../../modules/categories_module/modals_controllers/DeleteModalController";
import {itemFindFunc} from "../../../../lib/item_find/item_find";

abstract class AbstractListControlsController implements ListControlsControllerInterface {
    protected list: any
    protected listRenderFunction: any
    protected listContainer: HTMLElement | null = document.querySelector('.items_list_container')
    protected stateManager: any
    protected token: string
    protected table:any
    protected abstract infoModalController:ModalControllerInterface
    protected abstract deleteModal:ModalControllerInterface
    protected abstract childrenListView?():void

    protected constructor(stateManager: any) {
        this.table= document.querySelector('.items_list_container .table')
        this.stateManager = stateManager
        this.token = this.getToken()

    }

    protected getToken(): any {
        const tokenElement = document.querySelector('[name=csrf-token]')
        return tokenElement ? tokenElement.getAttribute('content') : ''
    }

    public getRenderFunc(listRenderFunction: any, context: any) {
        this.listRenderFunction = listRenderFunction.bind(context)
    }

    public itemDelete(): void {
        this.deleteModal.closeModal()
        if (this.listContainer) {
            this.listContainer.addEventListener('click', (e: any) => {
                const target = e.target
                if (target.classList.contains('delete')) {
                    if (target) {
                        const table = target.closest('table')
                        // if (table) {
                        let readyToDelete: any[] = table.querySelectorAll('tbody tr.ready_to_delete')
                        if (readyToDelete.length > 0) {
                            readyToDelete.forEach(
                                (item: any) => {
                                    item.classList.remove('ready_to_delete')
                                }
                            )
                        }
                        // }
                        let closestTr = target.closest('tr')
                        if (closestTr) {
                            closestTr.classList.add('ready_to_delete')
                            this.deleteModal.confirmModal(this.listRenderFunction)
                        }
                    }
                }
            })
        }
    }
    protected itemInfo(): void {
        const table = document.querySelector('.items_list_container .table')
        if (table) {
            table.addEventListener('click', (e: any) => {
                let infoActiveItem: any = table.querySelectorAll('tbody tr.info_active')
                const target = e.target
                if (target.classList.contains('info')) {
                    let itemElement = target.closest('tr')
                    let itemId = itemElement.dataset.id
                    if (infoActiveItem.length > 0) {
                        infoActiveItem.forEach(
                            (item: any) => {
                                item.classList.remove('info_active')
                            }
                        )
                    }
                    itemElement.classList.add('info_active')
                    const list  = this.stateManager.getState('list')
                    const modalData: any = itemFindFunc(list,+itemId)
                    this.infoModalController.renderModal(modalData)
                }
            })
        }
    }
    protected openFormForAddChildrenItem(){
            this.table.addEventListener('click',(e:any)=>{
                const target:any = e.target
                if(target.classList.contains('add_into_this')){
                    const formOpenCloseButton:any = document.querySelector('#add_new_form_open')
                    const parentId = target.closest('tr').dataset.id
                    const form:any = document.querySelector('.form_container .entity_form')
                    formOpenCloseButton.click();
                    form.querySelector('input.parent_id').value = parentId

                }
            })
    }




    itemUpdate(): void {
    }

}

export default AbstractListControlsController
