"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriesApi_1 = __importDefault(require("../../../app/api/CategoriesApi"));
const AbstractTextFieldController_1 = __importDefault(require("../../../app/controllers/forms_controllers/AbstractTextFieldController"));
class TextFieldController extends AbstractTextFieldController_1.default {
    constructor() {
        super(...arguments);
        this.keys = [1];
        this.addTextFieldFormElement = () => {
            const api = new CategoriesApi_1.default('/admin/categories/get_text_field', 'POST', {}, 'text');
            const promise = api.exeq();
            promise.then((data) => {
                const textFieldContainer = document.querySelector('div.catTextFieldsContainer');
                const container = document.createElement('div');
                container.classList.add('added');
                container.classList.add('hidden');
                container.innerHTML = data;
                if (textFieldContainer) {
                    textFieldContainer.append(container);
                }
                this.fieldsChangeBoxProperties();
                setTimeout(() => {
                    container.classList.remove('hidden');
                }, 20);
            });
        };
        this.fieldsChangeBoxProperties = () => {
            const fieldsBoxes = document.querySelectorAll('.added .categories_text_field');
            fieldsBoxes.forEach((item, key) => {
                let max = this.keys[this.keys.length - 1];
                this.keys.push(max + 1);
                if (item) {
                    const num = item.querySelector('.head .left_box .num');
                    if (num)
                        num.textContent = `${key + 1}`;
                    const editor = item.querySelector('[name=ckeditor_text]');
                    if (editor) {
                        const new_id = `ckeditor_text_${this.keys[this.keys.length - 1]}`;
                        editor.setAttribute('id', new_id);
                        editor.setAttribute('name', new_id);
                        // const oldScript = item.querySelector('script')
                        // if(oldScript){
                        //     oldScript.remove()
                        // }
                        // @ts-ignore
                        CKEDITOR.replace(new_id, {
                            customConfig: '../ckeditor/custom_config.js'
                        });
                    }
                }
            });
        };
    }
}
exports.default = TextFieldController;
