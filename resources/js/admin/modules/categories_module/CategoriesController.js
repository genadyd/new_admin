"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FormController_1 = __importDefault(require("./FormController"));
var ListController_1 = __importDefault(require("./ListController"));
var CategoriesState_1 = require("./CategoriesState");
var CategoriesApi_1 = __importDefault(require("../../app/api/CategoriesApi"));
var CategoriesStateManager_1 = __importDefault(require("./CategoriesStateManager"));
var ListProcessor_1 = __importDefault(require("../../lib/list_processor/ListProcessor"));
var ListControlsController_1 = __importDefault(require("./ListControlsController"));
var CategoriesController = /** @class */ (function () {
    function CategoriesController() {
        this.state = CategoriesState_1.State;
        this.listOpenClose = function () {
            var openCloseButton = document.getElementById('list_open_close_button');
            if (openCloseButton) {
                openCloseButton.onclick = function () {
                    var radioButton = document.getElementById('list_open_close');
                    if (radioButton) {
                        radioButton.checked = true;
                    }
                };
            }
            var addNewButton = document.getElementById('add_new_form_open');
            if (addNewButton) {
                addNewButton.onclick = function () {
                    var checkBox = document.getElementById('form_open_close');
                    if (checkBox)
                        checkBox.checked = true;
                    var form = document.querySelector('.form_container .entity_form');
                    form.querySelector('input.parent_id').value = 0;
                };
            }
        };
        this.stateManager = new CategoriesStateManager_1.default(this.state);
        this.listProcessor = new ListProcessor_1.default(this.stateManager);
        this.listController = new ListController_1.default(this.stateManager, this.listProcessor);
        this.formController = new FormController_1.default(this.stateManager);
        /* set rerender list func from listController */
        this.formController.getRenderFunc(this.listController.renderList, this.listController);
        this.listControlsController = new ListControlsController_1.default(this.stateManager);
        /* set rerender list func from listController */
        this.listControlsController.getRenderFunc(this.listController.renderList, this.listController);
        /*
        * init state with values
        * */
        this.fillState();
        /*switch form and list submodules*/
        this.listOpenClose();
    }
    CategoriesController.prototype.fillState = function () {
        var _this = this;
        var tokenElement = document.querySelector('[name=csrf-token]');
        var formData = {
            'X-CSRF-TOKEN': tokenElement ? tokenElement.getAttribute('content') : ''
        };
        var Api = new CategoriesApi_1.default('/admin/categories/get_list', 'POST', { formData: JSON.stringify(formData) });
        var promise = Api.exeq();
        promise.then(function (data) {
            // let dataRes:{[key:number]:any} = {}
            //  data.forEach((val:any)=>{
            //      dataRes[+val.id] = val
            //  })
            //  console.log(dataRes)
            _this.stateManager.setState('list', data);
            _this.listController.renderList();
        });
    };
    return CategoriesController;
}());
exports.default = CategoriesController;
