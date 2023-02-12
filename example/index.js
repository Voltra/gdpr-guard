const {
	GdprManagerBuilder,
	GdprSerializer,
	GdprDeserializer,
	GdprStorage,
} = gdprGuard;

const manager = GdprManagerBuilder
	.make()
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
			.startGroup(null, "Advertisement : Local", "Sitewide advertisement informations")
				.startGuard()
					.withName("Local Ad 1")
					.withDescription("User's current colors' theme")
				.endGuard()
				.startGuard()
					.withName("Local Ad 2")
					.withDescription("User's current colors' theme")
				.endGuard()
			.endGroup()
			.startGroup(null, "Advertisement : 3rd-party", "3rd-party advertisement informations")
				.startGuard()
					.withName("3rd-party Ad 1")
					.withDescription("User's current colors' theme")
				.endGuard()
				.startGuard()
					.withName("3rd-partyl Ad 2")
					.withDescription("User's current colors' theme")
				.endGuard()
				.startGuard()
					.withName("3rd-partyl Ad 3")
					.withDescription("User's current colors' theme")
					.disabled()
				.endGuard()
			.endGroup()
		.endGroup()
	.build();
	
const serialized = GdprSerializer.serialize(manager);
const deserialized = GdprDeserializer.manager(serialized);

console.log({
	manager,
	serialized,
	deserialized,
});