"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CategoriesApi_1 = __importDefault(require("../../../api/CategoriesApi"));
var TextField = /** @class */ (function () {
    function TextField() {
        var _this = this;
        this.keys = [1];
        this.addTextFieldFormElement = function () {
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
        this.fieldsChangeBoxProperties = function () {
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
                        var oldScript = item.querySelector('sctipt');
                        if (oldScript) {
                            oldScript.remove();
                        }
                        // @ts-ignore
                        CKEDITOR.replace(new_id, {
                            customConfig: '../ckeditor/custom_config.js'
                        });
                    }
                }
            });
        };
        this.fieldRemove = function (e) {
            var parentElement = e.target.closest('.added');
            parentElement.classList.add('hidden');
            setTimeout(function () {
                parentElement.remove();
            }, 500);
        };
        this.fieldOpenClose = function (e) {
            var target = e.target, parentElement = target.closest('.added'), body = parentElement.querySelector('.body');
            var nodeText = target.textContent;
            if (nodeText === 'keyboard_arrow_up') {
                body.classList.add('colapsed');
                target.textContent = 'keyboard_arrow_down';
            }
            else {
                body.classList.remove('colapsed');
                target.textContent = 'keyboard_arrow_up';
            }
        };
    }
    return TextField;
}());
exports.default = TextField;
