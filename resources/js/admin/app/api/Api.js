"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Api {
    constructor(url, method = 'POST', data = {}, type = 'json') {
        this.exeq = () => {
            let urlPrefix = '/new_admin/public/api';
            if (window.location.host == 'www.admin.loc' || window.location.host == '127.0.0.1:8000' || window.location.host == 'gena-admin.com') {
                urlPrefix = '/api';
            }
            const type = this.type === 'json' ? 'application/json' : 'text/html';
            return fetch(urlPrefix + this.url, {
                method: this.method,
                headers: {
                    'Content-Type': type,
                },
                body: this.data == 'undefined' ? '' : JSON.stringify(this.data)
            }).then(response => {
                return this.type === 'json' ? response.json() : response.text();
            });
        };
        this.url = url;
        this.data = data;
        this.method = method;
        this.type = type;
    }
}
exports.default = Api;
