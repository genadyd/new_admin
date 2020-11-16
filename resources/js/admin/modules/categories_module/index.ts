
import ListController from "./ListController";
import FormController from "./FormController";
import ListControlsController from "./ListControlsController";
import FormControllersInterface from "../../app/controllers/forms_controllers/FormControllersInterface";
import ListControllerInterface from "../../app/controllers/list_controllers/ListControllerInterface";
import ListControlsControllerInterface
    from "../../app/controllers/list_controllers/list_controls_controller/ListControlsControllerInterface";
import CategoriesController from "./CategoriesController";


// @ts-ignore
CKEDITOR.replace('ckeditor_text',{
    customConfig: '../ckeditor/custom_config.js'
})
const formController:any = new CategoriesController()
// const listControlsController:ListControlsControllerInterface = new ListControlsController()
//
// const listController:ListControllerInterface = new ListController()
// listController.getControlsController(listControlsController)
// listControlsController.setListRender(listController.renderList)
//
// formController.getListController(listController)




