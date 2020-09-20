"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TextField_1 = __importDefault(require("./TextField"));
var Form_1 = __importDefault(require("./Form"));
var FormListeners = /** @class */ (function () {
    function FormListeners() {
        var _this = this;
        this.formController = new Form_1.default();
        this.add = function () {
            var button = document.getElementById('category_form_submit');
            if (!button)
                return;
            button.addEventListener('click', function (e) {
                _this.formController.formSubmit();
            });
        };
        this.addTextField = function () {
            var button = document.getElementById('add_text_field');
            if (!button)
                return;
            button.addEventListener('click', function (e) {
                _this.textField.addTextFieldFormElement();
            });
        };
        this.textFieldRemove = function () {
            var form = document.getElementById('category_form_container');
            if (!form)
                return;
            form.addEventListener('click', function (e) {
                if (e.target && e.target.matches('.remove_field')) {
                    _this.textField.fieldRemove(e);
                }
            });
        };
        this.textFieldOpenClose = function () {
            var form = document.getElementById('category_form_container');
            if (!form)
                return;
            form.addEventListener('click', function (e) {
                if (e.target && e.target.matches('.text_open_close')) {
                    _this.textField.fieldOpenClose(e);
                }
            });
        };
        this.textField = new TextField_1.default();
        this.formController.validatorInit();
        this.add();
        this.addTextField();
        this.textFieldRemove();
        this.textFieldOpenClose();
    }
    return FormListeners;
}());
exports.default = FormListeners;
