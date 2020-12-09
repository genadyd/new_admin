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
var AbstractListControlsController_1 = __importDefault(require("../../app/controllers/list_controllers/list_controls_controller/AbstractListControlsController"));
var CategoriesApi_1 = __importDefault(require("../../app/api/CategoriesApi"));
var InfoModalController_1 = __importDefault(require("./modals_controllers/InfoModalController"));
// import {itemFindById} from "../../lib/item_find/items_find";
// import ListBuilder from "./list/html_builders/ListBuilder";
var random_color_1 = require("../../lib/random_color/random_color");
var ListRender_1 = __importDefault(require("./ListRender"));
var CategoriesState_1 = require("./CategoriesState");
var ListControlsController = /** @class */ (function (_super) {
    __extends(ListControlsController, _super);
    function ListControlsController(stateManager) {
        var _this = _super.call(this, stateManager) || this;
        _this.infoModalController = new InfoModalController_1.default();
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
                var id_1 = target.closest('.one_item').dataset.id;
                var formData = {
                    action: {},
                    id: id_1,
                    'X-CSRF-TOKEN': _this.token ? _this.token : ''
                };
                var Api = new CategoriesApi_1.default('/admin/categories/category_restore', 'POST', { formData: JSON.stringify(formData) });
                var promise = Api.exeq();
                promise.then(function (res) {
                    if (res === 1) {
                        var list = __spreadArrays(_this.stateManager.getState('list'));
                        var indexes = _this.stateManager.getState('indexes');
                        var elem = list[indexes[id_1]];
                        if (elem)
                            elem.deleted_at = null;
                        _this.stateManager.setState('list', list);
                    }
                });
            }
        });
    };
    ListControlsController.prototype.childrenListView = function () {
        var _this = this;
        var table = document.querySelector('.items_list_container .table .table_body');
        table.addEventListener('click', function (e) {
            var target = e.target;
            if (target.classList.contains('view_list')) {
                var itemBox = target.closest('.one_item');
                var header = itemBox.querySelector('.one_cat_header');
                var body = itemBox.querySelector('.one_cat_body');
                if (itemBox.classList.contains('children_show')) {
                    itemBox.classList.remove('children_show');
                    header.style.backgroundColor = 'transparent';
                    header.classList.remove('has_child');
                    body.innerHTML = '';
                    target.innerText = 'expand_more';
                }
                else {
                    itemBox.classList.add('children_show');
                    var parentId_1 = +itemBox.dataset.id;
                    var list = _this.stateManager.getState('list');
                    var indexes = _this.stateManager.getState('indexes');
                    var elem = list[indexes[parentId_1]];
                    if (elem.children_count > 0) {
                        var childrenList = list.filter(function (item) { return item.parent === parentId_1; });
                        elem.children_show = true;
                        var listRender = new ListRender_1.default(CategoriesState_1.State);
                        listRender.renderList(childrenList);
                        // const listBuilder = new ListBuilder()
                        // const html = listBuilder.build(childrenList)
                        target.innerText = 'expand_less';
                        var boxColor = random_color_1.getRandomColor();
                        header.style.backgroundColor = boxColor;
                        header.classList.add('has_child');
                        // body.innerHTML = html
                        body.style.backgroundColor = boxColor;
                    }
                }
            }
        });
    };
    return ListControlsController;
}(AbstractListControlsController_1.default));
exports.default = ListControlsController;
