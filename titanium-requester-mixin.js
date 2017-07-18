let TitaniumRequesterMixin = (superClass) => {
    return class extends superClass {
        async requestProvider(key) {
            let resolveFn = (value) => { return value; };
            let promise = new Promise((resolve, reject) => {
                resolveFn = resolve;
            });
            let options = {
                detail: { key, resolve: resolveFn },
                bubbles: true,
                composed: true,
                cancelable: true
            };
            const event = new CustomEvent('titanium-request-instance', options);
            window.dispatchEvent(event);
            return promise;
        }
        async requestInstance(key) {
            let value = await this.requestProvider(key);
            return value;
        }
        value(key) {
            return () => this.requestInstance(key);
        }
    };
};
