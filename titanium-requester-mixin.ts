let TitaniumRequesterMixin = (superClass: PolymerElementConstructor) => {
    return class extends superClass {
        private async requestProvider(key: string): Promise<any> {
            let resolveFn = (value: any) => { return value; };
            let promise = new Promise<any>((resolve, reject) => {
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

        public async requestInstance(key: string): Promise<any> {
            let value = await this.requestProvider(key);
            return value;
        }

        private value(key: string) {
            return () => this.requestInstance(key);
        }
    };
};