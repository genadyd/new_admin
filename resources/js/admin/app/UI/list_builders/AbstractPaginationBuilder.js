"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractPaginationBuilder = /** @class */ (function () {
    function AbstractPaginationBuilder() {
    }
    AbstractPaginationBuilder.prototype.build = function (data) {
        if (data.buttons_num !== 0) {
            var navHtml = '<ul class="pagination">' +
                '<li class="page-item">' +
                '<a class="page-link" page_num="1" href="#" aria-label="Previous">' +
                '<span aria-hidden="true">«</span>' +
                '</a>' +
                '</li>';
            //===============================
            for (var i = data.start_page; i <= data.buttons_num; i++) {
                var current = data.current_page == i ? 'current' : '';
                navHtml += '<li class="page-item ' + current + '">' +
                    '<a class="page-link" page_num="' + i + '" href="#">' + i + '</a></li>';
            }
            //========================================
            navHtml += '<li class="page-item">' +
                '<a class="page-link" page_num="' + data.last_page + '" href="#" aria-label="Next">' +
                '<span aria-hidden="true">»</span>' +
                '</a>' +
                '</li>' +
                '</ul>';
            return navHtml;
        }
        return '';
    };
    return AbstractPaginationBuilder;
}());
exports.default = AbstractPaginationBuilder;
