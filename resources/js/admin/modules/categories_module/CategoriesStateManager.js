"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractStateManager_1 = __importDefault(require("../../app/state_manager/AbstractStateManager"));
var CategoriesApi_1 = __importDefault(require("../../app/api/CategoriesApi"));
var CategoriesState_1 = require("./CategoriesState");
var ListRender_1 = __importDefault(require("./ListRender"));
var CategoriesStateManager = /** @class */ (function (_super) {
    __extends(CategoriesStateManager, _super);
    function CategoriesStateManager() {
        var _this = _super.call(this) || this;
        _this.state = _this.setStateProxy();
        _this.fillState();
        return _this;
    }
    CategoriesStateManager.prototype.setStateProxy = function () {
        var _this = this;
        return new Proxy(CategoriesState_1.State, {
            set: function (target, prop, value, receiver) {
                target[prop] = value;
                if (prop === 'list') {
                    target['indexes'] = _this.fillIndexess(target[prop]);
                }
                if (prop !== 'indexes') {
                    var listRender = new ListRender_1.default(receiver);
                    listRender.renderList();
                }
                return true;
            }
        });
    };
    CategoriesStateManager.prototype.fillState = function () {
        var _this = this;
        var tokenElement = document.querySelector('[name=csrf-token]');
        var formData = {
            'X-CSRF-TOKEN': tokenElement ? tokenElement.getAttribute('content') : ''
        };
        var Api = new CategoriesApi_1.default('/admin/categories/get_list', 'POST', { formData: JSON.stringify(formData) });
        var promise = Api.exeq();
        promise.then(function (data) {
            _this.state.list = data;
        });
    };
    CategoriesStateManager.prototype.fillIndexess = function (list) {
        var indexesIdMap = {};
        list.forEach(function (item, key) {
            indexesIdMap[item.id] = key;
        });
        return indexesIdMap;
    };
    return CategoriesStateManager;
}(AbstractStateManager_1.default));
exports.default = CategoriesStateManager;
