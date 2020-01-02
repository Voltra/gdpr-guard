import { makeGuard } from "./GdprGuard"
import { GdprGuardGroup } from "./GdprGuardGroup"
import { GdprManager } from "./GdprManager"
import { GdprStorage } from "./GdprStorage"
import { GdprManagerBuilder } from "./builders/builders"

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

const { REQUIRED_GROUP, REQUIRED_GROUP_DESC } = GdprManager;

export {
    makeGuard,
    GdprGuardGroup,
    GdprManager,
    GdprStorage,
    GdprManagerBuilder,
    REQUIRED_GROUP,
    REQUIRED_GROUP_DESC,
}
