
import StatesRepository from "../../State/StatesRepository";
/*
* list events controller for list control panel
* */

abstract class AbstractListControlPanelEventsController {
    protected token: any
    protected listener: any
    protected controls: any
    protected listContainer:any
    protected MODULE_STATE_CONTAINER_NAME:string = ''

    protected constructor(protected shipState:StatesRepository) {

    }

    protected getToken() {
        const tokenElement = document.querySelector('[name=csrf-token]')
        this.token = tokenElement ? tokenElement.getAttribute('content') : ''
    }
    protected includeDeleted() {
        if (this.listContainer) {
            const includeDeletedInput:Element|null = this.listContainer.querySelector('.list_control_panel #include_deleted')
            if (includeDeletedInput) {
                includeDeletedInput.addEventListener('click', () => {
                    const onlyDeletedCheckBox: any = document.querySelector('.list_control_panel #only_deleted')
                    if (this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'include_deleted')
                        && this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'only_deleted')) {
                        this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'only_deleted', false,()=>{})
                        if (onlyDeletedCheckBox) onlyDeletedCheckBox.checked = false
                    }
                    this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'include_deleted',
                        !this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'include_deleted'))
                })
            }
        }
    }

    protected onlyDeleted() {
        if (this.listContainer) {
            const onlyDeletedInput:Element = this.listContainer.querySelector('#only_deleted')
            if (onlyDeletedInput) {
                onlyDeletedInput.addEventListener('input', (e: any) => {
                    const checkBox: any = e.target
                    if (checkBox) {
                        const includeDeletedCheckBox:HTMLInputElement = document.getElementById('include_deleted') as HTMLInputElement
                        if (!this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'only_deleted')) {
                            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'include_deleted', true,()=>{})
                            if (includeDeletedCheckBox) includeDeletedCheckBox.checked = true
                        }
                        this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'only_deleted',
                            !this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'only_deleted'))
                    }
                })
            }
        }
    }

    protected sortByField() {
        const sortCallback = (e: any) => {
            const icon = e.target
            const {field, direction} = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'sort_by')
            let newSortBy = {...this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'sort_by')}

            if (icon) {
                const fieldName = icon.dataset.sort
                if (field === fieldName) {
                    newSortBy = {
                        ...newSortBy,
                        direction: direction === 'asc' ? 'desc' : 'asc'
                    }
                } else {
                    newSortBy = {
                        ...newSortBy,
                        field: fieldName,
                        direction: 'asc'
                    }
                }
            }
            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'sort_by', newSortBy)
        }
        if (this.listContainer) {
            const sortButtons = document.querySelectorAll('.sort_icon[data-sort]')
            if (sortButtons) {
                sortButtons.forEach((icon) => {
                    icon.addEventListener('click', sortCallback)
                })
            }
        }
    }

    protected renderPerPage() {
        const perPageInput = document.getElementById('per_page')
        if (perPageInput) {
            perPageInput.oninput = (e: any) => {
                this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'per_page', +e.target.value)
            }
        }
    }

    protected searchItems() {
        const searchInput = window.innerWidth>992? document.getElementById('items_search_input'):document.getElementById('items_search_input_mob')
        if (searchInput) {
            searchInput.oninput = (e: any | null) => {
                let value = e.target.value
                if (value) {
                    this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'search_string', value)
                } else {
                    this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'search_string', '')
                }
            }
        }
    }


    protected pageSwitch() {
        if (this.listContainer) {
            this.listContainer.addEventListener('click', (e: any) => {
                let target = e.target
                if (target) {
                    if (target.matches('a.page-link') || target.matches('a.page-link span')) {
                        if (target.matches('a.page-link span')) {
                            target = target.closest('a.page-link')
                        }
                        try {
                            let pageNum = +target.getAttribute('page_num')
                            let startPage = pageNum>1 ? pageNum-1:1
                            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'start_page', startPage,()=>{})
                            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'current_page', pageNum)
                        } catch (error) {
                            console.error('Expected attribute "page_num" in target Button')
                        }
                    }
                }
            })
        }
    }

    public addNewItemToList(newItemObject: any) {
        newItemObject['is_new'] = true
        newItemObject['to_render'] = true
        this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'list', [...this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'list'), newItemObject])
        const items = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'list')
        const lastPage = Math.ceil(items.length / +this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'per_page'))
        this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'current_page', lastPage)
    }
}


export default AbstractListControlPanelEventsController

