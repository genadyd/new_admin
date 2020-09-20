"use strict";
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
var FormFieldsValidator_1 = __importDefault(require("../../../lib/FormFieldsValidator"));
var CategoriesApi_1 = __importDefault(require("../../../api/CategoriesApi"));
var Form = /** @class */ (function () {
    function Form() {
        var _this = this;
        this.validator = new FormFieldsValidator_1.default();
        this.form = document.getElementById('category_form');
        this.submitButtonEnableDisable = function (validArray) {
            var submitButton = document.getElementById('category_form_submit');
            var res = validArray.find(function (item) { return !item.is_valid; });
            if (submitButton) {
                if (!res) {
                    submitButton.removeAttribute('disabled');
                }
                else {
                    submitButton.setAttribute('disabled', '');
                }
            }
        };
        this.validatorInit = function () {
            if (_this.form) {
                var formInputs = _this.form.querySelectorAll('.category_data input, .category_data textarea'), validArray_1 = [];
                /*keyup event to input element*/
                formInputs.forEach(function (input) {
                    if (input.hasAttribute('validation')) {
                        validArray_1.push({ name: input.getAttribute('name'), is_valid: false });
                        var res_1;
                        input.addEventListener('keyup', function (e) {
                            res_1 = _this.validator.textValidator(e.currentTarget);
                            if (validArray_1.length > 0) {
                                validArray_1.forEach(function (item) {
                                    if (item.name === input.getAttribute('name')) {
                                        item.is_valid = res_1;
                                    }
                                });
                                _this.submitButtonEnableDisable(validArray_1);
                            }
                        });
                    }
                });
            }
        };
        this.getCategoryData = function () {
            return (_this.form) ? _this.form.querySelectorAll('.category_data input, .category_data textarea') : [];
        };
        this.getTextFieldsElements = function () {
            var textFieldsBlocks = _this.form ? _this.form.querySelectorAll('.categories_text_field') : [];
            var textFieldsArray = [];
            var that = _this;
            textFieldsBlocks.forEach(function (item) {
                var inputsElements = item.querySelectorAll('input , textarea');
                var inputElemObj = {};
                inputsElements.forEach(function (i) {
                    var key = i.getAttribute('name'), val = i.value;
                    if (i.classList.contains("ckeditor_text")) {
                        key = 'ckeditor_text';
                        // @ts-ignore: Unreachable code error
                        val = CKEDITOR.instances[i.getAttribute('id')].getData();
                    }
                    inputElemObj[key] = val;
                });
                if (!that.checkIfTextFieldDataIsEmpty(inputElemObj)) {
                    textFieldsArray = __spreadArrays(textFieldsArray, [inputElemObj]);
                }
            });
            return textFieldsArray;
        };
        this.formSubmit = function () {
            var formElements = __spreadArrays(_this.getCategoryData());
            var validArray;
            // validation ====================
            validArray = formElements.map(function (input) {
                if (input.hasAttribute('validation')) {
                    // if (this.validator.textValidator(input)) return true
                    //  else return false
                    return _this.validator.textValidator(input);
                }
            });
            //validator ======================
            if (!validArray.includes(false)) {
                var token = document.querySelector('[name=csrf-token]');
                var formData = {
                    categoryDataObject: _this.collectCategoryData(formElements),
                    textFieldsObject: _this.getTextFieldsElements(),
                    'X-CSRF-TOKEN': token ? token.getAttribute('content') : ''
                };
                var Api = new CategoriesApi_1.default('/admin/categories/add_category', 'POST', { formData: JSON.stringify(formData) });
                var promise = Api.exeq();
                promise.then(function (data) {
                    if (typeof data == 'number') {
                        _this.clearForm();
                        var radioButton = document.getElementById('list_open_close');
                        if (!radioButton)
                            return;
                        radioButton.checked = true;
                    }
                });
            }
        };
        this.collectCategoryData = function (formElements) {
            if (formElements === void 0) { formElements = []; }
            var catData = {};
            if (formElements.length === 0) {
                formElements = _this.getCategoryData().length > 0 ? __spreadArrays(_this.getCategoryData()) : [];
            }
            formElements.forEach(function (input) {
                catData[input.getAttribute('name')] = input.value;
            });
            return catData;
        };
        this.checkIfTextFieldDataIsEmpty = function (textFieldObject) {
            var objVal = Object.values(textFieldObject);
            var checkArray = objVal.map(function (val) { return val == '' || val == ' '; });
            if (checkArray.some(function (e) { return e === true; })) {
                return true;
            }
            return false;
        };
        this.clearForm = function () {
            var form = document.getElementById('category_form');
            if (form) {
                var inputs = form.querySelectorAll('.category_data input:not([type=hidden]), .category_data textarea,' +
                    '                                   .categories_text_field input, .categories_text_field textarea');
                if (inputs) {
                    inputs.forEach(function (item) {
                        // debugger
                        if (item.id.includes('ckeditor_text')) {
                            // @ts-ignore
                            CKEDITOR.instances[item.name].setData('');
                        }
                        item.value = '';
                    });
                }
                var addedTextFields = form.querySelectorAll('.added');
                if (addedTextFields.length > 0) {
                    addedTextFields.forEach(function (el) {
                        el.remove();
                    });
                }
            }
        };
    }
    return Form;
}());
exports.default = Form;
