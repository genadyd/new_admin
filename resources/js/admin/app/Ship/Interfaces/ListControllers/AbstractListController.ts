import AbstractPaginationBuilder from "../../../UI/list_builders/AbstractPaginationBuilder";
import ListControllerInterface from "./ListControllerInterface";
import StateManagerInterface from "../../../state_manager/StateManagerInterface";
import ListProcessor from "../../../list_processor/AbstractListProcessor";

abstract class AbstractListController implements ListControllerInterface {
    protected token: any
    protected listener: any
    protected controls: any
    protected listContainer:any
    protected readonly MODULE_STATE:string = 'categoriesState'

    protected constructor(protected ShipState:ShipStateInterface) {

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
                    if (this.ShipState.getStateElementValue(this.MODULE_STATE,'include_deleted')
                        && this.ShipState.getStateElementValue(this.MODULE_STATE,'only_deleted')) {
                        this.ShipState.setStateElementValue(this.MODULE_STATE,'only_deleted', false,()=>{})
                        if (onlyDeletedCheckBox) onlyDeletedCheckBox.checked = false
                    }
                    this.ShipState.setStateElementValue(this.MODULE_STATE,'include_deleted',
                        !this.ShipState.getStateElementValue(this.MODULE_STATE,'include_deleted'))
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
                        if (!this.ShipState.getStateElementValue(this.MODULE_STATE,'only_deleted')) {
                            this.ShipState.setStateElementValue(this.MODULE_STATE,'include_deleted', true,()=>{})
                            if (includeDeletedCheckBox) includeDeletedCheckBox.checked = true
                        }
                        this.ShipState.setStateElementValue(this.MODULE_STATE,'only_deleted',
                            !this.ShipState.getStateElementValue(this.MODULE_STATE,'only_deleted'))
                    }
                })
            }
        }
    }

    protected sortByField() {
        const sortCallback = (e: any) => {
            const icon = e.target
            const {field, direction} = this.ShipState.getStateElementValue(this.MODULE_STATE,'sort_by')
            let newSortBy = {...this.ShipState.getStateElementValue(this.MODULE_STATE,'sort_by')}

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
            this.ShipState.setStateElementValue(this.MODULE_STATE,'sort_by', newSortBy)
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
                this.ShipState.setStateElementValue(this.MODULE_STATE,'per_page', +e.target.value)
            }
        }
    }

    protected searchItems() {
        const searchInput = document.getElementById('items_search_input')
        if (searchInput) {
            searchInput.oninput = (e: any | null) => {
                let value = e.target.value
                if (value) {
                    this.ShipState.setStateElementValue(this.MODULE_STATE,'search_string', value)
                } else {
                    this.ShipState.setStateElementValue(this.MODULE_STATE,'search_string', '')
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
                            let pageNum = target.getAttribute('page_num')
                            this.ShipState.setStateElementValue(this.MODULE_STATE,'current_page', pageNum)
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
        this.ShipState.setStateElementValue(this.MODULE_STATE,'list', [...this.ShipState.getStateElementValue(this.MODULE_STATE,'list'), newItemObject])
        const items = this.ShipState.getStateElementValue(this.MODULE_STATE,'list')
        // items.push(newItemObject)
        const lastPage = Math.ceil(items.length / +this.ShipState.getStateElementValue(this.MODULE_STATE,'per_page'))
        this.ShipState.setStateElementValue(this.MODULE_STATE,'current_page', lastPage)

    }

}


export default AbstractListController

