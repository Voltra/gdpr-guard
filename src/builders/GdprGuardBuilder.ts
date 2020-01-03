import { GdprGroupBuilder } from "./builders"
import { GdprStorage } from "../GdprStorage"
import { makeGuard } from "../GdprGuard";

class GdprGuardBuilder{
    protected name: string = "";
    protected description: string = "";

    protected constructor(
        protected parent: GdprGroupBuilder,
        protected storage: GdprStorage,
        protected enable: boolean,
        protected require: boolean,
    ){
        if(require)
            this.enable = true;
    }

    static create(gb: GdprGroupBuilder, storage: GdprStorage = GdprStorage.Cookie, enabled: boolean = false, required: boolean = false){
        return new GdprGuardBuilder(gb, storage, enabled, required);
    }

    endGuard(): GdprGroupBuilder{
        const enable = this.require || this.enable;
        const guard = makeGuard(this.name, this.description, this.storage, this.require, enable);

        if(this.require)
            guard.makeRequired();

        this.parent.guards.push(guard);
        return this.parent;
    }

    protected edit(edit: (builder: GdprGuardBuilder) => any): GdprGuardBuilder{
        edit(this);
        return this;
    }

    withName(name: string): GdprGuardBuilder{
        return this.edit(b => b.name = name);
    }

    withDescription(description: string): GdprGuardBuilder{
        return this.edit(b => b.description = description);
    }

    enabled(): GdprGuardBuilder{
        return this.edit(b => b.enable = true);
    }

    disabled(): GdprGuardBuilder{
        return this.edit(b => b.enable = false);
    }

    storedIn(storage: GdprStorage){
        return this.edit(b => b.storage = storage);
    }

    required(): GdprGuardBuilder{
        return this.edit(b => b.require = true);
    }
}

export {
    GdprGuardBuilder,
}