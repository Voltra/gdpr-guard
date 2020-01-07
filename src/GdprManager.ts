import { GdprGuard, GdprGuardRaw } from "./GdprGuard"
import { GdprGuardGroup, GdprGuardGroupRaw } from "./GdprGuardGroup";
import { GdprGuardCollection } from "./GdprGuardCollection"
import { GdprStorage } from "./GdprStorage";

/**
 * Raw representation of a guard manager
 * @interface GdprManagerRaw
 * @export
 */
interface GdprManagerRaw{
    enabled: boolean,
    groups: GdprGuardGroupRaw[],
}


/**
 * Manage multiple guard groups
 * @class GdprManager
 * @implements {GdprGuardCollection}
 * @export
 */
class GdprManager implements GdprGuardCollection{
    protected groups: Map<string, GdprGuardGroup> = new Map();
    readonly name: string = "manager";
    readonly description: string = "Manager of GDPR guard groups";
    enabled: boolean = true;
    readonly storage: GdprStorage = GdprStorage.None;
    required: boolean = false;

    static fromRaw(raw: object): GdprManager|null {
        const allKeys = ["enabled", "storage", "groups"].every(key => key in raw);
        const fail = !allKeys
        || typeof raw.enabled != "boolean"
        || !Array.isArray(raw.groups);

        //TODO: deserialize everything

        if(fail)
            return null;

        const manager = this.create(groups);
        manager.enabled = !!raw.enabled;
    }

    /**
     * Creates an instance of GdprManager.
     * @memberof GdprManager
     * @ignore
     */
    protected constructor(){
    }

    /**
     * Factory for creating a gdpr manager
     * @static
     * @param {GdprGuardGroup[]} [groups=[]] The initial guard groups
     * @returns {GdprManager}
     * @memberof GdprManager
     */
    public static create(groups: GdprGuardGroup[] = []): GdprManager{
        const manager = new GdprManager();
        groups.forEach(group => manager.addGroup(group));
        return manager;
    }

    /**
     * Create and add a group to this manager
     * @param {string} name The new group's name
     * @param {string} [description=""] The new group's description
     * @returns {GdprManager}
     * @memberof GdprManager
     */
    createGroup(name: string, description: string = ""): GdprManager{
        return this.addGroup(GdprGuardGroup.for(name, description));
    }


    /**
     * Add a group to this manager
     * @param {GdprGuardGroup} category The group to add
     * @returns {GdprManager}
     * @memberof GdprManager
     */
    addGroup(category: GdprGuardGroup): GdprManager{
        this.groups.set(category.name, category);
        return this;
    }

    /**
     * Shortcircuit on predicate
     * @ignore
     * @protected
     * @param {(group: GdprGuardCollection) => boolean} pred
     * @returns {boolean}
     * @memberof GdprManager
     */
    protected reduceGroupsPred(pred: (group: GdprGuardCollection) => boolean): boolean{
        for(const [_, group] of this.groups){
            if(pred(group))
                return true;
        }
        return false;
    }

    /**
     * Execute a callback on each group of this guard
     * @ignore
     * @protected
     * @param {(group: GdprGuardCollection) => any} cb
     * @returns {GdprManager}
     * @memberof GdprManager
     */
    protected forEachGroup(cb: (group: GdprGuardCollection) => any): GdprManager{
        this.groups.forEach(group => cb(group));
        return this;
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     */
    hasGuard(name: string): boolean {
        return this.reduceGroupsPred(group => group.hasGuard(name));
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     */
    getGuard(name: string): GdprGuard | null {
        for(const [_, group] of this.groups){
            if(group.hasGuard(name))
                return group.getGuard(name);
        }
        return null;
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     */
    hasGroup(name: string): boolean {
        return this.reduceGroupsPred(group => group.name === name);
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     */
    getGroup(name: string): GdprGuardGroup | null {
        for(const [n, group] of this.groups){
            if(n === name)
                return group;
        }
        return null;
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     */
    isEnabled(name: string): boolean {
        return this.reduceGroupsPred(group => group.isEnabled(name));
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     * @returns {GdprManager}
     */
    enable(): GdprManager {
        this.enabled = true;
        return this.forEachGroup(group => group.enable());
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     * @returns {GdprManager}
     */
    disable(): GdprManager {
        this.enabled = false;
        return this.forEachGroup(group => group.disable());
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     * @returns {GdprManager}
     */
    toggle(): GdprManager {
        return this.enabled ? this.disable() : this.enable();
    }

    /**
     * Does nothing for a manager
     * @inheritdoc
     * @memberof GdprManager
     * @returns {GdprManager}
     */
    makeRequired(): GdprManager{
        // noop
        return this;
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     * @returns {GdprManager}
     */
    enableForStorage(type: GdprStorage): GdprManager {
        return this.forEachGroup(group => group.enableForStorage(type));
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     * @returns {GdprManager}
     */
    disableForStorage(type: GdprStorage): GdprManager {
        return this.forEachGroup(group => group.disableForStorage(type));
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     * @returns {GdprManager}
     */
    toggleForStorage(type: GdprStorage): GdprManager {
        return this.forEachGroup(group => group.toggleForStorage(type));
    }

    /**
     * @inheritdoc
     * @memberof GdprManager
     * @returns {GdprManagerRaw}
     */
    raw(): GdprManagerRaw{
        const ret: GdprManagerRaw = {
            enabled: this.enabled,
            groups: [],
        };

        ret.groups = [...this.groups].map(([_, group]) => group.raw());

        return ret;
    }
}

export {
    GdprManager,
    GdprManagerRaw,
}