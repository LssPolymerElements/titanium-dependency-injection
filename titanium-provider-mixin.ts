let TitaniumProviderMixin = function<T extends new (...args: any[]) => {}>(
    superClass: T) {
  return class extends superClass {
    declare dispatchEvent: any;
    provideInstance(key: string, instance: any) {
      let options = {
        detail: {key, instance},
        bubbles: true,
        composed: true,
        cancelable: true
      };
      const event = new CustomEvent('titanium-provide-instance', options);
      this.dispatchEvent(event);
    };
  };
};