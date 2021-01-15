"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
exports.State = {
    list: [],
    indexes: {},
    parent_id: 0,
    current_page: 1,
    start_page: 1,
    per_page: 10,
    include_deleted: 0,
    only_deleted: 0,
    sort_by_date_desc: 0,
    search_string: '',
    buttons_num: 3,
    sort_by: { field: 'id', direction: 'asc' }
};
