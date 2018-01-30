declare let TitaniumDependencyResolverMixin: <T extends Polymer.ElementMixinConstructor>(superClass: T) => {
    new (...args: any[]): {
        addEventListener: any;
        ready(): void;
        providers: any;
        unprovidedRequests: any;
        _template: HTMLTemplateElement | null;
        _importPath: string;
        rootPath: string;
        importPath: string;
        root: HTMLElement | ShadowRoot | StampedTemplate | null;
        $: {
            [key: string]: Polymer.Element;
        };
        _initializeProperties(): void;
        _readyClients(): void;
        connectedCallback(): void;
        _attachDom(dom: StampedTemplate | null): ShadowRoot | null;
        updateStyles(properties?: object | null | undefined): void;
        resolveUrl(url: string, base?: string | undefined): string;
    };
    _parseTemplateContent(template: any, templateInfo: any, nodeInfo: any): any;
    createProperties(props: any): void;
    _finalizeClass(): void;
    createObservers(observers: object | null, dynamicFns: object | null): void;
    _processStyleText(cssText: string, baseURI: string): string;
    _finalizeTemplate(is: string): void;
} & T;
