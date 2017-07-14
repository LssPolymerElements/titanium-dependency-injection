# titanium-dependency-injection

[![Build status](https://ci.appveyor.com/api/projects/status/6r2d4l28kui8a1xu/branch/master?svg=true)](https://ci.appveyor.com/project/aarondrabeck/titanium-dependency-injection/branch/master)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/LssPolymerElements/titanium-dependency-injection)

To install use: `bower install --save titanium-dependency-injection`

[ LIVE DEMO AND API ](https://www.webcomponents.org/element/LssPolymerElements/titanium-dependency-injection)

```html
<paper-button on-tap="provideButtonTapped">provide Example Service</paper-button>
<paper-button on-tap="requestButtonTapped">request Example Service</paper-button>
<h3>testValue:[[testValue]]</h3>
<script>
    class MyElement extends Polymer.mixinBehaviors([TitaniumDependencyResolverMixin,TitaniumProviderMixin,TitaniumRequesterMixin],Polymer.Element){
        
    }
</script>
```

## Scenario:

```
---app-main  <-- RESOLVER. anything provided below this (user-manager in this case) is resolved from this component
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

In this example we have a single instance component that is called user-manager that we would like to use in a child component nested deep in our app.  Rather then binding the user-manager through the component tree in our app, we can simply provide, store, and then request the user-manager as seen below. 

### 1. Declare a parent component as the dependency resolver, which will store the references to provided objects (user-manager)
```typescript
class MyParentComponent extends TitaniumDependencyResolverMixin(Polymer.Element) {

}
```


### 2. Provide your component in any child component
```typescript
class FirstChildComponent extends TitaniumProviderMixin(Polymer.Element) {
    ready() {
        super.ready();    
        this.provideInstance("UserManager", this.$.userManager);
    }
}
```


### 3. Request your component from any child component
```typescript
class DemoRequester extends TitaniumRequesterMixin(Polymer.Element) {
    async connectedCallback() {
         super.connectedCallback();
         var userManager = await this.requestInstance('UserManager');
         userManager.ensureLoggedIn();
    }
}
```


### Be both a requester and provider
```typescript
class MyComponent extends Polymer.mixinBehaviors([TitaniumProviderMixin,TitaniumRequesterMixin],Polymer.Element) {
   ready() {
        super.ready();    
        this.provideInstance("MyComponent", this);
   }
   
   async connectedCallback() {
        super.connectedCallback();
        let userManager = await this.requestInstance("UserManager");
        userManager.ensureLoggedIn();
   }
   
   async onLogoutButtonClick(){
        let userManager = this.requestInstance("UserManager");
        userManager.logout();
   }
}
```
