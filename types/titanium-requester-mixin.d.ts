declare let TitaniumRequesterMixin: <T extends new (...args: any[]) => {}>(superClass: T) => {
    new (...args: any[]): {
        dispatchEvent: any;
        requestProvider(key: string): Promise<any>;
        requestInstance(key: string): Promise<any>;
        value(key: string): () => Promise<any>;
    };
} & T;
