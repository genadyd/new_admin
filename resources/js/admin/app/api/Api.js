"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Api = /** @class */ (function () {
    function Api(url, method, data, type) {
        var _this = this;
        if (method === void 0) { method = 'POST'; }
        if (data === void 0) { data = {}; }
        if (type === void 0) { type = 'json'; }
        this.exeq = function () {
            var urlPrefix = '/new_admin/public/api';
            if (window.location.host == 'www.admin.loc' || window.location.host == '127.0.0.1:8000' || window.location.host == 'gena-admin.com') {
                urlPrefix = '/api';
            }
            var type = _this.type === 'json' ? 'application/json' : 'text/html';
            return fetch(urlPrefix + _this.url, {
                method: _this.method,
                headers: {
                    'Content-Type': type,
                },
                body: _this.data == 'undefined' ? '' : JSON.stringify(_this.data)
            }).then(function (response) {
                return _this.type === 'json' ? response.json() : response.text();
            });
        };
        this.url = url;
        this.data = data;
        this.method = method;
        this.type = type;
    }
    return Api;
}());
exports.default = Api;
