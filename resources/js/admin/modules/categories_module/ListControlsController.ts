import AbstractListControlsController
    from "../../app/controllers/list_controllers/list_controls_controller/AbstractListControlsController";
import CategoriesApi from "../../app/api/CategoriesApi";
import ListControlsControllerInterface
    from "../../app/controllers/list_controllers/list_controls_controller/ListControlsControllerInterface";
import InfoModalController from "./modals_controllers/InfoModalController";
import DeleteModalController from "./modals_controllers/DeleteModalController";
import {itemFindFunc} from "../../lib/item_find/item_find";
import ListBuilder from "./list/html_builders/ListBuilder";

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
        this.openFormForAddChildrenItem()
        this.childrenListView()

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
                            const list = this.stateManager.getState('list')
                            const elem:any =  itemFindFunc(list,+id)
                            if(elem) elem.deleted_at = null
                            this.listRenderFunction()
                        }
                    }
                )
            }
        })
    }
    protected childrenListView(){
        const table:any = document.querySelector('.items_list_container .table')
        table.addEventListener('click',(e:any)=>{
            const target:any = e.target
            if(target.classList.contains('view_list')){
                const parentId = target.closest('tr').dataset.id
                const list  = this.stateManager.getState('list')
                const elem:any =  itemFindFunc(list,+parentId)
                const listBuilder = new ListBuilder()
                const html = listBuilder.build(elem.children_list)
                const currentElement = this.table.querySelector(`tr[data-id="${elem.id}"]`)
                const parser = new DOMParser()
                const res = parser.parseFromString(html, 'text/html')
                table.insertBefore(res,currentElement.nextSiblings)

            }

        })


    }


}


export default ListControlsController
