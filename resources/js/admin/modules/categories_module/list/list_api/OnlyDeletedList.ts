import ListApiInterface from "./ListApiInterface";
import ListStor from "../ListStor";
import CategoriesApi from "../../../../api/CategoriesApi";

class OnlyDeletedList implements ListApiInterface{
    private actionType = 'only_deleted'
    private stor = new ListStor()
    getList(): Promise<any> {
        const token = document.querySelector('[name=csrf-token]')
        const formData = {
            action: {
                type: this.actionType,
                current_page: this.stor.getState('current_page'),
                sort_by_date:this.stor.getState('sort_by_date_desc'),


            },
            'X-CSRF-TOKEN': token ? token.getAttribute('content') : ''
        }
        const Api = new CategoriesApi('/admin/categories/get_list', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
        return  promise
    }
}
