import { GdprGuard, GdprGuardRaw } from "./GdprGuard"
import { GdprStorage } from "./GdprStorage"
import { GdprGuardCollection } from "./GdprGuardCollection"

/**
 * Raw representation of a guard group
 * @interface GdprGuardGroupRaw
 * @extends {GdprGuardRaw}
 * @export
 */
interface GdprGuardGroupRaw extends GdprGuardRaw{
    guards: GdprGuardRaw[],
}

/**
 * A group of guards
 * @class GdprGuardGroup
 * @implements {GdprGuardCollection}
 * @export
 */
class GdprGuardGroup implements GdprGuardCollection {
    protected bindings: Map<string, GdprGuard> = new Map();
    public readonly storage: GdprStorage = GdprStorage.None;

    /**
     * Creates an instance of GdprGuardGroup.
     * @ignore
     * @param {string} name
     * @param {string} [description=""]
     * @param {boolean} [enabled=false]
     * @param {boolean} [required=false]
     * @memberof GdprGuardGroup
     */
    constructor(public name: string, public description: string = "", public enabled: boolean = false, public required: boolean = false){
        if(this.required)
            this.enabled = true;
    }

    /**
     * Factory for creating a groupe
     * @static
     * @param {string} name The name of the group
     * @param {string} [description=""] The description of the group
     * @param {boolean} [enabled=false] Whether or not the group is enabled by default
     * @param {boolean} [required=false] Whether or not the entire group is required
     * @returns {GdprGuardGroup}
     * @memberof GdprGuardGroup
     */
    static for(name: string, description: string = "", enabled: boolean = false, required: boolean = false): GdprGuardGroup{
        return new GdprGuardGroup(name, description, enabled, required);
    }

    /**
     * Add a guard to this group
     * @param {GdprGuard} guard
     * @returns {GdprGuardGroup}
     * @memberof GdprGuardGroup
     */
    addGuard(guard: GdprGuard): GdprGuardGroup{
        this.bindings.set(guard.name, guard);
        return this;
    }

    /**
     * @inheritdoc
     * @memberof GdprGuardGroup
     */
    hasGuard(name: string): boolean{
        return this.name === name || this.bindings.has(name);
    }

    /**
     * @inheritdoc
     * @memberof GdprGuardGroup
     */
    getGuard(name: string): GdprGuard | null{
        if(this.name === name)
            return this;

        return this.bindings.get(name) || null;
    }

    /**
     * Execute a callback on each guard of this group
     * @ignore
     * @protected
     * @param {(guard: GdprGuard) => any} cb
     * @returns {GdprGuardGroup}
     * @memberof GdprGuardGroup
     */
    protected doForEachGuard(cb: (guard: GdprGuard) => any): GdprGuardGroup{
        this.bindings.forEach(guard => cb(guard));
        return this;
    }

    /**
     * @inheritdoc
     * @memberof GdprGuardGroup
     */
    isEnabled(name: string): boolean{
        if(this.hasGuard(name)){
            const guard = this.getGuard(name);
            if(guard !== null){
                return (<GdprGuard>guard).enabled;
            }
        }

        for(const [_, guard] of this.bindings){
            if(guard.isEnabled(name))
                return true;
        }

        return false;
    }

    /**
     * @inheritdoc
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroup}
     */
    enable(): GdprGuardGroup{
        //TODO: Enable this group
        return this.doForEachGuard(guard => guard.enable());
    }

    /**
     * @inheritdoc
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroup}
     */
    disable(): GdprGuardGroup{
        //TODO: Disable this group
        return this.doForEachGuard(guard => guard.disable());
    }

    /**
     * @inheritdoc
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroup}
     */
    toggle(): GdprGuardGroup{
        return this.enabled ? this.disable() : this.enable();
    }

    /**
     * @inheritdoc
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroup}
     */
    makeRequired(): GdprGuardGroup{
        this.required = true;
        this.enabled = true;
        return this.doForEachGuard(guard => guard.makeRequired());
    }

    /**
     * @inheritdoc
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroup}
     */
    enableForStorage(type: GdprStorage): GdprGuardGroup{
        return this.doForEachGuard(guard => {
            if(guard.storage & type)
                guard.enable();
        });
    }

    /**
     * @inheritdoc
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroup}
     */
    disableForStorage(type: GdprStorage): GdprGuardGroup{
        return this.doForEachGuard(guard => {
            if(guard.storage & type)
                guard.disable();
        });
    }

    /**
     * @inheritdoc
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroup}
     */
    toggleForStorage(type: GdprStorage): GdprGuardGroup{
        return this.doForEachGuard(guard => {
            if(guard.storage & type)
                return guard.toggle();
        });
    }

    /**
     * @inheritdoc
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroupRaw}
     */
    raw(): GdprGuardGroupRaw{
        const ret: GdprGuardGroupRaw = {
            name: this.name,
            description: this.description,
            enabled: this.enabled,
            required: this.required,
            storage: this.storage,
            guards: [],
        };

        ret.guards = [...this.bindings].map(([_, guard]) => guard.raw() as GdprGuardRaw);

        return ret;
    }
}

export {
    GdprGuardGroup,
    GdprGuardGroupRaw,
}