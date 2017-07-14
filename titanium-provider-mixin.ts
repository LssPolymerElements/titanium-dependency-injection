let TitaniumProviderMixin = (superClass: any) => {
    return class extends superClass {
        provideInstance(key: string, instance: any) {
            let options = {
                detail: { key, instance },
                bubbles: true,
                composed: true,
                cancelable: true
            };
            const event = new CustomEvent('titanium-provide-instance', options);
            window.dispatchEvent(event);
        };
    };
};