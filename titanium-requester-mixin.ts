let TitaniumRequesterMixin = function<T extends new (...args: any[]) => {}>(superClass: T) {
  return class extends superClass {
    declare dispatchEvent: any;
    private async requestProvider(key: string): Promise<any> {
      let resolveFn = (value: any) => {
        return value;
      };
      let promise = new Promise<any>((resolve, reject) => {
        resolveFn = resolve;
      });
      let options = {detail: {key, resolve: resolveFn}, bubbles: true, composed: true, cancelable: true};
      const event = new CustomEvent('titanium-request-instance', options);
      this.dispatchEvent(event);
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