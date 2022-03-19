# gdpr-guard

> Simple GDPR manager

<center><img src="https://github.com/Voltra/gdpr-guard/raw/master/gdpr-guard.png" alt="Logo" width="250px"/></center>

This library helps you build a GPDR compliant system by providing you easy to manipulate interfaces.

If you need any help, you're more than welcome on my [official Discord server](https://discordapp.com/invite/JtWAjbw)
dedicated to my open-source projects.

## How to import

Using ES6-style imports:

```javascript
import {
	//most useful
	GdprStorage,
	GdprManagerBuilder,
	GdprDeserializer,

	//helpers
	makeGuard,
	visitGdpr,
	GdprGuardGroup,
	GdprManager,
	GdprSerializer,
	GdprSaviorAdapter,
} from "gdpr-guard"
```

Using node style require:

```javascript
const {
	//most useful
	GdprStorage,
	GdprManagerBuilder,
	GdprDeserializer,

	//helpers
	makeGuard,
	visitGdpr,
	GdprGuardGroup,
	GdprManager,
	GdprSerializer,
	GdprSaviorAdapter,
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
	visitGdpr,
	GdprGuardGroup,
	GdprManager,
	GdprSerializer,
	GdprSaviorAdapter,
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
const manager = GdprManagerBuilder
	.make()
		.withBannerShown(!!localStorage.getItem("gdpr_banner"))
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
		.endGroup()
	.build();

console.log(manager.raw()); // inspect useful information
```

### GdprDeserializer

`GdprDeserializer` allows you to retrieve a gdpr object from its `raw` representation.

```javascript
import { GdprManagerBuilder, GdprDeserializer } from "gdpr-guard"

// [...]

const manager = GdprManagerBuilder.make()
	// [...]
	.build();

const raw = manager.raw();
//store in local storage

const raw = //get from local storage
const manager = GdprDeserializer.manager(raw);
if (manager === null) { //failed deserialization
	//handle error
	return;
}

// here, both managers are equivalent
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

A `GdprGuardGroup` manages a list of `GdprGuard` (which includes raw guards, `GdprGuardGroup` and `GdprManager` although
one would not recommend to put managers inside managers).

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

### GdprSaviorAdapter

A class that implements most of the behavior for the Savior API.

```typescript
abstract class GdprSaviorAdapter implements GdprSavior {
	public abstract restore(shouldUpdate?: boolean): Promise<GdprManager | null>;

	public abstract store(manager: GdprManagerRaw): Promise<boolean>;

	public abstract updateSharedManager(manager: GdprManager): Promise<void>;
}
```

## Savior API

This API helps saving and restoring the manager state. It is exposed mainly for library authors as it helps creating
various bindings for frameworks.

This is the interface:

```typescript
interface GdprSavior {
	restore(shouldUpdate?: boolean): Promise<GdprManager | null>;

	exists(shouldUpdate?: boolean): Promise<boolean>;

	restoreOrCreate(factory: GdprManagerFactory): Promise<GdprManager>;

	store(manager: GdprManagerRaw): Promise<boolean>;

	storeIfNotExists(manager: GdprManagerRaw): Promise<boolean>;

	updateSharedManager(manager: GdprManager): Promise<void>;

	check(): Promise<void>;
}
```

## Events API

This API helps reacting to the user confirming their choices from a GDPR banner.

```typescript
type GdprManagerEventHandler = () => void;

interface GdprManagerEventHub {
	onEnable(guardName: string, callback: GdprManagerEventHandler): this;

	onDisable(guardName: string, callback: GdprManagerEventHandler): this;

	enable(guardName: string): this;

	disable(guardName: string): this;
}

interface GdprManager {
	bannerWasShown: boolean;
	events: GdprManagerEventHub;

	resetAndShowBanner(): void;

	closeBanner();
}
```

The goal is to call `Manager#closeBanner` when the user confirm their choices from the banner, which in turn will
trigger the appropriate events (so you can load scripts dynamically for instance).

## Visitor API

This API allows you to visit your manager's entire guard tree easily.

```typescript
interface GdprVisitor {
	onManager(manager: GdprManager): void;

	onGroup(group: GdprGuardGroup): void;

	onGuard(guard: GdprGuard): void;

	onEach(guard: GdprGuard): void;
}

declare function visitGdpr(guard: GdprGuard, visitor?: Partial<GdprVisitor>);
```
