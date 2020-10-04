import TextField from "./TextField";
import Form from "./Form";

class FormListeners {
    private textField:any
    private formController = new Form()
    constructor(){
        this.textField = new TextField()
        this.formController.validatorInit()
        this.add()
        this.addTextField()
        this.textFieldRemove()
        this.textFieldOpenClose()
        this.listOpenClose()
    }
     add =()=>{
        const button = document.getElementById('category_form_submit')
        if(!button)return;
        button.addEventListener('click',(e)=>{
            this.formController.formSubmit()
        })
    }
    addTextField =()=>{
        const button = document.getElementById('add_text_field')
        if(!button)return;
        button.addEventListener('click',(e)=>{
            this.textField.addTextFieldFormElement()

        })
    }
     textFieldRemove =()=>{
        const form = document.getElementById('category_form_container')
        if(!form) return
        form.addEventListener('click',(e:any)=>{
            if(e.target && e.target.matches('.remove_field')){
                this.textField.fieldRemove(e)
            }
        })
    }
    textFieldOpenClose =()=>{
        const form = document.getElementById('category_form_container')
        if(!form) return
        form.addEventListener('click',(e:any)=>{
            if(e.target && e.target.matches('.text_open_close')){
                this.textField.fieldOpenClose(e)
            }
        })
    }
    listOpenClose=()=>{
       const openCloseButton = document.getElementById('list_open_close_button')
        if(openCloseButton){
            openCloseButton.onclick = ()=>{
                this.formController.listOpenClose()
            }
        }
}
  }
  export default FormListeners
