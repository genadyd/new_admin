"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractStateManager /*implements ListInterface*/ = /** @class */ (function () {
    function AbstractStateManager(state) {
        this.state = state;
    }
    AbstractStateManager.prototype.setState = function (stateFieldName, data) {
        this.state[stateFieldName] = data;
    };
    AbstractStateManager.prototype.getState = function (stateFieldName) {
        return this.state[stateFieldName];
    };
    return AbstractStateManager;
}());
exports.default = AbstractStateManager;
