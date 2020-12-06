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
var AbstractListController_1 = __importDefault(require("../../app/controllers/list_controllers/AbstractListController"));
var ListBuilder_1 = __importDefault(require("./list/html_builders/ListBuilder"));
var PaginationBuilder_1 = __importDefault(require("./list/html_builders/PaginationBuilder"));
var ListController = /** @class */ (function (_super) {
    __extends(ListController, _super);
    function ListController(stateManager, listProcessor) {
        var _this = _super.call(this, stateManager, listProcessor) || this;
        _this.listContainer = document.getElementById('categories_list_container');
        _this.getListBuilder = function () {
            return new ListBuilder_1.default();
        };
        _this.renderList = function () {
            var list = _this.listProcessor.getList();
            var builder = _this.getListBuilder();
            var listHtml = builder.build(list);
            var tableContainer = document.querySelector('#categories_list_container .table .table_body');
            if (tableContainer) {
                tableContainer.innerHTML = listHtml;
            }
            var paginationContainer = document.querySelector('.cat_list_nav');
            var pagination = _this.getPaginationBuilder();
            if (paginationContainer) {
                paginationContainer.innerHTML = pagination.build(_this.renderPaginationButtons(list));
            }
            _this.setListItemsNumberMaxParam(list);
        };
        _this.getListBuilder();
        /*parent abstract list controllers methods */
        _this.includeDeleted();
        _this.onlyDeleted();
        _this.sortByDate();
        _this.searchItems();
        _this.pageSwitch();
        _this.renderPerPage();
        _this.sortByField();
        return _this;
        /*parent abstract list controllers methods */
    }
    ListController.prototype.getPaginationBuilder = function () {
        return new PaginationBuilder_1.default();
    };
    return ListController;
}(AbstractListController_1.default));
exports.default = ListController;
