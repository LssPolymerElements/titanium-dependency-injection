declare let TitaniumProviderMixin: <T extends new (...args: any[]) => {}>(superClass: T) => {
    new (...args: any[]): {
        dispatchEvent: any;
        provideInstance(key: string, instance: any): void;
    };
} & T;
