import FormControllersInterface from "../../app/controllers/forms_controllers/FormControllersInterface";
import FormController from "./FormController";
import ListController from "./ListController";
import {State} from "./CategoriesState";
import CategoriesApi from "../../app/api/CategoriesApi";
import ListControlsControllerInterface
    from "../../app/controllers/list_controllers/list_controls_controller/ListControlsControllerInterface";
import ListControlsController from "./ListControlsController";
import DeleteModalController from "./modals_controllers/DeleteModalController";
import StateCreator from "../../app/Ship/State/StateCreator";
import ShipStateController from "../../app/Ship/State/ShipState";
import ListRender from "./ListRender";
import ListControllerInterface from "../../app/Ship/Interfaces/ListControllers/ListControllerInterface";


class CategoriesController {
    private readonly state: any = State
    // private formController: FormControllersInterface
    private readonly listController: ListControllerInterface
    // private readonly deleteModal:ModalControllerInterface
    // private listControlsController:ListControlsControllerInterface
    private readonly shipState: ShipStateInterface
    private readonly listRender = new ListRender()
    private readonly MODULE_STATE:string = 'categoriesState'

    constructor() {
        this.shipState = new ShipStateController()
        this.listRender = new ListRender()
        this.stateInit(State)
        this.listController = new ListController(this.shipState)
        // this.formController = new FormController(this.stateManager)
        // this.deleteModal = new DeleteModalController(this.stateManager)
        // this.listControlsController = new ListControlsController(this.stateManager)
        // this.listOpenClose()
    }
    protected stateInit(state:any){
        const listRender:ShipListRendersInterface = new ListRender()
        this.shipState.createMainState(this.MODULE_STATE, state)
        this.shipState.setHandlerDefaultCallback(this.MODULE_STATE,'set',listRender.render)
        this.fillState()
    }
    private fillState() {
        const tokenElement = document.querySelector('[name=csrf-token]')
        const formData = {
            'X-CSRF-TOKEN': tokenElement ? tokenElement.getAttribute('content') : ''
        }
        const Api = new CategoriesApi('/admin/categories/get_list', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
        promise.then((data: any) => {
            this.shipState.setStateElementValue(this.MODULE_STATE,'indexes', this.fillIndexes(data),()=>{})
            this.shipState.setStateElementValue(this.MODULE_STATE,'list',data)
        })
    }
    private fillIndexes(list:any){
        const indexesIdMap:any = {}
        list.forEach((item:any,key:number)=>{
            indexesIdMap[item.id]=key
        })
        return indexesIdMap
    }

    protected listOpenClose = () => {
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
