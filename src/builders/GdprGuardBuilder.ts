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
    ){
    }

    static create(gb: GdprGroupBuilder, storage: GdprStorage = GdprStorage.Cookie, enabled: boolean = false){
        return new GdprGuardBuilder(gb, storage, enabled);
    }

    endGuard(): GdprGroupBuilder{
        const guard = makeGuard(this.name, this.description, this.storage, this.enable);
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
}

export {
    GdprGuardBuilder,
}