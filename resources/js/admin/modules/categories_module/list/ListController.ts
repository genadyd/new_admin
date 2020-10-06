import RegularRender from "./list_render/RegularRender";
import RegularListBuilder from "./html_list_builder/RegularListBuilder";
import CategoriesApi from "../../../api/CategoriesApi";
import CategoriesState from "../../../states/content/categories/CategoriesState";

class ListController {
    private store = new CategoriesState()
    public getAllList=()=>{
        const token = document.querySelector('[name=csrf-token]')
        const formData = {
            action: {
            },
            'X-CSRF-TOKEN': token ? token.getAttribute('content') : ''
        }
        const Api = new CategoriesApi('/admin/categories/get_list', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
        promise.then((data:object)=> {
           this.store.fill(data,'categories')
            this.regularPage(1)
            const perPageInput:any =  document.getElementById('per_page')
                if(perPageInput) {
                    perPageInput.value = this.store.getState('per_page')
                }
           }
       )
    }
   public regularPage = (curentPage: number) => {
        this.store.setState('current_page', curentPage)
        const render = new RegularRender(this.store)
        render.listRender(new RegularListBuilder())
    }

    public sortByDate = ()=>{
        this.store.setState('sort_by_date_desc',
            !this.store.getState('sort_by_date_desc'))
        this.regularPage(1)
    }

    public includeDeleted=():void=>{
         this.store.setState('include_deleted',
             !this.store.getState('include_deleted'))
        this.regularPage(1)

    }
    public onlyDeleted():void{
        const includeDeletedElement:any = document.getElementById('include_deleted')
        if(includeDeletedElement && !includeDeletedElement.checked){
            includeDeletedElement.click()
        }
        this.store.setState('only_deleted',
            !this.store.getState('only_deleted'))
        this.regularPage(1)
    }
    public changePerPageNum(event:any){
        let newVal = event.target.value
        this.store.setState('per_page', +newVal)
        this.regularPage(1)
    }
    public formOpenClose(){
        const radioButton = document.getElementById('form_open_close')
        if(radioButton){
            radioButton.checked=true
        }
    }
    public searchInput(event:any){
        const target = event.target;
        let inputValue = target.value
        this.store.setState('search_string',inputValue)
        this.regularPage(1)
    }
}

export default ListController
