var TitaniumRequesterMixin = (superClass: any) => {
    return class extends superClass {
        private async requestProvider(key: string): Promise<any> {
            var resolveFn = (value: any) => { return value; };
            var promise = new Promise<any>((resolve, reject) => {
                resolveFn = resolve;
            });
            const event = new CustomEvent("titanium-request-instance", {
                detail: { key, resolve: resolveFn },
                bubbles: true,
                cancelable: true
            });
            window.dispatchEvent(event);
            return promise;
        };

        public async requestInstance(key: string): Promise<any> {
            var value = await this.requestProvider(key);
            console.log('request instance value:', value)
            return value;
        };

        private value(key: string) {
            return () => this.requestInstance(key);
        };
    }
}