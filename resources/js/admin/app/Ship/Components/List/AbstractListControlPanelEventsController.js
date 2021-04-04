"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* list events controller for list control panel
* */
class AbstractListControlPanelEventsController {
    constructor(shipState) {
        this.shipState = shipState;
        this.MODULE_STATE_CONTAINER_NAME = '';
    }
    getToken() {
        const tokenElement = document.querySelector('[name=csrf-token]');
        this.token = tokenElement ? tokenElement.getAttribute('content') : '';
    }
    includeDeleted() {
        if (this.listContainer) {
            const includeDeletedInput = this.listContainer.querySelector('.list_control_panel #include_deleted');
            if (includeDeletedInput) {
                includeDeletedInput.addEventListener('click', () => {
                    const onlyDeletedCheckBox = document.querySelector('.list_control_panel #only_deleted');
                    if (this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'include_deleted')
                        && this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'only_deleted')) {
                        this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'only_deleted', false, () => { });
                        if (onlyDeletedCheckBox)
                            onlyDeletedCheckBox.checked = false;
                    }
                    this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'include_deleted', !this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'include_deleted'));
                });
            }
        }
    }
    onlyDeleted() {
        if (this.listContainer) {
            const onlyDeletedInput = this.listContainer.querySelector('#only_deleted');
            if (onlyDeletedInput) {
                onlyDeletedInput.addEventListener('input', (e) => {
                    const checkBox = e.target;
                    if (checkBox) {
                        const includeDeletedCheckBox = document.getElementById('include_deleted');
                        if (!this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'only_deleted')) {
                            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'include_deleted', true, () => { });
                            if (includeDeletedCheckBox)
                                includeDeletedCheckBox.checked = true;
                        }
                        this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'only_deleted', !this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'only_deleted'));
                    }
                });
            }
        }
    }
    sortByField() {
        const sortCallback = (e) => {
            const icon = e.target;
            const { field, direction } = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'sort_by');
            let newSortBy = Object.assign({}, this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'sort_by'));
            if (icon) {
                const fieldName = icon.dataset.sort;
                if (field === fieldName) {
                    newSortBy = Object.assign(Object.assign({}, newSortBy), { direction: direction === 'asc' ? 'desc' : 'asc' });
                }
                else {
                    newSortBy = Object.assign(Object.assign({}, newSortBy), { field: fieldName, direction: 'asc' });
                }
            }
            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'sort_by', newSortBy);
        };
        if (this.listContainer) {
            const sortButtons = document.querySelectorAll('.sort_icon[data-sort]');
            if (sortButtons) {
                sortButtons.forEach((icon) => {
                    icon.addEventListener('click', sortCallback);
                });
            }
        }
    }
    renderPerPage() {
        const perPageInput = document.getElementById('per_page');
        if (perPageInput) {
            perPageInput.oninput = (e) => {
                this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'per_page', +e.target.value);
            };
        }
    }
    searchItems() {
        const searchInput = window.innerWidth > 992 ? document.getElementById('items_search_input') : document.getElementById('items_search_input_mob');
        if (searchInput) {
            searchInput.oninput = (e) => {
                let value = e.target.value;
                if (value) {
                    this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'search_string', value);
                }
                else {
                    this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'search_string', '');
                }
            };
        }
    }
    pageSwitch() {
        if (this.listContainer) {
            this.listContainer.addEventListener('click', (e) => {
                let target = e.target;
                if (target) {
                    if (target.matches('a.page-link') || target.matches('a.page-link span')) {
                        if (target.matches('a.page-link span')) {
                            target = target.closest('a.page-link');
                        }
                        try {
                            let pageNum = +target.getAttribute('page_num');
                            let startPage = pageNum > 1 ? pageNum - 1 : 1;
                            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'start_page', startPage, () => { });
                            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'current_page', pageNum);
                        }
                        catch (error) {
                            console.error('Expected attribute "page_num" in target Button');
                        }
                    }
                }
            });
        }
    }
    addNewItemToList(newItemObject) {
        newItemObject['is_new'] = true;
        newItemObject['to_render'] = true;
        this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list', [...this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list'), newItemObject]);
        const items = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list');
        const lastPage = Math.ceil(items.length / +this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'per_page'));
        this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'current_page', lastPage);
    }
}
exports.default = AbstractListControlPanelEventsController;
