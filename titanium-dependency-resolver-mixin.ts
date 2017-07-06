var TitanumDependencyResolverMixin = (superClass: any) => {
    return class extends superClass {
        ready() {
            if (super.ready)
                super.ready();

            this.providers = {};
            this.unprovidedRequests = {};

            window.addEventListener("titanium-provide-instance", (event: CustomEvent) => {
                const key: string = event.detail.key;
                const instance: any = event.detail.instance;
                this.providers[key] = instance;
                if (this.unprovidedRequests[key]) {
                    this.unprovidedRequests[key].forEach((resolve: any) => {
                        resolve(instance);
                    });
                }
            });

            window.addEventListener("titanium-request-instance", (event: CustomEvent) => {
                var key: string = event.detail.key;
                var resolve: any = event.detail.resolve;
                var instance = this.providers[key];
                console.log(key, instance);
                if (instance) {
                    console.log(resolve)
                    resolve(instance);
                } else {
                    if (this.unprovidedRequests[key]) {
                        this.unprovidedRequests[key].push(resolve);
                    } else {
                        this.unprovidedRequests[key] = [resolve];
                    }
                }
            });
        }



        providers: any;
    }
}