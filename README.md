# titanium-dependency-injection

To install use: `bower install --save titanium-dependency-injection`

[ LIVE DEMO AND API ](https://www.webcomponents.org/element/LssPolymerElements/titanium-dependency-injection)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/LssPolymerElements/titanium-dependency-injection)


## Scenario:

```
---app-main
    --my-parent-component  <-- PROVIDER of user-manager.  user-manager lives in this component.
       -user-manager
       -component-a      
         -component-b
            -component-c
         -component-d
            -component-e
              -my-child-component   <-- needs access to user-manager becomes REQUESTER of user-manager
                -user-manager  
          -component-f
     --my-faq
     --my-feedback
```
       
## How to use:

In this example we have a single instance component that is called user-manager that we would like to use in a child component nested deep in our app.  Rather then binding the user-manager through the component tree in our app, we can simple provide and request the user-manager as seen below. 
       
### 1. Provide your component in any parent component
```typescript
class MyParentComponent extends TitaniumProviderMixin(Polymer.Element) {
  
    ready() {
        super.ready();    
        this.provideInstance("UserManager", this.$.userManager);
    }
}
```


### 2. Request your component from any child component
```typescript
class MyChildComponent extends TitaniumRequesterMixin(Polymer.Element) {
    async connectedCallback() {
         super.connectedCallback();
         var p = new Promise();
         this.requestInstance("UserManager",p);
         var userManager = await p;
         userManager.ensureLoggedIn();
    }
}
```


### Be both a requester and provider
```typescript
class MyComponent extends Polymer.mixinBehaviors([LssProviderBehavior,LssRequesterBehavior],Polymer.Element) {
   ready() {
        super.ready();    
        this.provideInstance("MyComponent", this);
   }
   
   async connectedCallback() {
        super.connectedCallback();
        var p = new Promise();
        this.requestInstance("UserManager",p);
        var userManager = await p;
        userManager.ensureLoggedIn();
   }
   
   async onLogoutButtonClick(){
        var p = new Promise();
        this.requestInstance("UserManager",p);
        var userManager = await p;
        userManager.logout();
   }
}
```
