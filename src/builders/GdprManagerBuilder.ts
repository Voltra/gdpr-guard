import { GdprGuardGroup } from "../GdprGuardGroup"
import { GdprStorage } from "../GdprStorage"
import { GdprManager } from "../GdprManager"
import { GdprGroupBuilder } from "./builders"

class GdprManagerBuilder{
    public storage: GdprStorage = GdprStorage.Cookie;
    public groups: GdprGuardGroup[] = [];

    public static make(){
        return new GdprManagerBuilder();
    }

    startGroup(storage: GdprStorage|null = null, name: string = "", description: string = "", enabled: boolean = true): GdprGroupBuilder{
        return GdprGroupBuilder.create(this, name, description, storage, enabled);
    }

    startRequiredGroup(storage: GdprStorage|null = null, name: string = "", description: string = ""){
        return this.startGroup(storage, name, description, true).enabled();
    }

    startEnabledGroup(storage: GdprStorage|null = null, name: string = "", description: string = ""): GdprGroupBuilder{
        return this.startGroup(storage, name, description, true);
    }

    startDisabledGroup(storage: GdprStorage|null = null, name: string = "", description: string = ""): GdprGroupBuilder{
        return this.startGroup(storage, name, description, false);
    }

    build(): GdprManager{
        return GdprManager.create(this.groups);
    }

    endGroup(): GdprManagerBuilder{
        return this;
    }
}

export {
    GdprManagerBuilder,
}