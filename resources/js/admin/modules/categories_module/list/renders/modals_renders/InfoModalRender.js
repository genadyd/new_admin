"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InfoModalRender = /** @class */ (function () {
    function InfoModalRender(data, modalContainer) {
        this.data = data;
        this.modalContainer = modalContainer;
    }
    InfoModalRender.prototype.render = function () {
        this.headerRender();
        this.datesBoxRender();
        this.modalBodyRender();
    };
    InfoModalRender.prototype.headerRender = function () {
        var headingContainer = this.modalContainer.querySelector('#categoryInfoModalTitle');
        headingContainer.innerHTML = this.data.heading;
    };
    InfoModalRender.prototype.datesBoxRender = function () {
        var headingContainer = this.modalContainer.querySelector('.dates_info_list');
        headingContainer.querySelector('.created_time .date').innerHTML = "<small>" + this.data.created_at + "</small>";
        headingContainer.querySelector('.updated_time .date').innerHTML = "<small>" + this.data.updated_at + "</small>";
        headingContainer.querySelector('.deleted_time .date').innerHTML = "<small>" + (this.data.deleted_at ? this.data.deleted_at : 'not deleted') + "</small>";
    };
    InfoModalRender.prototype.modalBodyRender = function () {
        var modalDataContainer = this.modalContainer.querySelector('.modal_data_container');
        modalDataContainer.querySelector('.title .text').innerText = this.data.title;
        modalDataContainer.querySelector('.heading .text').innerText = this.data.heading;
        modalDataContainer.querySelector('.description .text').innerText = this.data.description;
    };
    return InfoModalRender;
}());
exports.default = InfoModalRender;
