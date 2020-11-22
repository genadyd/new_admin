"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CategoriesApi_1 = __importDefault(require("../../../app/api/CategoriesApi"));
var DeleteModalController = /** @class */ (function () {
    function DeleteModalController(stateManager) {
        this.stateManager = stateManager;
        var tokenElem = document.querySelector('[name=csrf-token]');
        this.token = tokenElem ? tokenElem.getAttribute('content') : '';
    }
    DeleteModalController.prototype.closeModal = function () {
        var table = document.querySelector('.items_list_container .table');
        var buttons = document.querySelectorAll('#itemDeleteModal .modal_close');
        if (buttons) {
            buttons.forEach(function (button) {
                button.addEventListener('click', function () {
                    if (table) {
                        var readyToDelete = table.querySelectorAll('tbody tr.ready_to_delete');
                        if (readyToDelete.length > 0) {
                            readyToDelete.forEach(function (item) {
                                item.classList.remove('ready_to_delete');
                            });
                        }
                    }
                });
            });
        }
    };
    DeleteModalController.prototype.confirmModal = function (renderFunc) {
        var _this = this;
        var button = document.querySelector('#itemDeleteModal .modal_confirm');
        if (button) {
            button.addEventListener('click', function () {
                var readySelectionElement = document.querySelector('.items_list_container tbody tr.ready_to_delete');
                if (!readySelectionElement)
                    return;
                var itemId = readySelectionElement.dataset.id;
                var formData = {
                    id: itemId,
                    'X-CSRF-TOKEN': _this.token ? _this.token : ''
                };
                var Api = new CategoriesApi_1.default('/admin/categories/category_delete', 'POST', { formData: JSON.stringify(formData) });
                var promise = Api.exeq();
                promise.then(function (res) {
                    if (res[0] == 1) {
                        var list = _this.stateManager.getState('list');
                        var deletedIndex = list.findIndex(function (item) { return item.id === +itemId; });
                        list[deletedIndex].deleted_at = res[1];
                        renderFunc();
                        var button_1 = document.querySelector('#itemDeleteModal .modal_close');
                        if (button_1)
                            button_1.click();
                    }
                });
            });
        }
    };
    DeleteModalController.prototype.renderModal = function (modalData) {
    };
    return DeleteModalController;
}());
exports.default = DeleteModalController;
