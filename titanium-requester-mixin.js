var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var TitaniumRequesterMixin = (superClass) => {
    return class extends superClass {
        requestProvider(key) {
            return __awaiter(this, void 0, void 0, function* () {
                var resolveFn = (value) => { return value; };
                var promise = new Promise((resolve, reject) => {
                    resolveFn = resolve;
                });
                var options = {
                    detail: { key, resolve: resolveFn },
                    bubbles: true,
                    composed: true,
                    cancelable: true
                };
                const event = new CustomEvent("titanium-request-instance", options);
                window.dispatchEvent(event);
                return promise;
            });
        }
        ;
        requestInstance(key) {
            return __awaiter(this, void 0, void 0, function* () {
                var value = yield this.requestProvider(key);
                console.log('request instance value:', value);
                return value;
            });
        }
        ;
        value(key) {
            return () => this.requestInstance(key);
        }
        ;
    };
};
