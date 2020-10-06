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
var RegularPaginationBuilder_1 = __importDefault(require("../html_pagination_builder/RegularPaginationBuilder"));
var CategoriesPagination_1 = __importDefault(require("../../../../lib/list_pagination/content/categories/CategoriesPagination"));
var RegularRender = /** @class */ (function () {
    function RegularRender(store) {
        var _this = this;
        this.tableContainer = document.getElementById('categories_list_container');
        this.append = function (listHtml) {
            if (_this.tableContainer) {
                try {
                    var tableBody = _this.tableContainer.querySelector('table tbody');
                    if (tableBody) {
                        tableBody.innerHTML = listHtml;
                    }
                }
                catch (e) {
                    console.error('Append error');
                }
            }
        };
        this.store = store;
        this.pagination = new CategoriesPagination_1.default(this.store);
    }
    /*
       * get items HTML and put it into page table box
       * */
    RegularRender.prototype.listRender = function (builder) {
        var categoriesList = this.store.getState('categories');
        var perPageNum = this.store.getState('per_page') || 0;
        var perPage = perPageNum != 0 ? perPageNum : categoriesList.length;
        var currentPage = this.store.getState('current_page');
        var offset = currentPage * perPage - (perPage - 1);
        var limit = currentPage * perPage;
        var listHtml = '';
        categoriesList = this.pagination.searchItems(categoriesList);
        categoriesList = this.pagination.includeDeleted(categoriesList);
        categoriesList = this.pagination.sortByData(categoriesList);
        categoriesList = this.pagination.onlyDeleted(categoriesList);
        categoriesList = this.pagination.includeDeleted(categoriesList);
        this.pagination.setListItemsNumberMaxParam(__spreadArrays(categoriesList));
        categoriesList.forEach(function (item, key) {
            if (key >= (offset - 1) && key <= limit - 1) {
                listHtml += builder.builder(item, key + 1);
            }
        });
        this.append(listHtml);
        var paginationHtml = this.paginationRender(new RegularPaginationBuilder_1.default(), categoriesList);
        this.paginationAppend(paginationHtml);
    };
    RegularRender.prototype.paginationRender = function (builder, list) {
        var objectToBuilder = this.pagination.paginationRender(list);
        return builder.build(objectToBuilder);
    };
    RegularRender.prototype.paginationAppend = function (paginationHtml) {
        if (this.tableContainer) {
            try {
                var paginationBox = this.tableContainer.querySelector('ul.pagination');
                if (paginationBox) {
                    paginationBox.innerHTML = paginationHtml;
                }
            }
            catch (e) {
                console.error('Append error');
            }
        }
    };
    return RegularRender;
}());
exports.default = RegularRender;
