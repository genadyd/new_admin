import CategoriesApi from "../../../../api/CategoriesApi";
import InfoModalRender from "../renders/modals_renders/InfoModalRender";


class InfoModalController{
    private modalContainer:any
    private token:string|null
    constructor() {
        this.modalContainer = document.getElementById('categoryInfoModal')
        const tokenElem = document.querySelector('[name=csrf-token]')
        this.token = tokenElem? tokenElem.getAttribute('content') : ''
    }
    getCategoryData(id:number){
        const formData = {
          /*  action: {},*/
            id: id,
            'X-CSRF-TOKEN': this.token
        }
        const Api = new CategoriesApi('/admin/categories/get_category_data_by_id', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
        promise.then((res: any[]) => {
                const render = new InfoModalRender(res, this.modalContainer)
                render.render()
            }
        )
    }
}
export default InfoModalController
