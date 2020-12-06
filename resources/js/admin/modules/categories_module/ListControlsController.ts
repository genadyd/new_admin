import AbstractListControlsController
    from "../../app/controllers/list_controllers/list_controls_controller/AbstractListControlsController";
import CategoriesApi from "../../app/api/CategoriesApi";
import ListControlsControllerInterface
    from "../../app/controllers/list_controllers/list_controls_controller/ListControlsControllerInterface";
import InfoModalController from "./modals_controllers/InfoModalController";
import {itemFindById} from "../../lib/item_find/items_find";
import ListBuilder from "./list/html_builders/ListBuilder";
import {getRandomColor} from "../../lib/random_color/random_color";

class ListControlsController extends AbstractListControlsController implements ListControlsControllerInterface{
     protected infoModalController:ModalControllerInterface

    constructor(stateManager:any) {
        super(stateManager);
        this.infoModalController = new InfoModalController()
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
                const id = target.closest('.one_item').dataset.id
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
                            const elem:any =  itemFindById(list,+id)
                            if(elem) elem.deleted_at = null
                            this.listRenderFunction()
                        }
                    }
                )
            }
        })
    }
    protected childrenListView(){
        const table:any = document.querySelector('.items_list_container .table .table_body')
        table.addEventListener('click',(e:any)=>{
            const target:any = e.target
            if(target.classList.contains('view_list')){
                const itemBox = target.closest('.one_item')
                const header = itemBox.querySelector('.one_cat_header')
                const body = itemBox.querySelector('.one_cat_body')
                if(itemBox.classList.contains('children_show')){
                    itemBox.classList.remove('children_show')
                    header.style.backgroundColor = 'transparent'
                    header.classList.remove('has_child')
                    body.innerHTML = ''
                    target.innerText ='expand_more'

                }else {
                    itemBox.classList.add('children_show')
                    const parentId = itemBox.dataset.id
                    const list = this.stateManager.getState('list')
                    const elem: any = itemFindById(list, +parentId)
                    elem.children_show = true
                    const listBuilder = new ListBuilder()
                    const html = listBuilder.build(elem.children_list)
                    target.innerText ='expand_less'
                    const boxColor = getRandomColor()
                    header.style.backgroundColor = boxColor
                    header.classList.add('has_child')
                    body.innerHTML = html
                    body.style.backgroundColor = boxColor
                }
            }
        })


    }



}


export default ListControlsController
