var TitaniumRequesterMixin = (superClass: any) => {
    return class extends superClass {
        private requestProvider(key: string) {
            const event = new CustomEvent("request-provider", {
                detail: { key },
                bubbles: true,
                cancelable: true
            });
            window.dispatchEvent(event);

            if (event.defaultPrevented) {
                return event.detail.provider;
            } else {
                throw new Error(`no provider found for ${key}`);
            }
        };

        requestInstance(key: string) {
            return this.requestProvider(key)();
        };

        private value(key: string) {
            return () => this.requestInstance(key);
        };
    }
}