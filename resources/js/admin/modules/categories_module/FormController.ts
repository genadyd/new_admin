import CategoriesApi from "../../app/api/CategoriesApi";
import TextFieldController from "./TextFieldController";
import AbstractFormController from "../../app/controllers/forms_controllers/AbstractFormController";
import FormControllersInterface from "../../app/controllers/forms_controllers/FormControllersInterface";
import {itemFindById} from "../../lib/item_find/items_find";


class FormController extends AbstractFormController implements FormControllersInterface  {

    constructor(stateManager:any) {
        super(stateManager)
        this.validatorInit()
        this.formSubmit()
        this.addTextField()
    }

    protected getTextFieldObject(): TextFieldController {
        return new TextFieldController()
    }
    protected getInputsCollection = (): any => {
        return (this.form) ? this.form.querySelectorAll('.category_data input, .category_data textarea') : []
    }

    protected formSubmit = () => {
        const button = document.querySelector('.add_form_submit')
        if (button) {
            button.addEventListener('click', () => {
                const formElements = [...this.getInputsCollection()]
                let validArray: any[]
                // validation ====================
                validArray = formElements.map(input => {
                    if (input.hasAttribute('validation')) {
                        return this.validator.textValidator(input)
                    }
                })

                //validator ======================
                if (validArray.includes(false)) {
                    return false
                }
                //=========================
                const token = document.querySelector('[name=csrf-token]')
                const categoryDataObject = this.collectCategoryData(formElements)
                const textFieldsObject = this.getTextFieldsElements()
                const formData = {
                    categoryDataObject: categoryDataObject,
                    textFieldsObject: textFieldsObject,
                    'X-CSRF-TOKEN': token ? token.getAttribute('content') : ''
                }
                const Api = new CategoriesApi('/admin/categories/add_category', 'POST', {formData: JSON.stringify(formData)})
                const promise: any = Api.exeq()
                promise.then((data: any) => {
                    if (data.success == 1) {
                        const state = [...this.stateManager.getState('list')]
                        if(data.category.parent === 0) {
                            state.push(data.category)
                        }else{
                          const elem:any =  itemFindById( state, data.category.parent)
                            if(!elem.children_list)elem['children_list'] = []
                            if(elem) elem.children_list.push(data.category)
                        }
                        this.stateManager.setState('list', state)
                        this.clearForm()
                        const radioButton: any = document.getElementById('list_open_close')
                        if (!radioButton) return
                        radioButton.checked = true
                        this.renderFunc()
                    }
                });
            })
        }
    }
    protected clearForm = () => {
        if (this.form) {
            const inputs: any = this.form.querySelectorAll('.entity_data input:not([type=hidden]), .entity_data textarea,' +
                '.categories_text_field input, .categories_text_field textarea')
            if (inputs) {
                inputs.forEach((item: any) => {
                    if (item.id.includes('ckeditor_text')) {
                        // @ts-ignore
                        CKEDITOR.instances[item.name].setData('html', '')
                    }
                    item.value = ''
                })
            }
            const addedTextFields = this.form.querySelectorAll('.added')
            if (addedTextFields.length > 0) {
                addedTextFields.forEach((el: any) => {
                    el.remove();
                })
            }

        }
    }


}

export default FormController

