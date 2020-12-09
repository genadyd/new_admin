import FormControllersInterface from "../../app/controllers/forms_controllers/FormControllersInterface";
import FormController from "./FormController";
import ListController from "./ListController";
import {State} from "./CategoriesState";
import CategoriesApi from "../../app/api/CategoriesApi";
import CategoriesStateManager from "./CategoriesStateManager";
import ListControlsControllerInterface
    from "../../app/controllers/list_controllers/list_controls_controller/ListControlsControllerInterface";
import ListControlsController from "./ListControlsController";
import DeleteModalController from "./modals_controllers/DeleteModalController";


class CategoriesController {
    private readonly state: any = State
    private formController: FormControllersInterface
    private readonly stateManager:any
    private readonly listProcessor:any
    private readonly listController: any
    private readonly deleteModal:ModalControllerInterface
    private listControlsController:ListControlsControllerInterface

    constructor() {
        this.stateManager = new CategoriesStateManager()
        this.listController = new ListController(this.stateManager)
        this.formController = new FormController(this.stateManager)
        this.deleteModal = new DeleteModalController(this.stateManager)
        this.listControlsController = new ListControlsController(this.stateManager)
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
}

export default CategoriesController
