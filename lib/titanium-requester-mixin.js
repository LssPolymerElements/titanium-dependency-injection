"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let TitaniumRequesterMixin = function (superClass) {
    return class extends superClass {
        requestProvider(key) {
            return __awaiter(this, void 0, void 0, function* () {
                let resolveFn = (value) => {
                    return value;
                };
                let promise = new Promise((resolve) => {
                    resolveFn = resolve;
                });
                let options = { detail: { key, resolve: resolveFn }, bubbles: true, composed: true, cancelable: true };
                const event = new CustomEvent('titanium-request-instance', options);
                this.dispatchEvent(event);
                return promise;
            });
        }
        requestInstance(key) {
            return __awaiter(this, void 0, void 0, function* () {
                let value = yield this.requestProvider(key);
                return value;
            });
        }
        value(key) {
            return () => this.requestInstance(key);
        }
    };
};
//# sourceMappingURL=titanium-requester-mixin.js.map