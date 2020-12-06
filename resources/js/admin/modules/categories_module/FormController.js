"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CategoriesApi_1 = __importDefault(require("../../app/api/CategoriesApi"));
var TextFieldController_1 = __importDefault(require("./TextFieldController"));
var AbstractFormController_1 = __importDefault(require("../../app/controllers/forms_controllers/AbstractFormController"));
var items_find_1 = require("../../lib/item_find/items_find");
var FormController = /** @class */ (function (_super) {
    __extends(FormController, _super);
    function FormController(stateManager) {
        var _this = _super.call(this, stateManager) || this;
        _this.getInputsCollection = function () {
            return (_this.form) ? _this.form.querySelectorAll('.category_data input, .category_data textarea') : [];
        };
        _this.formSubmit = function () {
            var button = document.querySelector('.add_form_submit');
            if (button) {
                button.addEventListener('click', function () {
                    var formElements = __spreadArrays(_this.getInputsCollection());
                    var validArray;
                    // validation ====================
                    validArray = formElements.map(function (input) {
                        if (input.hasAttribute('validation')) {
                            return _this.validator.textValidator(input);
                        }
                    });
                    //validator ======================
                    if (validArray.includes(false)) {
                        return false;
                    }
                    //=========================
                    var token = document.querySelector('[name=csrf-token]');
                    var categoryDataObject = _this.collectCategoryData(formElements);
                    var textFieldsObject = _this.getTextFieldsElements();
                    var formData = {
                        categoryDataObject: categoryDataObject,
                        textFieldsObject: textFieldsObject,
                        'X-CSRF-TOKEN': token ? token.getAttribute('content') : ''
                    };
                    var Api = new CategoriesApi_1.default('/admin/categories/add_category', 'POST', { formData: JSON.stringify(formData) });
                    var promise = Api.exeq();
                    promise.then(function (data) {
                        if (data.success == 1) {
                            var state = __spreadArrays(_this.stateManager.getState('list'));
                            if (data.category.parent === 0) {
                                state.push(data.category);
                            }
                            else {
                                var elem = items_find_1.itemFindById(state, data.category.parent);
                                if (!elem.children_list)
                                    elem['children_list'] = [];
                                if (elem)
                                    elem.children_list.push(data.category);
                            }
                            _this.stateManager.setState('list', state);
                            _this.clearForm();
                            var radioButton = document.getElementById('list_open_close');
                            if (!radioButton)
                                return;
                            radioButton.checked = true;
                            _this.renderFunc();
                        }
                    });
                });
            }
        };
        _this.clearForm = function () {
            if (_this.form) {
                var inputs = _this.form.querySelectorAll('.entity_data input:not([type=hidden]), .entity_data textarea,' +
                    '.categories_text_field input, .categories_text_field textarea');
                if (inputs) {
                    inputs.forEach(function (item) {
                        if (item.id.includes('ckeditor_text')) {
                            // @ts-ignore
                            CKEDITOR.instances[item.name].setData('html', '');
                        }
                        item.value = '';
                    });
                }
                var addedTextFields = _this.form.querySelectorAll('.added');
                if (addedTextFields.length > 0) {
                    addedTextFields.forEach(function (el) {
                        el.remove();
                    });
                }
            }
        };
        _this.validatorInit();
        _this.formSubmit();
        _this.addTextField();
        return _this;
    }
    FormController.prototype.getTextFieldObject = function () {
        return new TextFieldController_1.default();
    };
    return FormController;
}(AbstractFormController_1.default));
exports.default = FormController;
