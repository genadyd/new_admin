abstract class AbstractTextFieldController{
    protected formContainer: any
    constructor() {
        this.formContainer = document.querySelector('.form_container')
        this.textFieldOpenClose()
        this.textFieldRemove()
    }
     protected abstract addTextFieldFormElement():void
     protected abstract fieldsChangeBoxProperties():void

    protected textFieldOpenClose = () => {
        if (this.formContainer) {
            this.formContainer.addEventListener('click', (e: any) => {
                if (e.target && e.target.matches('.text_open_close')) {
                    const target = e.target,
                        parentElement = target.closest('.added'),
                        body = parentElement.querySelector('.body')
                    let nodeText = target.textContent
                    if(nodeText === 'keyboard_arrow_up'){
                        body.classList.add('colapsed')
                        target.textContent = 'keyboard_arrow_down'
                    }else{
                        body.classList.remove('colapsed')
                        target.textContent = 'keyboard_arrow_up'
                    }
                }
            })
        }
    }
    protected textFieldRemove = () => {
        if (this.formContainer) {
            this.formContainer.addEventListener('click', (e: any) => {
                if (e.target && e.target.matches('.remove_field')) {
                    const parentElement = e.target.closest('.added')
                    parentElement.classList.add('hidden')
                    setTimeout(()=>{
                        parentElement.remove()
                    },500)
                }
            })
        }
    }
}
export default AbstractTextFieldController
