"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsFindTree = exports.itemFindById = void 0;
exports.itemFindById = function (list, itemId) {
    var res = 0;
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === itemId) {
            res = list[i];
            break;
        }
        else if (list[i].children_list && list[i].children_list.length > 0) {
            res = exports.itemFindById(list[i].children_list, +itemId);
        }
    }
    return res;
};
exports.itemsFindTree = function (firstElement, resElementsArray) {
    if (resElementsArray === void 0) { resElementsArray = []; }
    resElementsArray.push(firstElement.id);
    if (firstElement.children_list && firstElement.children_list.length > 0) {
        firstElement.children_list.forEach(function (item) {
            return exports.itemsFindTree(item, resElementsArray);
        });
    }
    return resElementsArray;
};
