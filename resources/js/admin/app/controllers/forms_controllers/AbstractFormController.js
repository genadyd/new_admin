"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormFieldsValidator_1 = __importDefault(require("../../../lib/form_validator/FormFieldsValidator"));
class AbstractFormController {
    constructor(stateManager) {
        this.addTextField = () => {
            const button = document.getElementById('add_text_field');
            if (button) {
                button.addEventListener('click', () => {
                    this.textFieldObject.addTextFieldFormElement();
                });
            }
        };
        this.submitButtonEnableDisable = (validArray) => {
            const submitButton = document.querySelector('.add_form_submit');
            let res = validArray.find((item) => !item.is_valid);
            if (submitButton) {
                if (!res) {
                    submitButton.removeAttribute('disabled');
                }
                else {
                    submitButton.setAttribute('disabled', '');
                }
            }
        };
        this.validatorInit = () => {
            if (this.form) {
                const formInputs = this.form.querySelectorAll('.entity_data input, .entity_data textarea'), validArray = [];
                /*keyup event to input element*/
                formInputs.forEach((input) => {
                    input.addEventListener('input', (e) => {
                        const input = e.currentTarget;
                        validArray.push({ name: input.getAttribute('name'), is_valid: false });
                        let res;
                        res = this.validator.textValidator(e.currentTarget);
                        if (validArray.length > 0) {
                            validArray.forEach((item) => {
                                if (item.name === input.getAttribute('name')) {
                                    item.is_valid = res;
                                }
                            });
                            this.submitButtonEnableDisable(validArray);
                        }
                    });
                });
            }
        };
        this.collectCategoryData = (formElements = []) => {
            const catData = {};
            if (formElements.length === 0) {
                formElements = this.getInputsCollection().length > 0 ? [...this.getInputsCollection()] : [];
            }
            formElements.forEach((input) => {
                catData[input.getAttribute('name')] = input.value;
            });
            return catData;
        };
        this.checkIfTextFieldDataIsEmpty = (textFieldObject) => {
            const objVal = Object.values(textFieldObject);
            const checkArray = objVal.map(val => val == '' || val == ' ');
            return checkArray.some(e => e === true);
        };
        this.getTextFieldsElements = () => {
            const textFieldsBlocks = this.form ? this.form.querySelectorAll('.entity_text_field') : [];
            let textFieldsArray = [];
            const that = this;
            textFieldsBlocks.forEach(function (item) {
                let inputsElements = item.querySelectorAll('input , textarea');
                const inputElemObj = {};
                inputsElements.forEach(function (i) {
                    let key = i.getAttribute('name'), val = i.value;
                    if (i.classList.contains("ckeditor_text")) {
                        key = 'ckeditor_text';
                        // @ts-ignore: Unreachable code error
                        val = CKEDITOR.instances[i.getAttribute('id')].getData('');
                    }
                    inputElemObj[key] = val;
                });
                if (!that.checkIfTextFieldDataIsEmpty(inputElemObj)) {
                    textFieldsArray = [...textFieldsArray, inputElemObj];
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
    getRenderFunc(renderFunc, context) {
        this.renderFunc = renderFunc.bind(context);
    }
    getValidator() {
        return new FormFieldsValidator_1.default();
    }
}
exports.default = AbstractFormController;
