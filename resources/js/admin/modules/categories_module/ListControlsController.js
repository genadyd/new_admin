"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractListControlsController_1 = __importDefault(require("../../app/controllers/list_controllers/list_controls_controller/AbstractListControlsController"));
var CategoriesApi_1 = __importDefault(require("../../app/api/CategoriesApi"));
var InfoModalController_1 = __importDefault(require("./modals_controllers/InfoModalController"));
var DeleteModalController_1 = __importDefault(require("./modals_controllers/DeleteModalController"));
var item_find_1 = require("../../lib/item_find/item_find");
var ListBuilder_1 = __importDefault(require("./list/html_builders/ListBuilder"));
var ListControlsController = /** @class */ (function (_super) {
    __extends(ListControlsController, _super);
    function ListControlsController(stateManager) {
        var _this = _super.call(this, stateManager) || this;
        _this.infoModalController = new InfoModalController_1.default();
        _this.deleteModal = new DeleteModalController_1.default(_this.stateManager);
        _this.itemInfo();
        _this.itemDelete();
        _this.itemRestore();
        _this.openFormForAddChildrenItem();
        _this.childrenListView();
        return _this;
    }
    ListControlsController.prototype.itemUpdate = function () {
        var container = document.querySelector('#content_container');
        if (!container)
            return;
        container.addEventListener('click', function (e) { });
    };
    ListControlsController.prototype.itemRestore = function () {
        var _this = this;
        var container = document.querySelector('#content_container');
        if (!container)
            return;
        container.addEventListener('click', function (e) {
            var target = e.target;
            if (target && target.classList.contains('restore')) {
                var id_1 = target.closest('tr').dataset.id;
                var key = +target.closest('tr').dataset.key;
                var formData = {
                    action: {},
                    id: id_1,
                    'X-CSRF-TOKEN': _this.token ? _this.token : ''
                };
                var Api = new CategoriesApi_1.default('/admin/categories/category_restore', 'POST', { formData: JSON.stringify(formData) });
                var promise = Api.exeq();
                promise.then(function (res) {
                    if (res === 1) {
                        var list = _this.stateManager.getState('list');
                        var elem = item_find_1.itemFindFunc(list, +id_1);
                        if (elem)
                            elem.deleted_at = null;
                        _this.listRenderFunction();
                    }
                });
            }
        });
    };
    ListControlsController.prototype.childrenListView = function () {
        var _this = this;
        var table = document.querySelector('.items_list_container .table');
        table.addEventListener('click', function (e) {
            var target = e.target;
            if (target.classList.contains('view_list')) {
                var parentId = target.closest('tr').dataset.id;
                var list = _this.stateManager.getState('list');
                var elem = item_find_1.itemFindFunc(list, +parentId);
                var listBuilder = new ListBuilder_1.default();
                var html = listBuilder.build(elem.children_list);
                var currentElement = _this.table.querySelector("tr[data-id=\"" + elem.id + "\"]");
                var parser = new DOMParser();
                var res = parser.parseFromString(html, 'text/html');
                table.insertBefore(res, currentElement.nextSiblings);
            }
        });
    };
    return ListControlsController;
}(AbstractListControlsController_1.default));
exports.default = ListControlsController;
