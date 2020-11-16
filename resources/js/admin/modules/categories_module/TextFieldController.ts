import CategoriesApi from "../../app/api/CategoriesApi";
import AbstractTextFieldController from "../../app/controllers/forms_controllers/AbstractTextFieldController";

class TextFieldController extends AbstractTextFieldController{
    keys =[1]

    addTextFieldFormElement = () => {
        const api = new CategoriesApi('/admin/categories/get_text_field', 'POST', {}, 'text')
        const promise: any = api.exeq()
        promise.then((data: any) => {
                const textFieldContainer = document.querySelector('div.catTextFieldsContainer')
                const container: any = document.createElement('div')
                container.classList.add('added')
                container.classList.add('hidden')
                container.innerHTML = data
                if (textFieldContainer) {
                    textFieldContainer.append(container)
                }
            this.fieldsChangeBoxProperties()
             setTimeout(()=>{
                container.classList.remove('hidden')
             },20)
            }
        )
    }
    fieldsChangeBoxProperties = ()=>{
        const fieldsBoxes = document.querySelectorAll('.added .categories_text_field')

        fieldsBoxes.forEach((item, key)=>{
            let max = this.keys[this.keys.length-1]
            this.keys.push(max+1)
            if(item) {
                const num = item.querySelector('.head .left_box .num')
                if(num) num.textContent= `${key+1}`
                const editor = item.querySelector('[name=ckeditor_text]')
                  if(editor){
                      const new_id = `ckeditor_text_${this.keys[this.keys.length-1]}`
                      editor.setAttribute('id', new_id )
                      editor.setAttribute('name', new_id )
                      // const oldScript = item.querySelector('script')
                      // if(oldScript){
                      //     oldScript.remove()
                      // }
                     // @ts-ignore
                      CKEDITOR.replace(new_id,{
                          customConfig: '../ckeditor/custom_config.js'
                      })
                  }
            }
        })
    }



}

export default TextFieldController
