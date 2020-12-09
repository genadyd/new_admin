"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractListProcessor = /** @class */ (function () {
    function AbstractListProcessor(state) {
        this.state = state;
    }
    AbstractListProcessor.prototype.onlyDeleted = function (list) {
        if (this.state.only_deleted) {
            return list.filter(function (val) { return val.deleted_at; });
        }
        return list;
    };
    AbstractListProcessor.prototype.renderPerPage = function (list) {
        if (list.length > 0) {
            var perPageNum = this.state.per_page || 0;
            var perPage = perPageNum != 0 ? perPageNum : list.length;
            var currentPage = this.state.current_page;
            var lastPage = Math.ceil(list.length / perPage);
            if (currentPage > lastPage) {
                this.state.current_page = lastPage;
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
    AbstractListProcessor.prototype.includeDeleted = function (list) {
        if (!this.state.include_deleted) {
            return list.filter(function (val) { return !val.deleted_at; });
        }
        return list;
    };
    AbstractListProcessor.prototype.sortByField = function (_a) {
        var list = _a.slice(0);
        var _b = this.state.sort_by, field = _b.field, direction = _b.direction;
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
    AbstractListProcessor.prototype.checkItemIfReallyHasChildren = function (list) {
        var _this = this;
        if (!this.state.include_deleted) {
            var listCopy = JSON.parse(JSON.stringify(list));
            listCopy.forEach(function (item) {
                if (item.children_count > 0) {
                    var filteredList = _this.state.list.filter(function (el) { return el.parent === item.id && el.deleted_at; });
                    if (filteredList.length === item.children_count)
                        item.children_count = 0;
                }
            });
            return listCopy;
        }
        return list;
    };
    return AbstractListProcessor;
}());
exports.default = AbstractListProcessor;
