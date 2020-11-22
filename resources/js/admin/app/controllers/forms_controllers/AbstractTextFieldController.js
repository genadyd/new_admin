"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractTextFieldController = /** @class */ (function () {
    function AbstractTextFieldController() {
        var _this = this;
        this.textFieldOpenClose = function () {
            if (_this.formContainer) {
                _this.formContainer.addEventListener('click', function (e) {
                    if (e.target && e.target.matches('.text_open_close')) {
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
                    }
                });
            }
        };
        this.textFieldRemove = function () {
            if (_this.formContainer) {
                _this.formContainer.addEventListener('click', function (e) {
                    if (e.target && e.target.matches('.remove_field')) {
                        var parentElement_1 = e.target.closest('.added');
                        parentElement_1.classList.add('hidden');
                        setTimeout(function () {
                            parentElement_1.remove();
                        }, 500);
                    }
                });
            }
        };
        this.formContainer = document.querySelector('.form_container');
        this.textFieldOpenClose();
        this.textFieldRemove();
    }
    return AbstractTextFieldController;
}());
exports.default = AbstractTextFieldController;
