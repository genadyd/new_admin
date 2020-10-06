import FormFieldsValidator from "../../../lib/form_validator/FormFieldsValidator";
import CategoriesApi from "../../../api/CategoriesApi";


class Form {
    private validator = new FormFieldsValidator()
    private form = document.getElementById('category_form')

    submitButtonEnableDisable = (validArray: Array<object>) => {
        const submitButton = document.getElementById('category_form_submit')
        let res = validArray.find((item: any) => !item.is_valid)
        if (submitButton) {
            if (!res) {
                submitButton.removeAttribute('disabled')
            } else {
                submitButton.setAttribute('disabled', '')
            }
        }
    }
    validatorInit = () => {
        if (this.form) {
            const formInputs = this.form.querySelectorAll('.category_data input, .category_data textarea'),
                validArray: any = []
            /*keyup event to input element*/
            formInputs.forEach((input) => {
                if (input.hasAttribute('validation')) {
                    validArray.push({name: input.getAttribute('name'), is_valid: false})
                    let res: boolean
                    input.addEventListener('keyup', (e) => {
                        res = this.validator.textValidator(e.currentTarget)
                        if (validArray.length > 0) {
                            validArray.forEach((item: any) => {
                                if (item.name === input.getAttribute('name')) {
                                    item.is_valid = res
                                }
                            })
                            this.submitButtonEnableDisable(validArray)
                        }
                    })
                }
            })

        }
    }
    private getCategoryData = (): any => {
       return  (this.form) ? this.form.querySelectorAll('.category_data input, .category_data textarea') : []
    }

    private getTextFieldsElements = (): any => {
        const textFieldsBlocks = this.form ? this.form.querySelectorAll('.categories_text_field') : []
        let textFieldsArray:any = []
        const that = this
        textFieldsBlocks.forEach(function (item: any) {
            let inputsElements = item.querySelectorAll('input , textarea')
            const inputElemObj = {} as any
            inputsElements.forEach(function (i: any) {
                let key:string = i.getAttribute('name'),
                    val:string = i.value
                if (i.classList.contains("ckeditor_text")) {
                    key = 'ckeditor_text'
                    // @ts-ignore: Unreachable code error
                    val = CKEDITOR.instances[i.getAttribute('id')].getData()
                }
                inputElemObj[key] = val
            })

            if (!that.checkIfTextFieldDataIsEmpty(inputElemObj)) {
                textFieldsArray = [...textFieldsArray,inputElemObj]
            }

        })

        return textFieldsArray
    }

    formSubmit = () => {
        const formElements = [...this.getCategoryData()]

        let validArray:any[]
        // validation ====================
        validArray = formElements.map(input => {
            if (input.hasAttribute('validation')) {
                // if (this.validator.textValidator(input)) return true
                //  else return false
                return this.validator.textValidator(input)
            }
        })
        //validator ======================
        if (!validArray.includes(false)) {
            const token = document.querySelector('[name=csrf-token]')
            const formData = {
                categoryDataObject: this.collectCategoryData(formElements),
                textFieldsObject: this.getTextFieldsElements(),
                'X-CSRF-TOKEN': token ? token.getAttribute('content') : ''
            }
            const Api = new CategoriesApi('/admin/categories/add_category', 'POST', {formData: JSON.stringify(formData)})
            const promise: any = Api.exeq()
            promise.then((data: any) => {
               if(typeof data == 'number'){
                  this.clearForm()
                   const radioButton:any = document.getElementById('list_open_close')
                   if(!radioButton)return
                   radioButton.checked = true
               }
            });

        }
    }
    private collectCategoryData = (formElements: Array<any> = []): Array<object> => {
        const catData: any = {}
        if (formElements.length === 0) {
            formElements = this.getCategoryData().length > 0 ? [...this.getCategoryData()] : []
        }
        formElements.forEach((input) => {
            catData[input.getAttribute('name')] = input.value
        });
        return catData
    }
    private checkIfTextFieldDataIsEmpty = (textFieldObject:{}) => {
        const objVal = Object.values(textFieldObject)

        const checkArray = objVal.map(val => val == '' || val == ' ')

        if (checkArray.some(e => e === true)) {
            return true
        }
        return false

    }
    private clearForm = ()=>{
        const form = document.getElementById('category_form');
        if(form){
            const inputs:any = form.querySelectorAll('.category_data input:not([type=hidden]), .category_data textarea,' +
                '                                   .categories_text_field input, .categories_text_field textarea')
            if(inputs) {
                inputs.forEach((item:any) => {
                    // debugger
                    if(item.id.includes('ckeditor_text')){
                        // @ts-ignore
                        CKEDITOR.instances[item.name].setData('')
                    }
                    item.value =''
                })
            }
            const addedTextFields = form.querySelectorAll('.added')
            if(addedTextFields.length>0){
                addedTextFields.forEach((el) =>{
                    el.remove();
                })
            }

        }
    }
    listOpenClose = ()=>{
       const radioButton = document.getElementById('list_open_close')
        if(radioButton){
            radioButton.checked = true
        }
    }

}

export default Form

