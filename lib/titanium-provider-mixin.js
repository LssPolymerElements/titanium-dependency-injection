"use strict";
let TitaniumProviderMixin = function (superClass) {
    return class extends superClass {
        provideInstance(key, instance) {
            let options = { detail: { key, instance }, bubbles: true, composed: true, cancelable: true };
            const event = new CustomEvent('titanium-provide-instance', options);
            this.dispatchEvent(event);
        }
    };
};
//# sourceMappingURL=titanium-provider-mixin.js.map