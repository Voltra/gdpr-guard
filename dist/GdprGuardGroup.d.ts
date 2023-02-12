import { GdprGuard, GdprGuardRaw, GdprRawInto } from "./GdprGuard";
import { GdprStorage } from "./GdprStorage";
import { GdprGuardCollection } from "./GdprGuardCollection";
/**
 * Raw representation of a guard group
 */
export interface GdprGuardGroupRaw extends GdprGuardRaw {
    guards: GdprGuardRaw[];
}
/**
 * A group of guards
 */
export declare class GdprGuardGroup implements GdprGuardCollection, GdprRawInto<GdprGuardGroupRaw> {
    name: string;
    description: string;
    enabled: boolean;
    required: boolean;
    readonly storage: GdprStorage;
    /**
     * Binding from guard name to guard
     * @protected
     */
    protected bindings: Map<string, GdprGuard>;
    /**
     * Creates an instance of GdprGuardGroup.
     * @ignore
     * @param name
     * @param [description]
     * @param [enabled]
     * @param [required]
     * @memberof GdprGuardGroup
     */
    constructor(name: string, description?: string, enabled?: boolean, required?: boolean);
    /**
     * Factory for creating a groupe
     * @static
     * @param name The name of the group
     * @param [description] The description of the group
     * @param [enabled=false] Whether or not the group is enabled by default
     * @param [required=false] Whether or not the entire group is required
     * @returns {GdprGuardGroup}
     * @memberof GdprGuardGroup
     */
    static for(name: string, description?: string, enabled?: boolean, required?: boolean): GdprGuardGroup;
    /**
     * Add a guard to this group
     * @param {GdprGuard} guard
     * @returns {GdprGuardGroup}
     * @memberof GdprGuardGroup
     */
    addGuard(guard: GdprGuard): GdprGuardGroup;
    /**
     * @inheritDoc
     * @memberof GdprGuardGroup
     */
    hasGuard(name: string): boolean;
    /**
     * @inheritDoc
     * @memberof GdprGuardGroup
     */
    getGuard(name: string): GdprGuard | null;
    /**
     * @inheritDoc
     * @memberof GdprGuardGroup
     */
    isEnabled(name: string): boolean;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroup}
     */
    enable(): GdprGuardGroup;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroup}
     */
    disable(): GdprGuardGroup;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroup}
     */
    toggle(): GdprGuardGroup;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprGuardGroup
     * @returns {GdprGuardGroup}
     */
    makeRequired(): GdprGuardGroup;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprGuardGroup
     */
    enableForStorage(type: GdprStorage): GdprGuardGroup;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprGuardGroup
     */
    disableForStorage(type: GdprStorage): GdprGuardGroup;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprGuardGroup
     */
    toggleForStorage(type: GdprStorage): GdprGuardGroup;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprGuardGroup
     */
    raw(): GdprGuardGroupRaw;
    /**
     * Execute a callback on each guard of this group
     * @ignore
     * @protected
     * @param cb
     * @memberof GdprGuardGroup
     */
    protected doForEachGuard(cb: (guard: GdprGuard) => any): GdprGuardGroup;
    /**
     * Shortcircuit on predicate
     * @ignore
     * @protected
     * @param {(group: GdprGuardCollection) => boolean} pred
     * @returns {boolean}
     * @memberof GdprManager
     */
    protected reduceSubGroupsPred(pred: (guard: GdprGuardGroup) => boolean): boolean;
    /**
     * Shortcircuit on finding a matching guard
     * @ignore
     * @protected
     * @param extractor
     * @memberof GdprManager
     */
    protected reduceSubGroups(extractor: (guard: GdprGuardCollection & GdprGuard) => GdprGuard | null): GdprGuard | null;
    getGuards(): GdprGuard[];
}
