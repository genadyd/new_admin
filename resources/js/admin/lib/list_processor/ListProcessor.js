"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ListProcessor = /** @class */ (function () {
    function ListProcessor(stateManager) {
        this.stateManager = stateManager;
    }
    ListProcessor.prototype.getList = function () {
        var list = __spreadArrays(this.stateManager.getState('list'));
        list = this.searchItems(list);
        list = this.sortByField(list);
        list = this.includeDeleted(list);
        list = this.onlyDeleted(list);
        list = this.renderPerPage(list);
        return list;
    };
    ListProcessor.prototype.onlyDeleted = function (list) {
        if (this.stateManager.getState('only_deleted')) {
            return list.filter(function (val) { return val.deleted_at; });
        }
        return list;
    };
    ListProcessor.prototype.searchItems = function (list) {
        var searchString = this.stateManager.getState('search_string');
        /* strip slashes */
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            item.name = item.name.replace(/(<([^>]+)>)/gi, "");
            item.heading = item.heading.replace(/(<([^>]+)>)/gi, "");
        }
        if (searchString) {
            var listRes = void 0;
            var pattern_1 = new RegExp((searchString), "g");
            listRes = __spreadArrays(list).filter(function (val) {
                return pattern_1.test(val.heading) || pattern_1.test(val.name);
            });
            listRes.forEach(function (item) {
                item.name = item.name.replace(searchString, "<span class=\"finded\">" + searchString + "</span>");
                item.heading = item.heading.replace(searchString, "<span class=\"finded\">" + searchString + "</span>");
            });
            list = listRes;
        }
        return list;
    };
    ListProcessor.prototype.renderPerPage = function (list) {
        if (list.length > 0) {
            var perPageNum = this.stateManager.getState('per_page') || 0;
            var perPage = perPageNum != 0 ? perPageNum : list.length;
            var currentPage = this.stateManager.getState('current_page');
            var lastPage = Math.ceil(list.length / perPage);
            if (currentPage > lastPage) {
                this.stateManager.setState('current_page', lastPage);
                currentPage = lastPage;
            }
            var offset_1 = currentPage * perPage - perPage;
            var limit_1 = currentPage * perPage;
            list.forEach(function (item, key) {
                item.to_render = key >= offset_1 && key < limit_1;
            });
        }
        return list;
    };
    ListProcessor.prototype.includeDeleted = function (list) {
        if (!this.stateManager.getState('include_deleted')) {
            return list.filter(function (val) { return !val.deleted_at; });
        }
        return list;
    };
    ListProcessor.prototype.sortByField = function (_a) {
        var list = _a.slice(0);
        var _b = this.stateManager.getState('sort_by'), field = _b.field, direction = _b.direction;
        if (direction === 'asc') {
            list.sort(function (a, b) {
                if (a[field] > b[field])
                    return 1;
                if (a[field] < b[field])
                    return -1;
                return 0;
            });
        }
        else {
            list.sort(function (a, b) {
                if (a[field] > b[field])
                    return -1;
                if (a[field] < b[field])
                    return 1;
                return 0;
            });
        }
        return list;
    };
    return ListProcessor;
}());
exports.default = ListProcessor;
