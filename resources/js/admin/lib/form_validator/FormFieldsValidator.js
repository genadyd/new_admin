"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormFieldsValidator = /** @class */ (function () {
    function FormFieldsValidator() {
        var _this = this;
        this.patterns = [
            { name: 'simpleString', value: new RegExp(/^[\p{Letter}\w\s?',.;:()_-]{3,100}$/u) },
            { name: 'innerUrl', value: new RegExp(/^[\p{Letter}\d\/a-z_-]{3,50}$/u) },
            { name: 'longText', value: new RegExp(/^[\p{Letter}?;`'",.\[\]\w\s:()_-]*$/iu) },
        ];
        this.textValidator = function (input) {
            var patternName = input.getAttribute('pattern');
            var found = _this.patterns.find(function (elem) { return elem.name === patternName; });
            if (found && !found.value.test(input.value)) {
                var inpCont = input.closest('div.input_block');
                inpCont.classList.add('error');
                return false;
            }
            else {
                input.closest('div.input_block').classList.remove('error');
                return true;
            }
        };
    }
    return FormFieldsValidator;
}());
exports.default = FormFieldsValidator;
