"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListBuilder = /** @class */ (function () {
    function ListBuilder() {
    }
    ListBuilder.prototype.build = function (list) {
        var _this = this;
        var listHtml = '';
        list.forEach(function (item, key) {
            if (item.to_render)
                listHtml += _this.listHtmlBuild(item, key);
        });
        return listHtml;
    };
    ListBuilder.prototype.listHtmlBuild = function (item, key) {
        var deleted = item.deleted_at ? ' deleted' : '';
        var textFieldsNum = item.text_fields.length;
        var listHtml = '';
        listHtml += "<div class=\"one_item one_cat" + deleted + " \" data-id=\"" + item.id + "\" data-key=\"" + key + "\">" +
            "<div class=\"one_cat_header row align-items-center py-1 mx-0 py-lg-2 border-bottom\">" +
            ("<div class=\"id_field col col-1\">" + item.id + "</div>") +
            ("<div class=\"name_field col-3\">" + item.name + "</div>") +
            ("<div class=\"heading_field col-4\">" + item.heading + "</div>") +
            ("<div class=\"text_fields_field col-2\">" + textFieldsNum + "</div>") +
            "<div class=\"controls_field col-2 d-flex justify-content-end align-items-center\">" +
            "<span title=\"add into\" class=\"material-icons add_into_this\">add</span>";
        if (item.children_list && item.children_list.length > 0) {
            listHtml += '<span title="list view" class="material-icons view_list">expand_more</span>';
        }
        listHtml += "<button type=\"button\" class=\"info_button ml-0\" data-toggle=\"modal\" data-target=\"#categoryInfoModal\">" +
            "<span class=\"material-icons info\">info</span>" +
            "</button>" +
            "<span class=\"material-icons edit ml-1\">create</span>";
        if (item.deleted_at) {
            listHtml += "<button type=\"button\" class=\"category_restore_button item_restore_button btn p-0 ml-1\" >" +
                "<span class=\"material-icons restore\" title=\"restore\">restore</span>" +
                "</button>";
        }
        else {
            listHtml += "<button type=\"button\" class=\"category_delete_button item_delete_button btn p-0 ml-1\" data-toggle=\"modal\" data-target=\"#itemDeleteModal\">" +
                "<span class=\"material-icons delete\" title=\"delete\">delete</span>" +
                "</button>";
        }
        listHtml += "</div></div>\n          <div class=\"one_cat_body pr-3 mb-1\"></div></div>";
        return listHtml;
    };
    return ListBuilder;
}());
exports.default = ListBuilder;
