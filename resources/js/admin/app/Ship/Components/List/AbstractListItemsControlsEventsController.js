"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const items_find_1 = require("../../../../lib/item_find/items_find");
class AbstractListItemsControlsEventsController {
    constructor(shipState) {
        this.shipState = shipState;
        this.listContainer = document.querySelector('.items_list_container');
        this.table = document.querySelector('.items_list_container .table');
        this.token = this.getToken();
    }
    getToken() {
        const tokenElement = document.querySelector('[name=csrf-token]');
        return tokenElement ? tokenElement.getAttribute('content') : '';
    }
    getRenderFunc(listRenderFunction, context) {
        this.listRenderFunction = listRenderFunction.bind(context);
    }
    itemDelete() {
        if (this.listContainer) {
            this.listContainer.addEventListener('click', (e) => {
                const target = e.target;
                if (target.classList.contains('delete')) {
                    if (target) {
                        const table = target.closest('.table');
                        let readyToDelete = table.querySelectorAll('.table_body .one_item.ready_to_delete');
                        if (readyToDelete.length > 0) {
                            readyToDelete.forEach((item) => {
                                item.classList.remove('ready_to_delete');
                            });
                        }
                        let closestTr = target.closest('.one_item');
                        if (closestTr) {
                            closestTr.classList.add('ready_to_delete');
                        }
                    }
                }
            });
        }
    }
    itemInfo() {
        const table = document.querySelector('.items_list_container .table');
        if (table) {
            table.addEventListener('click', (e) => {
                let infoActiveItem = table.querySelectorAll('.table_body .one_item.info_active');
                const target = e.target;
                if (target.classList.contains('info')) {
                    let itemElement = target.closest('.one_item');
                    let itemId = itemElement.dataset.id;
                    if (infoActiveItem.length > 0) {
                        infoActiveItem.forEach((item) => {
                            item.classList.remove('info_active');
                        });
                    }
                    itemElement.classList.add('info_active');
                    const list = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list');
                    const modalData = items_find_1.itemFindById(list, +itemId);
                    this.infoModalController.renderModal(modalData);
                }
            });
        }
    }
    openFormForAddChildrenItem() {
        this.table.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('add_into_this')) {
                const formOpenCloseButton = document.querySelector('#add_new_form_open');
                const parentId = target.closest('.one_item').dataset.id;
                const form = document.querySelector('.form_container .entity_form');
                formOpenCloseButton.click();
                form.querySelector('input.parent_id').value = parentId;
            }
        });
    }
    itemUpdate() {
    }
}
exports.default = AbstractListItemsControlsEventsController;
