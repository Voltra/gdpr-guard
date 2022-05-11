export * from "./GdprGuard"
export * from "./GdprGuardGroup"
export * from "./GdprManager"
export * from "./GdprStorage"
export * from "./GdprManagerEventHub"
export * from "./visitor"
export * from "./builders/builders"
export * from "./serde/GdprDeserializer"
export * from "./serde/GdprSavior"

/*

const $gdpr: GdprManager = GdprManagerBuilder.make()
	.startGroup(GdprStorage.Cookie, "tracking")
		.withEnabledGuard("Google Tags Analytics") //cookie
		.withEnabledGuard("Company-wide Tracking", "Homebrewed tracking system") //cookie
	.endGroup()
	.startGroup(GdprStorage.LocalStorage, "styles") //ls
		.startGroup().withName("themes") //ls
			.withEnabledGuard("colors", "User based color scheme") //ls
			.withEnabledGuard("") //ls
		.endGroup()
	.endGroup()
.build();

*/
