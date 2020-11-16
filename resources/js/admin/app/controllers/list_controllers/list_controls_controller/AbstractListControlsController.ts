import ListControlsControllerInterface from "./ListControlsControllerInterface";

abstract class AbstractListControlsController implements ListControlsControllerInterface {
    protected list: any
    protected listRenderFunction: any
    protected listContainer: HTMLElement | null = document.querySelector('.items_list_container')
    protected stateManager: any
    protected token: string
    protected abstract infoModalController:ModalControllerInterface

    protected constructor(stateManager: any) {
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
                        }
                    }
                }
            })
        }
    }

    protected deleteModalCloseWithoutSave() {
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

    protected getItemById(id: number) {
        const list = this.stateManager.getState('list')
        let res = list.find((val: any) => +val.id === +id)
        return res
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
                    const modalData: any = this.getItemById(itemId)
                    this.infoModalController.renderModal(modalData)
                }
            })

        }
    }

    itemUpdate(): void {
    }

}

export default AbstractListControlsController