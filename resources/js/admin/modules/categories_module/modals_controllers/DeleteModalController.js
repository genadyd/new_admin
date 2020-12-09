"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CategoriesApi_1 = __importDefault(require("../../../app/api/CategoriesApi"));
var items_find_1 = require("../../../lib/item_find/items_find");
var DeleteModalController = /** @class */ (function () {
    function DeleteModalController(stateManager) {
        this.stateManager = stateManager;
        var tokenElem = document.querySelector('[name=csrf-token]');
        this.token = tokenElem ? tokenElem.getAttribute('content') : '';
        this.confirmModal();
    }
    DeleteModalController.prototype.setListRenderFunction = function (listRenderFunc, context) {
        this.listRenderFunc = listRenderFunc.bind(context);
    };
    DeleteModalController.prototype.closeModal = function () {
        var table = document.querySelector('.items_list_container .table');
        var buttons = document.querySelectorAll('#itemDeleteModal .modal_close');
        if (buttons) {
            buttons.forEach(function (button) {
                button.addEventListener('click', function () {
                    if (table) {
                        var readyToDelete = table.querySelectorAll('.table_body .one_item.ready_to_delete');
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
    DeleteModalController.prototype.confirmModal = function () {
        var _this = this;
        var button = document.querySelector('#itemDeleteModal .modal_confirm');
        if (button) {
            button.addEventListener('click', function (e) {
                var readySelectionElement = document.querySelector('.items_list_container .table_body .one_item.ready_to_delete');
                if (!readySelectionElement)
                    return;
                var itemId = readySelectionElement.dataset.id;
                var list = _this.stateManager.getState('list');
                var idsList = [];
                var element = items_find_1.itemFindById(list, +itemId);
                if (element) {
                    idsList = items_find_1.itemsFindTree(element);
                }
                var formData = {
                    ids: idsList,
                    'X-CSRF-TOKEN': _this.token ? _this.token : ''
                };
                var Api = new CategoriesApi_1.default('/admin/categories/category_delete', 'POST', { formData: JSON.stringify(formData) });
                var promise = Api.exeq();
                promise.then(function (res) {
                    if (res.deleted_num > 0) {
                        res.deleted_items.forEach(function (item) {
                            var element = items_find_1.itemFindById(__spreadArrays(list), +item.id);
                            element.deleted_at = item.deleted_at;
                            _this.stateManager.setState('list', list);
                        });
                        var closeButton = document.querySelector('#itemDeleteModal .modal_close');
                        if (closeButton)
                            closeButton.click();
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
