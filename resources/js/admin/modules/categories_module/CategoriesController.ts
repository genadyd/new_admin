import FormControllersInterface from "../../app/controllers/forms_controllers/FormControllersInterface";
import FormController from "./FormController";
import ListController from "./ListController";
import {State} from "./CategoriesState";
import CategoriesApi from "../../app/api/CategoriesApi";
import CategoriesStateManager from "./CategoriesStateManager";
import ListProcessor from "../../lib/list_processor/ListProcessor";
import ListControlsControllerInterface
    from "../../app/controllers/list_controllers/list_controls_controller/ListControlsControllerInterface";
import ListControlsController from "./ListControlsController";


class CategoriesController {
    private readonly state: any = State
    private formController: FormControllersInterface
    private readonly stateManager:any
    private readonly listProcessor:any
    private readonly listController: any
    private listControlsController:ListControlsControllerInterface

    constructor() {
        this.stateManager = new CategoriesStateManager(this.state)
        this.listProcessor = new ListProcessor(this.stateManager)
        this.listController = new ListController(this.stateManager,this.listProcessor)
        this.formController = new FormController(this.stateManager)

        /* set rerender list func from listController */
        this.formController.getRenderFunc(this.listController.renderList, this.listController )
        this.listControlsController = new ListControlsController(this.stateManager)

        /* set rerender list func from listController */
        this.listControlsController.getRenderFunc(this.listController.renderList, this.listController )
/*
* init state with values
* */
        this.fillState()
        /*switch form and list submodules*/
        this.listOpenClose()
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
    private fillState() {
        const tokenElement = document.querySelector('[name=csrf-token]')
        const formData = {
            'X-CSRF-TOKEN': tokenElement ? tokenElement.getAttribute('content') : ''
        }
        const Api = new CategoriesApi('/admin/categories/get_list', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
        promise.then((data: any) => {
           // let dataRes:{[key:number]:any} = {}
           //  data.forEach((val:any)=>{
           //      dataRes[+val.id] = val
           //  })
           //  console.log(dataRes)
            this.stateManager.setState('list', data)
            this.listController.renderList()
        })
    }
}

export default CategoriesController
