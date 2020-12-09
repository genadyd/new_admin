"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ListBuilder_1 = __importDefault(require("./list/html_builders/ListBuilder"));
var PaginationBuilder_1 = __importDefault(require("./list/html_builders/PaginationBuilder"));
var ListProcessor_1 = __importDefault(require("./list_processor/ListProcessor"));
var ListRender = /** @class */ (function () {
    function ListRender(state) {
        var _this = this;
        this.renderList = function (list) {
            if (list === void 0) { list = []; }
            var listProcessor = new ListProcessor_1.default(_this.state);
            var resList = list.length === 0 ? listProcessor.getList() : listProcessor.getList(list);
            var builder = new ListBuilder_1.default();
            var listHtml = builder.build(resList);
            if (list.length === 0) {
                _this.renderMainList(resList, listHtml);
            }
            else {
                ListRender.renderChildList(resList, listHtml);
            }
        };
        this.setListItemsNumberMaxParam = function (list) {
            var perPageInput = document.getElementById('per_page');
            if (perPageInput) {
                var len = list.length;
                perPageInput.setAttribute('max', len);
                if (_this.state.per_page > len) {
                    perPageInput.value = len;
                }
                else {
                    perPageInput.value = _this.state.per_page;
                }
            }
        };
        this.state = state;
    }
    ListRender.prototype.renderMainList = function (resList, listHtml) {
        var tableContainer = document.querySelector('#categories_list_container .table .table_body');
        if (tableContainer) {
            tableContainer.innerHTML = listHtml;
        }
        var paginationContainer = document.querySelector('.cat_list_nav');
        var pagination = new PaginationBuilder_1.default();
        if (paginationContainer) {
            paginationContainer.innerHTML = pagination.build(this.renderPaginationButtons(resList));
        }
        this.setListItemsNumberMaxParam(resList);
    };
    ListRender.renderChildList = function (resList, listHtml) {
        if (resList.length > 0) {
            var parentId = resList[0].parent;
            var target = document.querySelector('.one_item[data-id="' + parentId + '"] .one_cat_body');
            if (target)
                target.innerHTML = listHtml;
        }
    };
    ListRender.prototype.renderPaginationButtons = function (list) {
        var lastPage = Math.ceil(list.length / +this.state.per_page);
        var objectToBuilder = {
            start_page: 1,
            current_page: +this.state.current_page,
            last_page: +lastPage,
            buttons_num: lastPage < 3 ? lastPage : 3
        };
        if (objectToBuilder.current_page == objectToBuilder.last_page) { /*if last page*/
            if (objectToBuilder.last_page > 2) {
                objectToBuilder.start_page = objectToBuilder.current_page - 2;
                objectToBuilder.buttons_num = objectToBuilder.last_page;
            }
            else if (objectToBuilder.last_page == 2) {
                objectToBuilder.start_page = objectToBuilder.current_page - 1;
                objectToBuilder.buttons_num = objectToBuilder.last_page;
            }
            else {
                objectToBuilder.buttons_num = 0;
            }
        }
        else if (objectToBuilder.current_page > 1 && objectToBuilder.current_page < objectToBuilder.last_page) {
            objectToBuilder.start_page = objectToBuilder.current_page - 1;
            objectToBuilder.buttons_num = objectToBuilder.current_page + 1;
        }
        else {
            objectToBuilder.start_page = 1;
        }
        return objectToBuilder;
    };
    return ListRender;
}());
exports.default = ListRender;
