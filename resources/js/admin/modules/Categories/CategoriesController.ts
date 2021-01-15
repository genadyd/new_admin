import FormControllersInterface from "../../app/controllers/forms_controllers/FormControllersInterface";
import FormController from "./Form/FormController";
import ListControlPanelEventsController from "./List/ListControlPanel/ListControlPanelEventsController";
import {State} from "./State/CategoriesState";
import CategoriesApi from "../../app/api/CategoriesApi";
import ListItemsControlsEventsControllerInterface
    from "../../app/Ship/Components/List/ListItemsControlsEventsControllerInterface";
import ListItemsControlsEventsController from "./List/ListItemsControls/ListItemsControlsEventsController";
import DeleteModalController from "./Modals/DeleteModalController";
import StateCreator from "../../app/Ship/State/StateCreator";
import ListRender from "./List/ListRender/ListRender";
import AbstractListControlPanelEventsController
    from "../../app/Ship/Components/List/AbstractListControlPanelEventsController";
import StatesRepository from "../../app/Ship/State/StatesRepository";



class CategoriesController {
    // private formController: FormControllersInterface
    private readonly listControlPanelEventsController: AbstractListControlPanelEventsController
    private readonly deleteModal:ModalControllerInterface
    private readonly shipState:StatesRepository
    private listItemsEventsControlsController:ListItemsControlsEventsControllerInterface
    private readonly listRender = new ListRender()
    private readonly MODULE_STATE_CONTAINER_NAME:string = 'categoriesState'
    private readonly formController

    constructor() {
        this.listRender = new ListRender()
        new StateCreator(State, this.MODULE_STATE_CONTAINER_NAME)/*create module state and put it into repo*/
        this.shipState = new StatesRepository()
        this.stateInit()
        this.fillState()
        this.listControlPanelEventsController = new ListControlPanelEventsController(this.shipState)
        this.formController = new FormController(this.shipState)
        this.deleteModal = new DeleteModalController(this.shipState)
        this.listItemsEventsControlsController = new ListItemsControlsEventsController(this.shipState)
        this.listOpenClose()
    }

    /*
    * create state Proxy object and add this object to states repository
    * @return :void
    * */
    protected stateInit(){
        const listRender:ShipListRendersInterface = new ListRender()
        this.shipState.mountDefaultCallbackForSet(this.MODULE_STATE_CONTAINER_NAME,listRender.render)
    }

    /*
    * get data from server side and set it into module state
    * @return :void
    * @params :none
    *
    * */
    private fillState() {
        const tokenElement = document.querySelector('[name=csrf-token]')
        const formData = {
            'X-CSRF-TOKEN': tokenElement ? tokenElement.getAttribute('content') : ''
        }
        const Api = new CategoriesApi('/admin/categories/get_list', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
        promise.then((data: any) => {
            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'indexes', this.fillIndexes(data),()=>{})
            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME,'list',data)
        })
    }

    /*
    *
    * create state indexes object
    * @params list:array array of list items
    * @return map:object " itemId:itemKey "
    * */
    private fillIndexes(list:any){
        const indexesIdMap:any = {}
        list.forEach((item:any,key:number)=>{
            indexesIdMap[item.id]=key
        })
        return indexesIdMap
    }
    /*
    * switch form and list containers
    * @params :none
    * @return :void
    * */
    private listOpenClose = () => {
        const openCloseButton = document.getElementById('list_open_close_button')
        if (openCloseButton) {
            openCloseButton.onclick = () => {
                const radioButton = document.getElementById('list_open_close')
                if (radioButton) {
                    radioButton.checked = true
                }
            }
        }
        const addNewButton = document.getElementById('add_new_form_open')
        if (addNewButton) {
            addNewButton.onclick = () => {
                const checkBox = document.getElementById('form_open_close')
                if (checkBox) checkBox.checked = true
                const form:any = document.querySelector('.form_container .entity_form')
                form.querySelector('input.parent_id').value = 0
            }
        }
    }
}

export default CategoriesController
