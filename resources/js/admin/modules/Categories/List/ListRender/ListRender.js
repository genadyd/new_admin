"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShipListFilters_1 = __importDefault(require("../../../../app/Ship/Components/List/ShipListFilters"));
const ListBuilder_1 = __importDefault(require("../html_builders/ListBuilder"));
const PaginationBuilder_1 = __importDefault(require("../html_builders/PaginationBuilder"));
const ShipListSearch_1 = __importDefault(require("../../../../app/Ship/Components/List/ShipListSearch"));
class ListRender {
    render(state) {
        const filteredList = ListRender.listFilter(state);
        const listHtml = ListRender.htmlBuilder(filteredList);
        const lastPage = Math.ceil(filteredList.length / state.per_page);
        let currentPage = state.current_page;
        if (currentPage > lastPage) {
            state.current_page = lastPage;
        }
        const tableBody = document.querySelector('#categories_list_container .table_container .table_body');
        if (tableBody)
            tableBody.innerHTML = listHtml;
        const paginatorContainer = document.querySelector('#categories_list_container .pagination');
        paginatorContainer.innerHTML = ListRender.paginationBuilder(state, filteredList);
        ListRender.perPageNumberFill(state, filteredList);
    }
    static listFilter(state) {
        const listFilters = new ShipListFilters_1.default();
        let list = [...state.list.filter((item) => item.parent === state.parent_id)];
        list = ShipListSearch_1.default.search(list, state.search_string, ['heading', 'name']);
        list = listFilters.sortByField(list, state.sort_by);
        list = listFilters.includeDeleted(list, state.include_deleted);
        list = listFilters.onlyDeleted([...list], state.only_deleted);
        list = listFilters.renderPerPage(list, state.per_page, state.current_page);
        return list;
    }
    static htmlBuilder(filteredList) {
        const htmlBuilder = new ListBuilder_1.default();
        return htmlBuilder.build(filteredList);
    }
    static paginationBuilder(state, filteredList) {
        if (filteredList.length > +state.per_page) {
            const itemsNum = filteredList.reduce((acc, current) => {
                return current.parent === 0 ? acc + 1 : acc;
            }, 0);
            state.last_page = Math.ceil(itemsNum / state.per_page); /*all button number*/
            console.log(state.per_page);
            state.end_page = 3;
            ListRender.setStartPage(state);
            ListRender.setEndPage(state);
            const paginatingBuilder = new PaginationBuilder_1.default();
            return paginatingBuilder.build(state);
        }
        return '';
    }
    static setStartPage(state) {
        state.start_page = 1;
        if (state.current_page !== 1) {
            if (state.current_page != state.last_page) {
                state.start_page = (state.start_page = (state.current_page - 1));
            }
            else {
                if ((state.current_page - 2) >= 1) {
                    state.start_page = (state.current_page - 2);
                }
                else {
                    state.start_page = 1;
                }
            }
        }
    }
    static setEndPage(state) {
        if (state.end_page > state.last_page) {
            state.end_page = state.last_page;
        }
        else {
            if (state.current_page !== 1) {
                if (state.current_page !== state.last_page) {
                    if ((state.current_page + 1) >= state.last_page) {
                        state.end_page = state.last_page;
                    }
                    else {
                        state.end_page = (state.current_page + 1);
                    }
                }
                else {
                    state.end_page = state.last_page;
                }
            }
        }
    }
    /*
    * fill per_page field (if state.per_page > list length)
    * @state:object module state object
    * @filteredList:array of objects - list where item parent == 0
    *
    * */
    static perPageNumberFill(state, filteredList) {
        let perPage = state.per_page;
        if (perPage > filteredList.length) {
            perPage = filteredList.length;
        }
        const perPageField = document.querySelector('input#per_page');
        perPageField.value = perPage;
    }
}
exports.default = ListRender;
