"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormController_1 = __importDefault(require("./Form/FormController"));
const ListControlPanelEventsController_1 = __importDefault(require("./List/ListControlPanel/ListControlPanelEventsController"));
const CategoriesState_1 = require("./State/CategoriesState");
const CategoriesApi_1 = __importDefault(require("../../app/api/CategoriesApi"));
const ListItemsControlsEventsController_1 = __importDefault(require("./List/ListItemsControls/ListItemsControlsEventsController"));
const DeleteModalController_1 = __importDefault(require("./Modals/DeleteModalController"));
const StateCreator_1 = __importDefault(require("../../app/Ship/State/StateCreator"));
const ListRender_1 = __importDefault(require("./List/ListRender/ListRender"));
const StatesRepository_1 = __importDefault(require("../../app/Ship/State/StatesRepository"));
class CategoriesController {
    constructor() {
        this.listRender = new ListRender_1.default();
        this.MODULE_STATE_CONTAINER_NAME = 'categoriesState';
        /*
        * switch form and list containers
        * @params :none
        * @return :void
        * */
        this.listOpenClose = () => {
            const openCloseButton = document.getElementById('list_open_close_button');
            if (openCloseButton) {
                openCloseButton.onclick = () => {
                    const radioButton = document.getElementById('list_open_close');
                    if (radioButton) {
                        radioButton.checked = true;
                    }
                };
            }
            const addNewButton = document.getElementById('add_new_form_open');
            if (addNewButton) {
                addNewButton.onclick = () => {
                    const checkBox = document.getElementById('form_open_close');
                    if (checkBox)
                        checkBox.checked = true;
                    const form = document.querySelector('.form_container .entity_form');
                    form.querySelector('input.parent_id').value = 0;
                };
            }
        };
        this.listRender = new ListRender_1.default();
        new StateCreator_1.default(CategoriesState_1.State, this.MODULE_STATE_CONTAINER_NAME); /*create module state and put it into repo*/
        this.shipState = new StatesRepository_1.default();
        this.stateInit();
        this.fillState();
        this.listControlPanelEventsController = new ListControlPanelEventsController_1.default(this.shipState);
        this.formController = new FormController_1.default(this.shipState);
        this.deleteModal = new DeleteModalController_1.default(this.shipState);
        this.listItemsEventsControlsController = new ListItemsControlsEventsController_1.default(this.shipState);
        this.listOpenClose();
    }
    /*
    * create state Proxy object and add this object to states repository
    * @return :void
    * */
    stateInit() {
        const listRender = new ListRender_1.default();
        this.shipState.mountDefaultCallbackForSet(this.MODULE_STATE_CONTAINER_NAME, listRender.render);
    }
    /*
    * get data from server side and set it into module state
    * @return :void
    * @params :none
    *
    * */
    fillState() {
        const tokenElement = document.querySelector('[name=csrf-token]');
        const formData = {
            'X-CSRF-TOKEN': tokenElement ? tokenElement.getAttribute('content') : ''
        };
        const Api = new CategoriesApi_1.default('/admin/categories/get_list', 'POST', { formData: JSON.stringify(formData) });
        const promise = Api.exeq();
        promise.then((data) => {
            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'indexes', this.fillIndexes(data), () => { });
            this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list', data);
        });
    }
    /*
    *
    * create state indexes object
    * @params list:array array of list items
    * @return map:object " itemId:itemKey "
    * */
    fillIndexes(list) {
        const indexesIdMap = {};
        list.forEach((item, key) => {
            indexesIdMap[item.id] = key;
        });
        return indexesIdMap;
    }
}
exports.default = CategoriesController;
