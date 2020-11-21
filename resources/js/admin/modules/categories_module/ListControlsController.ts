import AbstractListControlsController
    from "../../app/controllers/list_controllers/list_controls_controller/AbstractListControlsController";
import CategoriesApi from "../../app/api/CategoriesApi";
import ListControlsControllerInterface
    from "../../app/controllers/list_controllers/list_controls_controller/ListControlsControllerInterface";
import InfoModalController from "./modals_controllers/InfoModalController";
import DeleteModalController from "./modals_controllers/DeleteModalController";

class ListControlsController extends AbstractListControlsController implements ListControlsControllerInterface{
     protected infoModalController:ModalControllerInterface
     protected deleteModal:ModalControllerInterface
    constructor(stateManager:any) {
        super(stateManager);
        this.infoModalController = new InfoModalController()
        this.deleteModal = new DeleteModalController(this.stateManager)
        this.itemInfo()
        this.itemDelete()
        this.itemRestore()

    }



    itemUpdate(): void {
        const container = document.querySelector('#content_container')
        if(!container) return
        container.addEventListener('click',(e:any)=>{})
    }

    protected itemRestore(){
        const container = document.querySelector('#content_container')
        if(!container) return
        container.addEventListener('click',(e:any)=>{
            const target = e.target
            if(target && target.classList.contains('restore')){
                const id = target.closest('tr').dataset.id
                const key = +target.closest('tr').dataset.key
                const formData = {
                    action: {},
                    id: id,
                    'X-CSRF-TOKEN': this.token ? this.token : ''
                }
                const Api = new CategoriesApi('/admin/categories/category_restore', 'POST', {formData: JSON.stringify(formData)})
                const promise: any = Api.exeq()
                promise.then((res: number) => {
                        if (res === 1) {
                            this.deleteFromListById(+id)
                            this.listRenderFunction()
                        }
                    }
                )
            }
        })
    }
    private deleteFromListById(id:number){
         const list = this.stateManager.getState('list')
        const elem = list.find((item:any)=>item.id === id)
        elem.deleted_at = null
    }
}


export default ListControlsController
