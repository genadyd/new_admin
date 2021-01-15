import AbstractListItemsControlsEventsController
    from "../../../../app/Ship/Components/List/AbstractListItemsControlsEventsController";
import CategoriesApi from "../../../../app/api/CategoriesApi";
import ListItemsControlsEventsControllerInterface
    from "../../../../app/Ship/Components/List/ListItemsControlsEventsControllerInterface";
import InfoModalController from "../../Modals/InfoModalController";
// import {itemFindById} from "../../lib/item_find/items_find";
// import ListBuilder from "./list/html_builders/ListBuilder";
import {getRandomColor} from "../../../../lib/random_color/random_color";
import StatesRepository from "../../../../app/Ship/State/StatesRepository";



class ListItemsControlsEventsController extends AbstractListItemsControlsEventsController implements ListItemsControlsEventsControllerInterface{
     protected infoModalController:ModalControllerInterface

    constructor(shipState:StatesRepository) {
        super(shipState);
        // this.list = this.stateRepo.getStateElement('categoriesState','list')
        this.MODULE_STATE_CONTAINER_NAME = 'categoriesState'
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
                promise.then((res:number) => {
                        if (res === 1) {
                            const list = [...this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'list')]
                            const indexes = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'indexes')
                            const elem:any =  list[indexes[id]]
                            if(elem) elem.deleted_at = null
                            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'list',list)
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
                    const parentId = +itemBox.dataset.id
                    const list = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'list')
                    const indexes = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME,'indexes')
                    const elem: any = list[indexes[parentId]]
                    if(elem.children_count>0){
                    const childrenList:any[] = list.filter((item:any)=> item.parent === parentId)
                    elem.children_show = true
                    // const listRender = new ListRender(State)
                    //     listRender.renderList(childrenList)
                    // const listBuilder = new ListBuilder()
                    // const html = listBuilder.build(childrenList)
                    target.innerText ='expand_less'
                    const boxColor = getRandomColor()
                    header.style.backgroundColor = boxColor
                    header.classList.add('has_child')
                    // body.innerHTML = html
                    body.style.backgroundColor = boxColor
                    }
                }
            }
        })


    }



}


export default ListItemsControlsEventsController
