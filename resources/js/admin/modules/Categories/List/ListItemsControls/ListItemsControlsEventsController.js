"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractListItemsControlsEventsController_1 = __importDefault(require("../../../../app/Ship/Components/List/AbstractListItemsControlsEventsController"));
const CategoriesApi_1 = __importDefault(require("../../../../app/api/CategoriesApi"));
const InfoModalController_1 = __importDefault(require("../../Modals/InfoModalController"));
// import {itemFindById} from "../../lib/item_find/items_find";
// import ListBuilder from "./list/html_builders/ListBuilder";
const random_color_1 = require("../../../../lib/random_color/random_color");
class ListItemsControlsEventsController extends AbstractListItemsControlsEventsController_1.default {
    constructor(shipState) {
        super(shipState);
        // this.list = this.stateRepo.getStateElement('categoriesState','list')
        this.MODULE_STATE_CONTAINER_NAME = 'categoriesState';
        this.infoModalController = new InfoModalController_1.default();
        this.itemInfo();
        this.itemDelete();
        this.itemRestore();
        this.openFormForAddChildrenItem();
        this.childrenListView();
    }
    itemUpdate() {
        const container = document.querySelector('#content_container');
        if (!container)
            return;
        container.addEventListener('click', (e) => { });
    }
    itemRestore() {
        const container = document.querySelector('#content_container');
        if (!container)
            return;
        container.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.classList.contains('restore')) {
                const id = target.closest('.one_item').dataset.id;
                const formData = {
                    action: {},
                    id: id,
                    'X-CSRF-TOKEN': this.token ? this.token : ''
                };
                const Api = new CategoriesApi_1.default('/admin/categories/category_restore', 'POST', { formData: JSON.stringify(formData) });
                const promise = Api.exeq();
                promise.then((res) => {
                    if (res === 1) {
                        const list = [...this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list')];
                        const indexes = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'indexes');
                        const elem = list[indexes[id]];
                        if (elem)
                            elem.deleted_at = null;
                        this.shipState.setStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list', list);
                    }
                });
            }
        });
    }
    childrenListView() {
        const table = document.querySelector('.items_list_container .table .table_body');
        table.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('view_list')) {
                const itemBox = target.closest('.one_item');
                const header = itemBox.querySelector('.one_cat_header');
                const body = itemBox.querySelector('.one_cat_body');
                if (itemBox.classList.contains('children_show')) {
                    itemBox.classList.remove('children_show');
                    header.style.backgroundColor = 'transparent';
                    header.classList.remove('has_child');
                    body.innerHTML = '';
                    target.innerText = 'expand_more';
                }
                else {
                    itemBox.classList.add('children_show');
                    const parentId = +itemBox.dataset.id;
                    const list = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'list');
                    const indexes = this.shipState.getStateElement(this.MODULE_STATE_CONTAINER_NAME, 'indexes');
                    const elem = list[indexes[parentId]];
                    if (elem.children_count > 0) {
                        const childrenList = list.filter((item) => item.parent === parentId);
                        elem.children_show = true;
                        // const listRender = new ListRender(State)
                        //     listRender.renderList(childrenList)
                        // const listBuilder = new ListBuilder()
                        // const html = listBuilder.build(childrenList)
                        target.innerText = 'expand_less';
                        const boxColor = random_color_1.getRandomColor();
                        header.style.backgroundColor = boxColor;
                        header.classList.add('has_child');
                        // body.innerHTML = html
                        body.style.backgroundColor = boxColor;
                    }
                }
            }
        });
    }
}
exports.default = ListItemsControlsEventsController;
