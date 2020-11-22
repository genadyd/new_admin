"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractListController /*implements ListControllerInterface*/ = /** @class */ (function () {
    function AbstractListController(stateManager, listProcessor) {
        var _this = this;
        this.setListItemsNumberMaxParam = function (list) {
            var perPageInput = document.getElementById('per_page');
            if (perPageInput) {
                var len = list.length;
                perPageInput.setAttribute('max', len);
                if (_this.stateManager.getState('per_page') > len) {
                    perPageInput.value = len;
                }
                else {
                    perPageInput.value = _this.stateManager.getState('per_page');
                }
            }
        };
        this.stateManager = stateManager;
        this.listProcessor = listProcessor;
    }
    AbstractListController.prototype.getToken = function () {
        var tokenElement = document.querySelector('[name=csrf-token]');
        this.token = tokenElement ? tokenElement.getAttribute('content') : '';
    };
    AbstractListController.prototype.includeDeleted = function () {
        var _this = this;
        if (this.listContainer) {
            var includeDeletedInput = this.listContainer.querySelector('#categories_control_panel #include_deleted');
            if (includeDeletedInput) {
                includeDeletedInput.addEventListener('click', function () {
                    var onlyDeletedCheckBox = document.querySelector('.list_control_panel #only_deleted');
                    _this.stateManager.setState('include_deleted', !_this.stateManager.getState('include_deleted'));
                    if (!_this.stateManager.getState('include_deleted') && _this.stateManager.getState('only_deleted')) {
                        _this.stateManager.setState('only_deleted', false);
                        if (onlyDeletedCheckBox)
                            onlyDeletedCheckBox.checked = false;
                    }
                    _this.renderList();
                });
            }
        }
    };
    AbstractListController.prototype.onlyDeleted = function () {
        var _this = this;
        if (this.listContainer) {
            var onlyDeletedInput = this.listContainer.querySelector('#only_deleted');
            if (onlyDeletedInput) {
                onlyDeletedInput.addEventListener('input', function (e) {
                    var checkBox = e.target;
                    if (checkBox) {
                        _this.stateManager.setState('only_deleted', !_this.stateManager.getState('only_deleted'));
                        var includeDeletedCheckBox = document.getElementById('include_deleted');
                        if (_this.stateManager.getState('only_deleted')) {
                            _this.stateManager.setState('include_deleted', true);
                            if (includeDeletedCheckBox)
                                includeDeletedCheckBox.checked = true;
                        }
                        else {
                            _this.stateManager.setState('include_deleted', false);
                            if (includeDeletedCheckBox)
                                includeDeletedCheckBox.checked = false;
                        }
                        _this.renderList();
                    }
                });
            }
        }
    };
    AbstractListController.prototype.sortByField = function () {
        var _this = this;
        var sortCallback = function (e) {
            var icon = e.target;
            var _a = _this.stateManager.getState('sort_by'), field = _a.field, direction = _a.direction;
            var newSortBy = __assign({}, _this.stateManager.getState('sort_by'));
            if (icon) {
                var fieldName = icon.dataset.sort;
                if (field === fieldName) {
                    newSortBy = __assign(__assign({}, newSortBy), { direction: direction === 'asc' ? 'desc' : 'asc' });
                }
                else {
                    newSortBy = __assign(__assign({}, newSortBy), { field: fieldName, direction: 'asc' });
                }
            }
            _this.stateManager.setState('sort_by', newSortBy);
            _this.renderList();
        };
        if (this.listContainer) {
            var sortButtons = document.querySelectorAll('.sort_icon[data-sort]');
            if (sortButtons) {
                sortButtons.forEach(function (icon) {
                    icon.addEventListener('click', sortCallback);
                });
            }
        }
    };
    AbstractListController.prototype.sortByDate = function () {
        var _this = this;
        if (this.listContainer) {
            var sortByDateInput = this.listContainer.querySelector('#sort_by_date');
            if (sortByDateInput) {
                sortByDateInput.addEventListener('click', function () {
                    _this.stateManager.setState('sort_by_date_desc', !_this.stateManager.getState('sort_by_date_desc'));
                    _this.renderList();
                });
            }
        }
    };
    AbstractListController.prototype.renderPerPage = function () {
        var _this = this;
        var perPageInput = document.getElementById('per_page');
        if (perPageInput) {
            perPageInput.oninput = function (e) {
                _this.stateManager.setState('per_page', e.target.value);
                _this.renderList();
            };
        }
    };
    AbstractListController.prototype.searchItems = function () {
        var _this = this;
        var searchInput = document.getElementById('items_search_input');
        if (searchInput) {
            searchInput.oninput = function (e) {
                var value = e.target.value;
                if (value) {
                    _this.stateManager.setState('search_string', value);
                }
                else {
                    _this.stateManager.setState('search_string', '');
                }
                _this.renderList();
            };
        }
    };
    AbstractListController.prototype.renderPaginationButtons = function (list) {
        var lastPage = Math.ceil(list.length / +this.stateManager.getState('per_page'));
        var objectToBuilder = {
            start_page: 1,
            current_page: +this.stateManager.getState('current_page'),
            last_page: +lastPage,
            buttons_num: lastPage < 3 ? lastPage : 3
        };
        if (objectToBuilder.current_page == objectToBuilder.last_page) { /*if last page*/
            if (objectToBuilder.last_page > 2) {
                objectToBuilder.start_page = objectToBuilder.current_page - 2;
                objectToBuilder.buttons_num = objectToBuilder.last_page;
            }
            else if (objectToBuilder.last_page == 2) {
                objectToBuilder.start_page = objectToBuilder.current_page - 1;
                objectToBuilder.buttons_num = objectToBuilder.last_page;
            }
            else {
                objectToBuilder.buttons_num = 0;
            }
        }
        else if (objectToBuilder.current_page > 1 && objectToBuilder.current_page < objectToBuilder.last_page) {
            objectToBuilder.start_page = objectToBuilder.current_page - 1;
            objectToBuilder.buttons_num = objectToBuilder.current_page + 1;
        }
        else {
            objectToBuilder.start_page = 1;
        }
        return objectToBuilder;
    };
    AbstractListController.prototype.pageSwitch = function () {
        var _this = this;
        if (this.listContainer) {
            this.listContainer.addEventListener('click', function (e) {
                var target = e.target;
                if (target) {
                    if (target.matches('a.page-link') || target.matches('a.page-link span')) {
                        if (target.matches('a.page-link span')) {
                            target = target.closest('a.page-link');
                        }
                        try {
                            var pageNum = target.getAttribute('page_num');
                            _this.stateManager.setState('current_page', pageNum);
                            _this.renderList();
                        }
                        catch (error) {
                            console.error('Expected attribute "page_num" in target Button');
                        }
                    }
                }
            });
        }
    };
    AbstractListController.prototype.addNewItemToList = function (newItemObject) {
        newItemObject['is_new'] = true;
        newItemObject['to_render'] = true;
        this.stateManager.setState('list', __spreadArrays(this.stateManager.getState('list'), [newItemObject]));
        var items = this.stateManager.getState('list');
        // items.push(newItemObject)
        var lastPage = Math.ceil(items.length / +this.stateManager.getState('per_page'));
        this.stateManager.setState('current_page', lastPage);
        this.renderList();
    };
    return AbstractListController;
}());
exports.default = AbstractListController;
