"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriesApi_1 = __importDefault(require("../../../app/api/CategoriesApi"));
const TextFieldController_1 = __importDefault(require("./TextFieldController"));
const AbstractFormController_1 = __importDefault(require("../../../app/controllers/forms_controllers/AbstractFormController"));
const items_find_1 = require("../../../lib/item_find/items_find");
class FormController extends AbstractFormController_1.default {
    constructor(stateRepo) {
        super(stateRepo);
        this.stateRepo = stateRepo;
        this.MODULE_STATE_CONTAINER_NAME = 'categoriesState';
        this.getInputsCollection = () => {
            return (this.form) ? this.form.querySelectorAll('.category_data input, .category_data textarea') : [];
        };
        this.formSubmit = () => {
            const button = document.querySelector('.add_form_submit');
            if (button) {
                button.addEventListener('click', () => {
                    const formElements = [...this.getInputsCollection()];
                    let validArray;
                    // validation ====================
                    validArray = formElements.map(input => {
                        if (input.hasAttribute('validation')) {
                            return this.validator.textValidator(input);
                        }
                    });
                    //validator ======================
                    if (validArray.includes(false)) {
                        return false;
                    }
                    //=========================
                    const token = document.querySelector('[name=csrf-token]');
                    const categoryDataObject = this.collectCategoryData(formElements);
                    const textFieldsObject = this.getTextFieldsElements();
                    const formData = {
                        categoryDataObject: categoryDataObject,
                        textFieldsObject: textFieldsObject,
                        'X-CSRF-TOKEN': token ? token.getAttribute('content') : ''
                    };
                    const Api = new CategoriesApi_1.default('/admin/categories/add_category', 'POST', { formData: JSON.stringify(formData) });
                    const promise = Api.exeq();
                    promise.then((data) => {
                        if (data.success == 1) {
                            const list = [...this.stateRepo.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list')];
                            const indexes = this.stateRepo.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'indexes');
                            if (data.category.parent === 0) {
                                list.push(data.category);
                                indexes[data.category.id] = list.length - 1;
                            }
                            else {
                                const elem = items_find_1.itemFindById(list, data.category.parent);
                                if (!elem.children_list)
                                    elem['children_list'] = [];
                                if (elem)
                                    elem.children_list.push(data.category);
                            }
                            this.stateRepo.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list', list);
                            this.stateRepo.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'indexes', indexes, () => { });
                            this.clearForm();
                            const radioButton = document.getElementById('list_open_close');
                            if (!radioButton)
                                return;
                            radioButton.checked = true;
                        }
                    });
                });
            }
        };
        this.clearForm = () => {
            if (this.form) {
                const inputs = this.form.querySelectorAll('.entity_data input:not([type=hidden]), .entity_data textarea,' +
                    '.categories_text_field input, .categories_text_field textarea');
                if (inputs) {
                    inputs.forEach((item) => {
                        if (item.id.includes('ckeditor_text')) {
                            // @ts-ignore
                            CKEDITOR.instances[item.name].setData('html', '');
                        }
                        item.value = '';
                    });
                }
                const addedTextFields = this.form.querySelectorAll('.added');
                if (addedTextFields.length > 0) {
                    addedTextFields.forEach((el) => {
                        el.remove();
                    });
                }
            }
        };
        this.validatorInit();
        this.formSubmit();
        this.addTextField();
    }
    getTextFieldObject() {
        return new TextFieldController_1.default();
    }
}
exports.default = FormController;
