let TitaniumDependencyResolverMixin = (superClass) => {
    return class extends superClass {
        ready() {
            this.providers = {};
            this.unprovidedRequests = {};
            this.addEventListener('titanium-provide-instance', (event) => {
                const key = event.detail.key;
                const instance = event.detail.instance;
                if (this.providers[key]) {
                    console.warn(`an instance with a key of '${key}' has already been provided to this resolver`);
                    return;
                }
                this.providers[key] = instance;
                if (this.unprovidedRequests[key]) {
                    this.unprovidedRequests[key].forEach((resolve) => {
                        resolve(instance);
                    });
                }
            });
            this.addEventListener('titanium-request-instance', (event) => {
                let key = event.detail.key;
                let resolve = event.detail.resolve;
                let instance = this.providers[key];
                if (instance) {
                    resolve(instance);
                }
                else {
                    if (this.unprovidedRequests[key]) {
                        this.unprovidedRequests[key].push(resolve);
                    }
                    else {
                        this.unprovidedRequests[key] = [resolve];
                    }
                }
            });
            if (super.ready)
                super.ready();
        }
    };
};
