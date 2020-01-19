export { makeGuard } from "./GdprGuard"
export { GdprGuardGroup } from "./GdprGuardGroup"
export { GdprManager } from "./GdprManager"
export { GdprStorage } from "./GdprStorage"
export { GdprManagerBuilder } from "./builders/builders"
export { GdprDeserializer } from "./serde/GdprDeserializer"

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
