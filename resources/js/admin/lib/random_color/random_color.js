"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomColor = void 0;
function getRandomColor(opacity = '33') {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color + opacity;
}
exports.getRandomColor = getRandomColor;
