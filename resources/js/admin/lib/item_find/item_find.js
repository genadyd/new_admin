"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemFindFunc = void 0;
exports.itemFindFunc = function (list, itemId) {
    var res = 0;
    list.forEach(function (val) {
        if (val.id === itemId) {
            res = val;
            return res;
        }
        if (val.children_list && val.children_list.length > 0) {
            return exports.itemFindFunc(val.children_list, itemId);
        }
    });
    return res;
};
