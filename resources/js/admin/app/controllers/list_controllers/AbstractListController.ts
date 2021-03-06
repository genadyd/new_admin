import AbstractPaginationBuilder from "../../UI/list_builders/AbstractPaginationBuilder";
import ListControllerInterface from "./ListControllerInterface";
import StateManagerInterface from "../../state_manager/StateManagerInterface";
import ListProcessor from "../../list_processor/AbstractListProcessor";

abstract class AbstractListController implements ListControllerInterface {
    protected token: any
    protected listener: any
    protected controls: any
    protected stateManager: StateManagerInterface
    protected listContainer: any

    protected constructor(stateManager: StateManagerInterface) {
        this.stateManager = stateManager
    }


    protected getToken() {
        const tokenElement = document.querySelector('[name=csrf-token]')
        this.token = tokenElement ? tokenElement.getAttribute('content') : ''
    }

    protected includeDeleted() {
        if (this.listContainer) {
            const includeDeletedInput = this.listContainer.querySelector('#categories_control_panel #include_deleted')
            if (includeDeletedInput) {
                includeDeletedInput.addEventListener('click', () => {
                    const onlyDeletedCheckBox: any = document.querySelector('.list_control_panel #only_deleted')
                    this.stateManager.setState('include_deleted', !this.stateManager.getState('include_deleted'))
                    if (!this.stateManager.getState('include_deleted') && this.stateManager.getState('only_deleted')) {
                        this.stateManager.setState('only_deleted', false)
                        if (onlyDeletedCheckBox) onlyDeletedCheckBox.checked = false
                    }
                    // this.renderList()
                })
            }
        }
    }

    protected onlyDeleted() {
        if (this.listContainer) {
            const onlyDeletedInput = this.listContainer.querySelector('#only_deleted')
            if (onlyDeletedInput) {
                onlyDeletedInput.addEventListener('input', (e: any) => {
                    const checkBox: any = e.target
                    if (checkBox) {
                        this.stateManager.setState('only_deleted', !this.stateManager.getState('only_deleted'))
                        const includeDeletedCheckBox = document.getElementById('include_deleted')
                        if (this.stateManager.getState('only_deleted')) {
                            this.stateManager.setState('include_deleted', true)
                            if (includeDeletedCheckBox) includeDeletedCheckBox.checked = true
                        } else {
                            this.stateManager.setState('include_deleted', false)
                            if (includeDeletedCheckBox) includeDeletedCheckBox.checked = false
                        }
                        // this.renderList()
                    }
                })
            }
        }
    }

    protected sortByField() {
        const sortCallback = (e: any) => {
            const icon = e.target
            const {field, direction} = this.stateManager.getState('sort_by')
            let newSortBy = {...this.stateManager.getState('sort_by')}

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
            this.stateManager.setState('sort_by', newSortBy)
            // this.renderList()
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

    protected sortByDate() {
        if (this.listContainer) {
            const sortByDateInput = this.listContainer.querySelector('#sort_by_date')
            if (sortByDateInput) {
                sortByDateInput.addEventListener('click', () => {
                    this.stateManager.setState('sort_by_date_desc', !this.stateManager.getState('sort_by_date_desc'))
                    // this.renderList()
                })
            }

        }
    }

    protected renderPerPage() {
        const perPageInput = document.getElementById('per_page')
        if (perPageInput) {
            perPageInput.oninput = (e: any) => {
                this.stateManager.setState('per_page', +e.target.value)
                // this.renderList()
            }
        }
    }

    protected searchItems() {
        const searchInput = document.getElementById('items_search_input')
        if (searchInput) {
            searchInput.oninput = (e: any | null) => {
                let value = e.target.value
                if (value) {
                    this.stateManager.setState('search_string', value)
                } else {
                    this.stateManager.setState('search_string', '')
                }
                // this.renderList()
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
                            this.stateManager.setState('current_page', pageNum)
                            // this.renderList()
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
        this.stateManager.setState('list', [...this.stateManager.getState('list'), newItemObject])
        const items = this.stateManager.getState('list')
        // items.push(newItemObject)
        const lastPage = Math.ceil(items.length / +this.stateManager.getState('per_page'))
        this.stateManager.setState('current_page', lastPage)
        // this.renderList()
    }

}


export default AbstractListController

