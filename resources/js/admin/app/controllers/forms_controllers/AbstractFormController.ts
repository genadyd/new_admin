import FormFieldsValidator from "../../../lib/form_validator/FormFieldsValidator";
import FormControllersInterface from "./FormControllersInterface";

abstract class AbstractFormController implements FormControllersInterface{
    protected textFieldObject:any
    protected form: any
    protected validator: any
    protected formContainer: any
    protected renderFunc:any
    protected stateManager:any
    protected constructor(protected stateRepo:any) {
        this.formContainer = document.querySelector('.form_container')
        this.form = document.querySelector('.entity_form')
        this.validator = this.getValidator()
        this.textFieldObject = this.getTextFieldObject()
        // this.renderFunc = renderFunc
    }
    protected abstract  getTextFieldObject():void
    protected abstract getInputsCollection():any[]

    public getRenderFunc(renderFunc:any, context:any){
        this.renderFunc = renderFunc.bind(context)
    }
    protected getValidator(): FormFieldsValidator {
        return new FormFieldsValidator()
    }

    protected addTextField = () => {
        const button = document.getElementById('add_text_field')
        if (button) {
            button.addEventListener('click', () => {
                this.textFieldObject.addTextFieldFormElement()
            })
        }
    }
    protected submitButtonEnableDisable = (validArray: Array<object>) => {
        const submitButton = document.querySelector('.add_form_submit')
        let res = validArray.find((item: any) => !item.is_valid)
        if (submitButton) {
            if (!res) {
                submitButton.removeAttribute('disabled')
            } else {
                submitButton.setAttribute('disabled', '')
            }
        }
    }
    protected validatorInit = () => {
        if (this.form) {
            const formInputs = this.form.querySelectorAll('.entity_data input, .entity_data textarea'),
                validArray: any = []
            /*keyup event to input element*/
            formInputs.forEach((input: any) => {
                input.addEventListener('input', (e: any) => {
                    const input = e.currentTarget
                    validArray.push({name: input.getAttribute('name'), is_valid: false})
                    let res: boolean
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
            })
        }
    }

    protected collectCategoryData = (formElements: any[] = []): Array<object> => {
        const catData: any = {}
        if (formElements.length === 0) {
            formElements = this.getInputsCollection().length > 0 ? [...this.getInputsCollection()] : []
        }
        formElements.forEach((input) => {
            catData[input.getAttribute('name')] = input.value
        });
        return catData
    }
    protected checkIfTextFieldDataIsEmpty = (textFieldObject: {}) => {
        const objVal = Object.values(textFieldObject)
        const checkArray = objVal.map(val => val == '' || val == ' ')
        return checkArray.some(e => e === true)
    }
    protected getTextFieldsElements = (): any => {
        const textFieldsBlocks = this.form ? this.form.querySelectorAll('.entity_text_field') : []
        let textFieldsArray: any = []
        const that = this
        textFieldsBlocks.forEach(function (item: any) {
            let inputsElements = item.querySelectorAll('input , textarea')
            const inputElemObj = {} as any
            inputsElements.forEach(function (i: any) {
                let key: string = i.getAttribute('name'),
                    val: string = i.value
                if (i.classList.contains("ckeditor_text")) {
                    key = 'ckeditor_text'
                    // @ts-ignore: Unreachable code error
                    val = CKEDITOR.instances[i.getAttribute('id')].getData('')
                }
                inputElemObj[key] = val
            })

            if (!that.checkIfTextFieldDataIsEmpty(inputElemObj)) {
                textFieldsArray = [...textFieldsArray, inputElemObj]
            }
        })
        return textFieldsArray
    }
}
export default AbstractFormController
