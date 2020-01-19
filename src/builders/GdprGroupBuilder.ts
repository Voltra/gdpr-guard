import { GdprStorage } from "../GdprStorage"
import { GdprManagerBuilder } from "./GdprManagerBuilder"
import { GdprGuard } from "../GdprGuard"
import { GdprGuardGroup } from "../GdprGuardGroup"
import { GdprGuardBuilder } from "./GdprGuardBuilder"

/**
 * Builder for a gdpr group
 * @class GdprGroupBuilder
 * @extends {GdprManagerBuilder}
 * @export
 */
class GdprGroupBuilder extends GdprManagerBuilder{
    public guards: GdprGuard[] = [];

    /**
     * @ignore
     * @protected
     */
    protected constructor(
        protected parent: GdprManagerBuilder ,
        protected name: string,
        protected description: string,
        storage: GdprStorage,
        protected enable: boolean,
        protected require: boolean,
    ){
        super();
        this.storage = storage;
        if(!!require)
            this.enable = true;
    }

    public startGroup(storage: GdprStorage|null = null, name: string = "", description: string = ""): GdprGroupBuilder{
        return super.startGroup(storage || this.parent.storage, name, description);
    }

    public startRequiredGroup(storage: GdprStorage|null = null, name: string = "", description: string = ""): GdprGroupBuilder{
        return this.startGroup(storage, name, description).required();
    }

    /**
     * Factory for a group builder
     * @static
     * @param {GdprManagerBuilder} mb The parent manager builder
     * @param {string} name The name of the group
     * @param {string} [description=""] The description of the group
     * @param {(GdprStorage|null)} [storage=null] The storage of the group
     * @param {boolean} [enabled=true] Whether or not the group should be enabled
     * @param {boolean} [required=true] Whether or not the group should be required
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    public static create(mb: GdprManagerBuilder, name: string, description: string = "", storage: GdprStorage|null = null, enabled: boolean = true, required: boolean = false): GdprGroupBuilder{
        return new GdprGroupBuilder(mb, name, description, storage || GdprStorage.Cookie, enabled, required);
    }

    /**
     * End the group using the current builder state
     * @returns {GdprManagerBuilder}
     * @memberof GdprGroupBuilder
     */
    public endGroup(): GdprManagerBuilder{
        const enable = this.require || this.enable;
        const group = GdprGuardGroup.for(this.name, this.description, enable, this.require);
        const guards = [...this.guards, ...this.groups];
        guards.forEach(guard => group.addGuard(guard));

        if(this.require)
            group.makeRequired();

        this.parent.groups.push(group);
        return this.parent;
    }

    /**
     * Edit the builder state
     * @ignore
     * @protected
     * @param {(builder: GdprGroupBuilder) => any} cb
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    protected edit(cb: (builder: GdprGroupBuilder) => any): GdprGroupBuilder{
        cb(this);
        return this;
    }

    /**
     * Set the name of the group
     * @param {string} name The new name for the group
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    public withName(name: string): GdprGroupBuilder{
        return this.edit(b => b.name = name);
    }

    /**
     * Set the description of the group
     * @param {string} description The new description for the group
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    public withDescription(description: string): GdprGroupBuilder{
        return this.edit(b => b.description = description);
    }

    /**
     * Set the storage of the group
     * @param {GdprStorage} storage The new storage for the group
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    public storedIn(storage: GdprStorage): GdprGroupBuilder{
        return this.edit(b => b.storage = storage);
    }

    /**
     * Mark as enabled
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    public enabled(): GdprGroupBuilder{
        return this.edit(b => b.enable = true);
    }

    /**
     * Mark as disabled
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    public disabled(): GdprGroupBuilder{
        return this.edit(b => b.enable = false);
    }

    /**
     * Mark as required
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    public required(): GdprGroupBuilder{
        return this.edit(b => b.require = true);
    }

    /**
     * Start adding a guard
     * @param {(GdprStorage|null)} [storage=null] The storage for the guard (by default it uses the group's storage)
     * @returns {GdprGuardBuilder}
     * @memberof GdprGroupBuilder
     */
    public startGuard(storage: GdprStorage|null = null): GdprGuardBuilder{
        return GdprGuardBuilder.create(this, storage || this.storage, this.enable);
    }

    /**
     * Start adding a required guard
     * @param {(GdprStorage|null)} [storage=null] The storage for the guard (by default it uses the group's storage)
     * @returns {GdprGuardBuilder}
     * @memberof GdprGroupBuilder
     */
    public startRequiredGuard(storage: GdprStorage|null): GdprGuardBuilder{
        return this.startGuard(storage).required();
    }

    /**
     * Add an enabled guard
     * @param {string} name The name of the guard
     * @param {string} [description=""] The description of the guard
     * @param {(GdprStorage|null)} [storage=null] The storage of the guard
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    public withEnabledGuard(name: string, description: string = "", storage: GdprStorage|null = null): GdprGroupBuilder{
        return this.startGuard(storage)
            .withName(name)
            .withDescription(description)
            .enabled()
        .endGuard();
    }

    /**
     * Add a disabled guard
     * @param {string} name The name of the guard
     * @param {string} [description=""] The description of the guard
     * @param {(GdprStorage|null)} [storage=null] The storage of the guard
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
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