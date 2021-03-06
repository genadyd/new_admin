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
var AbstractListProcessor_1 = __importDefault(require("../../../app/list_processor/AbstractListProcessor"));
var recursive_search_1 = require("../../../lib/list_search_recursive/recursive_search");
var ListProcessor = /** @class */ (function (_super) {
    __extends(ListProcessor, _super);
    function ListProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListProcessor.prototype.getList = function (list) {
        if (list === void 0) { list = __spreadArrays(this.state.list.filter(function (item) { return item.parent === 0; })); }
        list = this.searchItems(list);
        list = this.sortByField(list);
        list = this.includeDeleted(list);
        list = this.onlyDeleted(list);
        list = this.checkItemIfReallyHasChildren(list);
        list = this.renderPerPage(list);
        return list;
    };
    ListProcessor.prototype.searchItems = function (list) {
        return this.state.search_string !== '' ? recursive_search_1.recursiveSearchFunction(this.state.search_string, ['heading', 'name'], __spreadArrays(this.state.list)) : list;
    };
    return ListProcessor;
}(AbstractListProcessor_1.default));
exports.default = ListProcessor;
