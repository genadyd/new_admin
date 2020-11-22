"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InfoModalController = /** @class */ (function () {
    function InfoModalController() {
        this.modalContainer = document.getElementById('categoryInfoModal');
        var tokenElem = document.querySelector('[name=csrf-token]');
        this.token = tokenElem ? tokenElem.getAttribute('content') : '';
        this.closeModal();
    }
    InfoModalController.prototype.closeModal = function () {
        var modalsCloseButtons = this.modalContainer.querySelectorAll('.close_button');
        modalsCloseButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var infoActiveRows = document.querySelectorAll('.info_active');
                infoActiveRows.forEach(function (item) {
                    item.classList.remove('info_active');
                });
            });
        });
    };
    InfoModalController.prototype.renderModal = function (modalData) {
        /*set name*/
        var modalNameArea = this.modalContainer.querySelector('#categoryInfoModalName');
        if (modalNameArea)
            modalNameArea.innerHTML = modalData.name;
        /*set data created*/
        var createdDataArea = this.modalContainer.querySelector('.modal-body .created_time .date');
        if (createdDataArea)
            createdDataArea.innerHTML = "<small>" + modalData.created_at + "</small>";
        /* set data updated*/
        var updatedDataArea = this.modalContainer.querySelector('.modal-body .updated_time .date');
        if (updatedDataArea)
            updatedDataArea.innerHTML = "<small>" + modalData.updated_at + "</small>";
        /* set data deleted*/
        var daletedDataArea = this.modalContainer.querySelector('.modal-body .deleted_time .date');
        if (daletedDataArea)
            daletedDataArea.innerHTML = modalData.deleted_at ? "<small>" + modalData.deleted_at + "</small>" : '';
        /* set title*/
        var titleArea = this.modalContainer.querySelector('.modal_data_container .title .text');
        if (titleArea)
            titleArea.innerHTML = modalData.title;
        /* set heading*/
        var headingArea = this.modalContainer.querySelector('.modal_data_container .heading .text');
        if (headingArea)
            headingArea.innerHTML = modalData.heading;
        /* set description*/
        var descriptionArea = this.modalContainer.querySelector('.modal_data_container .description .text');
        if (descriptionArea)
            descriptionArea.innerHTML = modalData.description;
        this.renderTextFields(modalData.text_fields);
    };
    InfoModalController.prototype.renderTextFields = function (modalDataTextFields) {
        var textFieldsArea = this.modalContainer.querySelector('.modal_texts_fields_area');
        if (modalDataTextFields.length === 0) {
            textFieldsArea.innerHTML = '';
            return false;
        }
        var heading = "<h5 class=\"font-weight-bold\">Text fields:</h5><hr/>";
        var html = modalDataTextFields.reduce(function (acc, item) {
            return acc += "<div class=\"one_text p-1\">\n                      <div class=\"title_heading text_field_heading font-weight-bold\">Title:</div>\n                        <div class=\"text_title_area\">" + item.title + "</div><hr/>" +
                ("<div class=\"description_heading text_field_heading font-weight-bold\">Description:</div>\n                        <div class=\"text_field_description_area\">" + item.description + "</div><hr/>") +
                ("<div class=\"text_heading text_field_heading font-weight-bold\">Text:</div>\n                        <div class=\"text_field_text\">" + item.text + "</div></div>");
        }, '');
        if (textFieldsArea) {
            textFieldsArea.innerHTML = heading + html;
        }
    };
    InfoModalController.prototype.confirmModal = function () {
    };
    return InfoModalController;
}());
exports.default = InfoModalController;
