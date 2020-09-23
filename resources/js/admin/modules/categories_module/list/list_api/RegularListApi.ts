import ListApiInterface from "./ListApiInterface";
import CategoriesApi from "../../../../api/CategoriesApi";


class RegularListApi implements ListApiInterface{
    private actionType = 'get_offset_limit'
    private state:any
    constructor(state:any) {
        this.state = state
    }
    getList(): Promise<any> {
        const token = document.querySelector('[name=csrf-token]')
        const formData = {
            action: {
                type: this.actionType,
                current_page: this.state.current_page,
                sort_by_date:this.state.sort_by_date_desc,
                per_page:this.state.per_page,
                deleted:this.state.deleted
            },
            'X-CSRF-TOKEN': token ? token.getAttribute('content') : ''
        }
        const Api = new CategoriesApi('/admin/categories/get_list', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
       return  promise
    }
}
export default RegularListApi
