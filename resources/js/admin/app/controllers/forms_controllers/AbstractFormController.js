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
var FormFieldsValidator_1 = __importDefault(require("../../../lib/form_validator/FormFieldsValidator"));
var AbstractFormController = /** @class */ (function () {
    function AbstractFormController(stateManager) {
        var _this = this;
        this.addTextField = function () {
            var button = document.getElementById('add_text_field');
            if (button) {
                button.addEventListener('click', function () {
                    _this.textFieldObject.addTextFieldFormElement();
                });
            }
        };
        this.submitButtonEnableDisable = function (validArray) {
            var submitButton = document.querySelector('.add_form_submit');
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
                var formInputs = _this.form.querySelectorAll('.entity_data input, .entity_data textarea'), validArray_1 = [];
                /*keyup event to input element*/
                formInputs.forEach(function (input) {
                    input.addEventListener('input', function (e) {
                        var input = e.currentTarget;
                        validArray_1.push({ name: input.getAttribute('name'), is_valid: false });
                        var res;
                        res = _this.validator.textValidator(e.currentTarget);
                        if (validArray_1.length > 0) {
                            validArray_1.forEach(function (item) {
                                if (item.name === input.getAttribute('name')) {
                                    item.is_valid = res;
                                }
                            });
                            _this.submitButtonEnableDisable(validArray_1);
                        }
                    });
                });
            }
        };
        this.collectCategoryData = function (formElements) {
            if (formElements === void 0) { formElements = []; }
            var catData = {};
            if (formElements.length === 0) {
                formElements = _this.getInputsCollection().length > 0 ? __spreadArrays(_this.getInputsCollection()) : [];
            }
            formElements.forEach(function (input) {
                catData[input.getAttribute('name')] = input.value;
            });
            return catData;
        };
        this.checkIfTextFieldDataIsEmpty = function (textFieldObject) {
            var objVal = Object.values(textFieldObject);
            var checkArray = objVal.map(function (val) { return val == '' || val == ' '; });
            return checkArray.some(function (e) { return e === true; });
        };
        this.getTextFieldsElements = function () {
            var textFieldsBlocks = _this.form ? _this.form.querySelectorAll('.entity_text_field') : [];
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
                        val = CKEDITOR.instances[i.getAttribute('id')].getData('');
                    }
                    inputElemObj[key] = val;
                });
                if (!that.checkIfTextFieldDataIsEmpty(inputElemObj)) {
                    textFieldsArray = __spreadArrays(textFieldsArray, [inputElemObj]);
                }
            });
            return textFieldsArray;
        };
        this.formContainer = document.querySelector('.form_container');
        this.form = document.querySelector('.entity_form');
        this.stateManager = stateManager;
        this.validator = this.getValidator();
        this.textFieldObject = this.getTextFieldObject();
        // this.renderFunc = renderFunc
    }
    AbstractFormController.prototype.getRenderFunc = function (renderFunc, context) {
        this.renderFunc = renderFunc.bind(context);
    };
    AbstractFormController.prototype.getValidator = function () {
        return new FormFieldsValidator_1.default();
    };
    return AbstractFormController;
}());
exports.default = AbstractFormController;
