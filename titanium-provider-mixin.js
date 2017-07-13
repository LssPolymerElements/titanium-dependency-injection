let TitanumProviderMixin = (superClass) => {
    return class extends superClass {
        provideInstance(key, instance) {
            let options = {
                detail: { key, instance },
                bubbles: true,
                composed: true,
                cancelable: true
            };
            const event = new CustomEvent('titanium-provide-instance', options);
            window.dispatchEvent(event);
        }
        ;
    };
};
