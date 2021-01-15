"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriesApi_1 = __importDefault(require("../../../app/api/CategoriesApi"));
const items_find_1 = require("../../../lib/item_find/items_find");
class DeleteModalController {
    constructor(stateRepo) {
        this.stateRepo = stateRepo;
        this.MODULE_STATE_CONTAINER_NAME = 'categoriesState';
        const tokenElem = document.querySelector('[name=csrf-token]');
        this.token = tokenElem ? tokenElem.getAttribute('content') : '';
        this.confirmModal();
    }
    setListRenderFunction(listRenderFunc, context) {
        this.listRenderFunc = listRenderFunc.bind(context);
    }
    closeModal() {
        const table = document.querySelector('.items_list_container .table');
        const buttons = document.querySelectorAll('#itemDeleteModal .modal_close');
        if (buttons) {
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    if (table) {
                        let readyToDelete = table.querySelectorAll('.table_body .one_item.ready_to_delete');
                        if (readyToDelete.length > 0) {
                            readyToDelete.forEach((item) => {
                                item.classList.remove('ready_to_delete');
                            });
                        }
                    }
                });
            });
        }
    }
    confirmModal() {
        const button = document.querySelector('#itemDeleteModal .modal_confirm');
        if (button) {
            button.addEventListener('click', (e) => {
                const readySelectionElement = document.querySelector('.items_list_container .table_body .one_item.ready_to_delete');
                if (!readySelectionElement)
                    return;
                const itemId = readySelectionElement.dataset.id;
                const list = this.stateRepo.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list');
                const indexes = this.stateRepo.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'indexes');
                const ids = items_find_1.findChildrenIdsList(+itemId, list);
                const formData = {
                    ids: ids,
                    'X-CSRF-TOKEN': this.token ? this.token : ''
                };
                const Api = new CategoriesApi_1.default('/admin/categories/category_delete', 'POST', { formData: JSON.stringify(formData) });
                const promise = Api.exeq();
                promise.then((res) => {
                    ids.forEach((item) => {
                        const element = list[indexes[item]];
                        const date = new Date();
                        element.deleted_at = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate() + ' ' +
                            date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                    });
                    this.stateRepo.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list', list);
                    const closeButton = document.querySelector('#itemDeleteModal .modal_close');
                    if (closeButton)
                        closeButton.click();
                });
            });
        }
    }
    renderModal(modalData) {
    }
}
exports.default = DeleteModalController;
