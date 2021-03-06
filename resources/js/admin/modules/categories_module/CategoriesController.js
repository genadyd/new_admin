"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FormController_1 = __importDefault(require("./FormController"));
var ListController_1 = __importDefault(require("./ListController"));
var CategoriesState_1 = require("./CategoriesState");
var CategoriesStateManager_1 = __importDefault(require("./CategoriesStateManager"));
var ListControlsController_1 = __importDefault(require("./ListControlsController"));
var DeleteModalController_1 = __importDefault(require("./modals_controllers/DeleteModalController"));
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
        this.stateManager = new CategoriesStateManager_1.default();
        this.listController = new ListController_1.default(this.stateManager);
        this.formController = new FormController_1.default(this.stateManager);
        this.deleteModal = new DeleteModalController_1.default(this.stateManager);
        this.listControlsController = new ListControlsController_1.default(this.stateManager);
        this.listOpenClose();
    }
    return CategoriesController;
}());
exports.default = CategoriesController;
