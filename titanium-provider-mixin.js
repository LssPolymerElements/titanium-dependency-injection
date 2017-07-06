var TitanumProviderMixin = (superClass) => {
    return class extends superClass {
        ready() {
            if (super.ready)
                super.ready();
            this.providers = {};
            window.addEventListener("request-provider", (event) => {
                const key = event.detail.key;
                if (key in this.providers) {
                    event.detail.provider = this.providers[key];
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        }
        provide(key, factory) {
            this.providers[key] = factory;
        }
        ;
        provideInstance(key, instance) {
            this.providers[key] = () => instance;
        }
        ;
    };
};
