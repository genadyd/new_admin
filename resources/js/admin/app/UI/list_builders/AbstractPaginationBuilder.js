"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractPaginationBuilder {
    build(data) {
        if (data.buttons_num > 0) {
            let navHtml = '<ul class="pagination">' +
                '<li class="page-item">' +
                '<a class="page-link" page_num="1" href="#" aria-label="Previous">' +
                '<span aria-hidden="true">«</span>' +
                '</a>' +
                '</li>';
            //===============================
            for (let i = data.start_page; i <= data.end_page; i++) {
                let current = data.current_page == i ? 'current' : '';
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
    }
}
exports.default = AbstractPaginationBuilder;
