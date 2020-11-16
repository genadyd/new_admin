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
var CategoriesApi_1 = __importDefault(require("../../app/api/CategoriesApi"));
var AbstractTextFieldController_1 = __importDefault(require("../../app/controllers/forms_controllers/AbstractTextFieldController"));
var TextFieldController = /** @class */ (function (_super) {
    __extends(TextFieldController, _super);
    function TextFieldController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keys = [1];
        _this.addTextFieldFormElement = function () {
            var api = new CategoriesApi_1.default('/admin/categories/get_text_field', 'POST', {}, 'text');
            var promise = api.exeq();
            promise.then(function (data) {
                var textFieldContainer = document.querySelector('div.catTextFieldsContainer');
                var container = document.createElement('div');
                container.classList.add('added');
                container.classList.add('hidden');
                container.innerHTML = data;
                if (textFieldContainer) {
                    textFieldContainer.append(container);
                }
                _this.fieldsChangeBoxProperties();
                setTimeout(function () {
                    container.classList.remove('hidden');
                }, 20);
            });
        };
        _this.fieldsChangeBoxProperties = function () {
            var fieldsBoxes = document.querySelectorAll('.added .categories_text_field');
            fieldsBoxes.forEach(function (item, key) {
                var max = _this.keys[_this.keys.length - 1];
                _this.keys.push(max + 1);
                if (item) {
                    var num = item.querySelector('.head .left_box .num');
                    if (num)
                        num.textContent = "" + (key + 1);
                    var editor = item.querySelector('[name=ckeditor_text]');
                    if (editor) {
                        var new_id = "ckeditor_text_" + _this.keys[_this.keys.length - 1];
                        editor.setAttribute('id', new_id);
                        editor.setAttribute('name', new_id);
                        // const oldScript = item.querySelector('script')
                        // if(oldScript){
                        //     oldScript.remove()
                        // }
                        // @ts-ignore
                        CKEDITOR.replace(new_id, {
                            customConfig: '../ckeditor/custom_config.js'
                        });
                    }
                }
            });
        };
        return _this;
    }
    return TextFieldController;
}(AbstractTextFieldController_1.default));
exports.default = TextFieldController;
