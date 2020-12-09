"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveSearchFunction = void 0;
/*
* recursive search func
* @ params :
*   1. searchString:string
*   2. fieldsNamesList:string[] - search targets field names
*   3. list:array - search list
* @return : new list of funded elements or false
*
* */
exports.recursiveSearchFunction = function (searchString, fieldsNamesList, list) {
    var listRes = [];
    list = JSON.parse(JSON.stringify(list)); /*deep list copy*/
    var pattern = new RegExp((searchString), "g");
    list.forEach(function (item) {
        var foundField = fieldsNamesList.filter(function (field) { return pattern.test(item[field]); });
        if (foundField.length > 0) {
            foundField.forEach(function (f) {
                item[f] = item[f].replace(pattern, "<span class=\"finded\">" + searchString + "</span>");
            });
            listRes.push(item);
        }
        if (item.children_list && item.children_list.length > 0) {
            listRes = __spreadArrays(listRes, exports.recursiveSearchFunction(searchString, fieldsNamesList, __spreadArrays(item.children_list)));
        }
    });
    return listRes;
};
