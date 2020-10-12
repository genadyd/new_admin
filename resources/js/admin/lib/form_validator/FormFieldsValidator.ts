class FormFieldsValidator {
     patterns = [
         {name:'simpleString', value:new RegExp(/^[\p{Letter}\w\s:()_-]{3,100}$/u)},
         {name:'innerUrl', value:new RegExp(/^[\p{Letter}\d\/a-z_-]{3,50}$/u)},
         {name:'longText', value:new RegExp(/^[\p{Letter};,\.\w\s:()_-]*$/u)},
     ]
     textValidator = (input:any, ):boolean=>{
        const patternName = input.getAttribute('pattern')
        const found = this.patterns.find((elem)=>elem.name===patternName)

        if(found && !found.value.test(input.value)){

      const inpCont = input.closest('div.input_block')
            inpCont.classList.add('error')
            return false
        }else{
            input.closest('div.input_block').classList.remove('error')
            return true
        }

    }


}
export default FormFieldsValidator
