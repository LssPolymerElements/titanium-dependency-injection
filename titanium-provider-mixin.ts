var TitanumProviderMixin = (superClass: any) => {
    return class extends superClass {
        ready() {
            if (super.ready)
                super.ready();

            this.providers = {};
            window.addEventListener("request-provider", (event: CustomEvent) => {
                const key = event.detail.key;
                if (key in this.providers) {
                    event.detail.provider = this.providers[key];
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        }

        providers: any;
        provide(key: string, factory: any) {
            this.providers[key] = factory;
        };

        provideInstance(key: string, instance: any) {
            this.providers[key] = () => instance;
        };
    }
}