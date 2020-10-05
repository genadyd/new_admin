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
        this.includeDeleted = function (list) {
            if (!_this.store.getState('include_deleted')) {
                list = list.filter(function (val) { return !val.deleted_at; });
            }
            return list;
        };
        this.sortByData = function (list) {
            if (_this.store.getState('sort_by_date_desc')) {
                list = __spreadArrays(list);
                list.reverse();
            }
            return list;
        };
        this.onlyDeleted = function (list) {
            if (_this.store.getState('only_deleted')) {
                list = list.filter(function (val) { return val.deleted_at; });
            }
            return list;
        };
        this.setListItemsNumberMaxParam = function (list) {
            var perPageInput = document.getElementById('per_page');
            if (perPageInput) {
                var len = list.length;
                perPageInput.setAttribute('max', len);
                if (_this.store.getState('per_page') > len) {
                    perPageInput.value = len;
                }
                else {
                    perPageInput.value = _this.store.getState('per_page');
                }
            }
        };
        this.categoriesSearch = function (list) {
            var searchString = _this.store.getState('search_string');
            /*
               strip slashas
                */
            list.forEach(function (item, key) {
                item.name = item.name.replace(/(<([^>]+)>)/gi, "");
                item.heading = item.heading.replace(/(<([^>]+)>)/gi, "");
            });
            if (searchString) {
                var pattern_1 = new RegExp(searchString);
                list = list.filter(function (val) {
                    return pattern_1.test(val.heading) || pattern_1.test(val.name);
                });
                list.forEach(function (item, key) {
                    list[key].name = item.name.replace(searchString, "<span class=\"finded\">" + searchString + "</span>");
                    list[key].heading = item.heading.replace(searchString, "<span class=\"finded\">" + searchString + "</span>");
                });
            }
            return list;
        };
        this.store = store;
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
        categoriesList = this.categoriesSearch(categoriesList);
        categoriesList = this.includeDeleted(categoriesList);
        categoriesList = this.sortByData(categoriesList);
        categoriesList = this.onlyDeleted(categoriesList);
        categoriesList = this.includeDeleted(categoriesList);
        this.setListItemsNumberMaxParam(__spreadArrays(categoriesList));
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
        var data = this.store.getAllState();
        var lastPage = Math.ceil(list.length / data.per_page);
        var objectToBuilder = {
            start_page: 1,
            current_page: +data.current_page,
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
