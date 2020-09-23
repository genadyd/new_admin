"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RegularPaginationBuilder_1 = __importDefault(require("../html_pagination_builder/RegularPaginationBuilder"));
var RegularRender = /** @class */ (function () {
    function RegularRender(api) {
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
        this.api = api.getList();
    }
    /*
       * get items HTML and put it into page table box
       * */
    RegularRender.prototype.listRender = function (builder) {
        var _this = this;
        this.api.then(function (data) {
            var listHtml = '';
            data.categories.forEach(function (item, key) {
                listHtml += builder.builder(item, key);
            });
            _this.append(listHtml);
            var paginationHtml = _this.paginationRender(new RegularPaginationBuilder_1.default(), data);
            _this.paginationAppend(paginationHtml);
        });
    };
    RegularRender.prototype.paginationRender = function (builder, data) {
        var objectToBuilder = {
            start_page: +data.start_button_num,
            current_page: +data.current_page,
            last_page: +data.last_page,
            buttons_num: +data.pages_num
        };
        if (objectToBuilder.current_page == objectToBuilder.last_page) { /*if last page*/
            objectToBuilder.start_page = objectToBuilder.current_page - 2;
            objectToBuilder.buttons_num = objectToBuilder.last_page;
        }
        else if (objectToBuilder.current_page > 1 && objectToBuilder.current_page < objectToBuilder.last_page) {
            objectToBuilder.start_page = objectToBuilder.current_page - 1;
            objectToBuilder.buttons_num = objectToBuilder.current_page + 1;
        }
        else {
            objectToBuilder.start_page = 1;
        }
        var paginationHtml = builder.build(objectToBuilder);
        return paginationHtml;
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
