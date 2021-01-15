"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findChildrenIdsList = exports.itemsFindTree = exports.itemFindById = void 0;
exports.itemFindById = (list, itemId) => {
    let res = 0;
    for (let i = 0; i < list.length; i++) {
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
exports.itemsFindTree = (firstElement, resElementsArray = []) => {
    resElementsArray.push(firstElement.id);
    if (firstElement.children_list && firstElement.children_list.length > 0) {
        firstElement.children_list.forEach((item) => {
            return exports.itemsFindTree(item, resElementsArray);
        });
    }
    return resElementsArray;
};
exports.findChildrenIdsList = (parentId, list, idsResArray = []) => {
    let ar = [];
    idsResArray.push(+parentId);
    list.forEach((val) => {
        if (val.parent === parentId)
            ar.push(val.id);
    });
    if (ar.length === 0) {
        return idsResArray;
    }
    else {
        ar.forEach((v) => {
            idsResArray = exports.findChildrenIdsList(v, list, idsResArray);
        });
    }
    return idsResArray;
};
