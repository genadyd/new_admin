import AbstractStateManager from "../../app/state_manager/AbstractStateManager";
import CategoriesApi from "../../app/api/CategoriesApi";
import {State} from "./CategoriesState";
import ListRender from "./ListRender";

class CategoriesStateManager extends AbstractStateManager{
   public constructor() {
        super();
       this.state = this.setStateProxy()
       this.fillState()
    }
    protected setStateProxy(){
        return new Proxy(State,{
            set:(target, prop, value,receiver)=>{
               target[prop] = value
                if(prop === 'list'){
                    target['indexes'] =  this.fillIndexess(target[prop])
                }
                if(prop !=='indexes') {
                    const listRender = new ListRender(receiver)
                    listRender.renderList()
                }
            return true
        }
        })
    }

    public fillState() {
        const tokenElement = document.querySelector('[name=csrf-token]')
        const formData = {
            'X-CSRF-TOKEN': tokenElement ? tokenElement.getAttribute('content') : ''
        }
        const Api = new CategoriesApi('/admin/categories/get_list', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
        promise.then((data: any) => {
            this.state.list = data
        })
    }
    private fillIndexess(list:any){
       const indexesIdMap:any = {}
       list.forEach((item:any,key:number)=>{
           indexesIdMap[item.id]=key
       })
        return indexesIdMap
    }

}
export default CategoriesStateManager
