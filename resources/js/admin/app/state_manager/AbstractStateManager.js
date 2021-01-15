"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractStateManager /*implements ListInterface*/ {
    constructor() {
    }
    setState(stateFieldName, data) {
        this.state[stateFieldName] = data;
    }
    getState(stateFieldName) {
        return this.state[stateFieldName];
    }
}
exports.default = AbstractStateManager;
