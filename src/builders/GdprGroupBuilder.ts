import { GdprStorage } from "../GdprStorage"
import { GdprManagerBuilder } from "./GdprManagerBuilder"
import { GdprGuard } from "../GdprGuard"
import { GdprGuardGroup } from "../GdprGuardGroup"
import { GdprGuardBuilder } from "./GdprGuardBuilder"

class GdprGroupBuilder extends GdprManagerBuilder{
    public guards: GdprGuard[] = [];

    protected constructor(
        protected parent: GdprManagerBuilder ,
        protected name: string,
        protected description: string,
        storage: GdprStorage,
        protected enable: boolean,
    ){
        super();
        this.storage = storage;
    }

    public startGroup(storage: GdprStorage|null = null, name: string = "", description: string = ""): GdprGroupBuilder{
        return super.startGroup(storage || this.parent.storage, name, description);
    }

    public static create(mb: GdprManagerBuilder, name: string, description: string = "", storage: GdprStorage|null = null, enabled: boolean = true): GdprGroupBuilder{
        return new GdprGroupBuilder(mb, name, description, storage || GdprStorage.Cookie, enabled);
    }

    public endGroup(): GdprManagerBuilder{
        const group = GdprGuardGroup.for(this.name, this.description, this.enable);
        const guards = [...this.guards, ...this.groups];
        guards.forEach(guard => group.addGuard(guard));
        this.parent.groups.push(group);
        return this.parent;
    }

    protected edit(cb: (builder: GdprGroupBuilder) => any): GdprGroupBuilder{
        cb(this);
        return this;
    }

    public withName(name: string){
        return this.edit(b => b.name = name);
    }

    public withDescription(description: string){
        return this.edit(b => b.description = description);
    }

    public storedIn(storage: GdprStorage){
        return this.edit(b => b.storage = storage);
    }

    public enabled(){
        return this.edit(b => b.enable = true);
    }

    public disabled(){
        return this.edit(b => b.enable = false);
    }

    public startGuard(storage: GdprStorage|null): GdprGuardBuilder{
        return GdprGuardBuilder.create(this, storage || this.storage, this.enable);
    }

    public withEnabledGuard(name: string, description: string = "", storage: GdprStorage|null = null): GdprGroupBuilder{
        return this.startGuard(storage)
            .withName(name)
            .withDescription(description)
            .enabled()
        .endGuard();
    }

    public withDisabledGuard(name: string, description: string = "", storage: GdprStorage|null = null): GdprGroupBuilder{
        return this.startGuard(storage)
            .withName(name)
            .withDescription(description)
            .disabled()
        .endGuard();
    }
}

export {
    GdprGroupBuilder,
}