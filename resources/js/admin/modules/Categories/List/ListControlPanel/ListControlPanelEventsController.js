"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractListControlPanelEventsController_1 = __importDefault(require("../../../../app/Ship/Components/List/AbstractListControlPanelEventsController"));
class ListControlPanelEventsController extends AbstractListControlPanelEventsController_1.default {
    constructor(shipState) {
        super(shipState);
        this.shipState = shipState;
        this.MODULE_STATE_CONTAINER_NAME = 'categoriesState';
        this.listContainer = document.getElementById('categories_list_container');
        /*parent abstract list controllers methods */
        this.includeDeleted();
        this.onlyDeleted();
        this.searchItems();
        this.pageSwitch();
        this.renderPerPage();
        this.sortByField();
    }
}
exports.default = ListControlPanelEventsController;
