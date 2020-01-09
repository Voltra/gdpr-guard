# gdpr-guard
> Simple GDPR manager

This library helps you build a GPDR compliant system by providing you easy to manipulate interfaces.

## How to import
Using ES6-style imports:
```javascript
import {
    makeGuard,
    GdprGuardGroup,
    GdprManager,
    GdprStorage,
    GdprManagerBuilder,
} from "gdpr-guard"
```

Using node style require:
```javascript
const {
    makeGuard,
    GdprGuardGroup,
    GdprManager,
    GdprStorage,
    GdprManagerBuilder,
} = require("gdpr-guard");
```

Directly from your browser:
```javascript
const {
    //most useful
    GdprStorage,
    GdprManagerBuilder,
    GdprDeserializer,
    
    //helpers
    makeGuard,
    GdprGuardGroup,
    GdprManager,
    GdprSerializer,
    
    //for completion
    storageFromOrdinal,
} = gdprGuard;
```

## What are the essential design choices to keep in mind
The `name` used for guards and groups ***must*** be unique! This is the identifier/key that binds it.

The wide concept of `guard` is that a `guard` is an entity that can be toggled to allow/deny some functionalities.

## What is provided?

You can check the [documentations here](https://voltra.github.io/gdpr-guard/)

### GdprStorage
This is an enum-like type that lists the available storage options, these include:

* None
* Cookie
* LocalStorage
* SessionStorage
* IndexedDb
* FileSystem
* ServerStorage
* All

### GdprManagerBuilder
`GdprManagerBuilder` provides a nice and easy to write/read way to create a `GdprManager` object from the groun up.

For instance you can use it like this:
```javascript
const manager = GdprManagerBuilder.make()
.startRequiredGroup(GdprStorage.Cookie, "Functionalities", "Information purely used for the user's experience")
// This is a group that by default uses cookies for storage, every option and the group itself is required
    .withEnabledGuard("PHP_SESSID", "Server session identifier")
    .startGuard()
        .withName("theme")
        .withDescription("User's current colors' theme")
        .storedIn(GdprStorage.LocalStorage)
    .endGuard()
.endGroup()
.startGroup(GdprStorage.Cookie, "Advertisement", "Tracking-based avertisement informations")
    .startGroup(GdprStorage.Cookie, "Advertisement : Local", "Sitewide advertisement informations")
        // [...]
    .endGroup()
    .startGroup(GdprStorage.Cookie, "Advertisement : 3rd-party", "3rd-party advertisement informations")
        // [...]
    .endGroup()
.build();

console.log(manager.raw()); // inspect useful information
```



### GdprDeserializer

`GdprDeserializer` allows you to retrieve a gdpr object from its `raw` representation.

```javascript
import { GdprManagerBuilder, GdprDeserializer } from "gdpr-guard"

const manager = GdprManagerBuilder.make()
	// [...]
.build();

const raw = manager.raw();
//store in local storage

const raw = //get from local storage
const manager = GdprDeserializer.manager(raw);
if(manager === null) //failed deserialization
    //handle error
```



### GdprManager

A `GdprManager` manages a list of `GdprGuardGroup`. You can :

* get its most useful representation (`raw()`)
* add or create groups (respectively `addGroup(guardGroup)` and `createGroup(name, description)`)
* determine whether or not there is a specific guard (`hasGuard(name)`)
* retrieve a specific guard (`getGuard(name)`)
* determine whether or not there is a specific group (`hasGroup(name)`)
* get a specific group (`getGroup(name)`)
* determine if a guard/group is enabled (`isEnabled(name)`)
* enable everything except required (`enable()`)
* disable everything except required (`disable()`)
* toggle state, i.e. either enable all or disable all (`toggle()`)
* enable everything for a given storage (`enableForStorage(gdprStorage)`)
* disable everything for a given storage (`disableForStorage(gdprStorage)`)
* toggle state for a given storage (`toggleForStorage(gdprStorage)`)



### GdprGuardGroup

A `GdprGuardGroup` manages a list of `GdprGuard` (which includes raw guards, `GdprGuardGroup` and `GdprManager` although one would not recommend to put managers inside managers).

You can:

* mark it as required, with every of its guards (`makeRequired()`)
* get its most useful representation (`raw()`)
* determine whether or not there is a specific guard (`hasGuard(name)`)
* retrieve a specific guard (`getGuard(name)`)
* determine if a guard/group is enabled (`isEnabled(name)`)
* enable everything except required (`enable()`)
* disable everything except required (`disable()`)
* toggle state, i.e. either enable all or disable all (`toggle()`)
* enable everything for a given storage (`enableForStorage(gdprStorage)`)
* disable everything for a given storage (`disableForStorage(gdprStorage)`)
* toggle state for a given storage (`toggleForStorage(gdprStorage)`)

### makeGuard

`makeGuard` is a function that creates the simplest guard possible, it has the following signature:

```typescript
declare function makeGuard(name: string, description: string, storage?: GdprStorage, required?: boolean, enabled?: boolean | null): GdprGuard;
```