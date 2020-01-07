import { GdprGroupBuilder } from "./builders"
import { GdprStorage } from "../GdprStorage"
import { makeGuard } from "../GdprGuard";

/**
 * Builder for a gdpr guard
 * @class GdprGuardBuilder
 * @export
 */
class GdprGuardBuilder{
    protected name: string = "";
    protected description: string = "";

    /**
     * Creates an instance of GdprGuardBuilder.
     * @ignore
     * @protected
     * @param {GdprGroupBuilder} parent
     * @param {GdprStorage} storage
     * @param {boolean} enable
     * @param {boolean} require
     * @memberof GdprGuardBuilder
     */
    protected constructor(
        protected parent: GdprGroupBuilder,
        protected storage: GdprStorage,
        protected enable: boolean,
        protected require: boolean,
    ){
        if(require)
            this.enable = true;
    }

    /**
     * Factory for creating a guard builder
     * @static
     * @param {GdprGroupBuilder} gb The parent group builder
     * @param {GdprStorage} [storage=GdprStorage.Cookie] The guard's storage
     * @param {boolean} [enabled=false] Whether or not the guard should be enabled
     * @param {boolean} [required=false] Whether or not the guard should be required
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    static create(gb: GdprGroupBuilder, storage: GdprStorage = GdprStorage.Cookie, enabled: boolean = false, required: boolean = false): GdprGuardBuilder{
        return new GdprGuardBuilder(gb, storage, enabled, required);
    }

    /**
     * End the guard creation with the current builder state
     * @returns {GdprGroupBuilder}
     * @memberof GdprGuardBuilder
     */
    endGuard(): GdprGroupBuilder{
        const enable = this.require || this.enable;
        const guard = makeGuard(this.name, this.description, this.storage, this.require, enable);

        if(this.require)
            guard.makeRequired();

        this.parent.guards.push(guard);
        return this.parent;
    }

    /**
     * Edit the builder's state
     * @ignore
     * @protected
     * @param {(builder: GdprGuardBuilder) => any} edit
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    protected edit(edit: (builder: GdprGuardBuilder) => any): GdprGuardBuilder{
        edit(this);
        return this;
    }

    /**
     * Set the name of the guard
     * @param {string} name The new name for the guard
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    withName(name: string): GdprGuardBuilder{
        return this.edit(b => b.name = name);
    }

    /**
     * Set the description of the guard
     * @param {string} description The new description for the guard
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    withDescription(description: string): GdprGuardBuilder{
        return this.edit(b => b.description = description);
    }

    /**
     * Mark as enabled
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    enabled(): GdprGuardBuilder{
        return this.edit(b => b.enable = true);
    }

    /**
     * Mark as disabled
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    disabled(): GdprGuardBuilder{
        return this.edit(b => b.enable = false);
    }

    /**
     * Set the storage of the guard
     * @param {GdprStorage} storage The new storage for the guard
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    storedIn(storage: GdprStorage): GdprGuardBuilder{
        return this.edit(b => b.storage = storage);
    }

    /**
     * Mark as required
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    required(): GdprGuardBuilder{
        return this.edit(b => b.require = true);
    }
}

export {
    GdprGuardBuilder,
}