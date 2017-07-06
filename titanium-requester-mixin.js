var TitaniumRequesterMixin = (superClass) => {
    return class extends superClass {
        requestProvider(key) {
            const event = new CustomEvent("request-provider", {
                detail: { key },
                bubbles: true,
                cancelable: true
            });
            window.dispatchEvent(event);
            if (event.defaultPrevented) {
                return event.detail.provider;
            }
            else {
                throw new Error(`no provider found for ${key}`);
            }
        }
        ;
        requestInstance(key) {
            return this.requestProvider(key)();
        }
        ;
        value(key) {
            return () => this.requestInstance(key);
        }
        ;
    };
};
