import ListItemsControlsEventsControllerInterface from "./ListItemsControlsEventsControllerInterface";
import {itemFindById} from "../../../../lib/item_find/items_find";
import StatesRepository from "../../State/StatesRepository";

abstract class AbstractListItemsControlsEventsController implements ListItemsControlsEventsControllerInterface {
    protected listRenderFunction: any
    protected listContainer: HTMLElement | null = document.querySelector('.items_list_container')
    protected token: string
    protected table:any
    protected MODULE_STATE_CONTAINER_NAME: string | undefined
    protected abstract infoModalController:ModalControllerInterface
    // protected abstract deleteModal:ModalControllerInterface
    protected abstract childrenListView?():void

    protected constructor(protected shipState: StatesRepository) {
        this.table= document.querySelector('.items_list_container .table')
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
        if (this.listContainer) {
            this.listContainer.addEventListener('click', (e: any) => {
                const target = e.target
                if (target.classList.contains('delete')) {
                    if (target) {
                        const table = target.closest('.table')
                        let readyToDelete: any[] = table.querySelectorAll('.table_body .one_item.ready_to_delete')
                        if (readyToDelete.length > 0) {
                            readyToDelete.forEach(
                                (item: any) => {
                                    item.classList.remove('ready_to_delete')
                                }
                            )
                        }
                        let closestTr = target.closest('.one_item')
                        if (closestTr) {
                            closestTr.classList.add('ready_to_delete')
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
                let infoActiveItem: any = table.querySelectorAll('.table_body .one_item.info_active')
                const target = e.target
                if (target.classList.contains('info')) {
                    let itemElement = target.closest('.one_item')
                    let itemId = itemElement.dataset.id
                    if (infoActiveItem.length > 0) {
                        infoActiveItem.forEach(
                            (item: any) => {
                                item.classList.remove('info_active')
                            }
                        )
                    }
                    itemElement.classList.add('info_active')
                    const list  = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'list')
                    const modalData: any = itemFindById(list,+itemId)
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
                    const parentId = target.closest('.one_item').dataset.id
                    const form:any = document.querySelector('.form_container .entity_form')
                    formOpenCloseButton.click();
                    form.querySelector('input.parent_id').value = parentId

                }
            })
    }




    itemUpdate(): void {
    }

}

export default AbstractListItemsControlsEventsController
