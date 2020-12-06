"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var items_find_1 = require("../../../../lib/item_find/items_find");
var AbstractListControlsController = /** @class */ (function () {
    function AbstractListControlsController(stateManager) {
        this.listContainer = document.querySelector('.items_list_container');
        this.table = document.querySelector('.items_list_container .table');
        this.stateManager = stateManager;
        this.token = this.getToken();
    }
    AbstractListControlsController.prototype.getToken = function () {
        var tokenElement = document.querySelector('[name=csrf-token]');
        return tokenElement ? tokenElement.getAttribute('content') : '';
    };
    AbstractListControlsController.prototype.getRenderFunc = function (listRenderFunction, context) {
        this.listRenderFunction = listRenderFunction.bind(context);
    };
    AbstractListControlsController.prototype.itemDelete = function () {
        if (this.listContainer) {
            this.listContainer.addEventListener('click', function (e) {
                var target = e.target;
                if (target.classList.contains('delete')) {
                    if (target) {
                        var table = target.closest('.table');
                        var readyToDelete = table.querySelectorAll('.table_body .one_item.ready_to_delete');
                        if (readyToDelete.length > 0) {
                            readyToDelete.forEach(function (item) {
                                item.classList.remove('ready_to_delete');
                            });
                        }
                        var closestTr = target.closest('.one_item');
                        if (closestTr) {
                            closestTr.classList.add('ready_to_delete');
                        }
                    }
                }
            });
        }
    };
    AbstractListControlsController.prototype.itemInfo = function () {
        var _this = this;
        var table = document.querySelector('.items_list_container .table');
        if (table) {
            table.addEventListener('click', function (e) {
                var infoActiveItem = table.querySelectorAll('.table_body .one_item.info_active');
                var target = e.target;
                if (target.classList.contains('info')) {
                    var itemElement = target.closest('.one_item');
                    var itemId = itemElement.dataset.id;
                    if (infoActiveItem.length > 0) {
                        infoActiveItem.forEach(function (item) {
                            item.classList.remove('info_active');
                        });
                    }
                    itemElement.classList.add('info_active');
                    var list = _this.stateManager.getState('list');
                    var modalData = items_find_1.itemFindById(list, +itemId);
                    _this.infoModalController.renderModal(modalData);
                }
            });
        }
    };
    AbstractListControlsController.prototype.openFormForAddChildrenItem = function () {
        this.table.addEventListener('click', function (e) {
            var target = e.target;
            if (target.classList.contains('add_into_this')) {
                var formOpenCloseButton = document.querySelector('#add_new_form_open');
                var parentId = target.closest('.one_item').dataset.id;
                var form = document.querySelector('.form_container .entity_form');
                formOpenCloseButton.click();
                form.querySelector('input.parent_id').value = parentId;
            }
        });
    };
    AbstractListControlsController.prototype.itemUpdate = function () {
    };
    return AbstractListControlsController;
}());
exports.default = AbstractListControlsController;
