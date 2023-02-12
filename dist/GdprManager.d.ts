import { GdprGuard, GdprGuardRaw, GdprRawInto } from "./GdprGuard";
import { GdprGuardGroup, GdprGuardGroupRaw } from "./GdprGuardGroup";
import { GdprGuardCollection } from "./GdprGuardCollection";
import { GdprStorage } from "./GdprStorage";
import { GdprManagerEventHub } from "./GdprManagerEventHub";
/**
 * Raw representation of a guard manager
 */
export interface GdprManagerRaw extends GdprGuardRaw {
    bannerWasShown: boolean;
    enabled: boolean;
    groups: GdprGuardGroupRaw[];
}
/**
 * Manage multiple guard groups
 */
export declare class GdprManager implements GdprGuardCollection, GdprRawInto<GdprManagerRaw> {
    /**
     * Whether the banner has already been shown to the user
     */
    bannerWasShown: boolean;
    /**
     * Whether the whole manager is enabled
     */
    enabled: boolean;
    /**
     * A hub to attach listeners to events triggered by this manager
     */
    readonly events: GdprManagerEventHub;
    /**
     * A mapping from group name to the corresponding group
     * @protected
     */
    protected groups: Map<string, GdprGuardGroup>;
    readonly name: string;
    readonly description: string;
    readonly storage: GdprStorage;
    required: boolean;
    /**
     * Creates an instance of GdprManager.
     * @memberof GdprManager
     * @ignore
     */
    protected constructor();
    /**
     * Factory for creating a gdpr manager
     * @static
     * @param {GdprGuardGroup[]} [groups=[]] The initial guard groups
     * @returns {GdprManager}
     * @memberof GdprManager
     */
    static create(groups?: GdprGuardGroup[]): GdprManager;
    /**
     * Mark the GDPR banner as shown and trigger enable and disable events
     */
    closeBanner(): void;
    /**
     * Reset the state of the GDPR banner and show it
     */
    resetAndShowBanner(): void;
    /**
     * Create and add a group to this manager
     * @param {string} name The new group's name
     * @param {string} [description] The new group's description
     * @returns {GdprManager}
     * @memberof GdprManager
     */
    createGroup(name: string, description?: string): GdprManager;
    /**
     * Add a group to this manager
     * @param {GdprGuardGroup} category The group to add
     * @returns {GdprManager}
     * @memberof GdprManager
     */
    addGroup(category: GdprGuardGroup): GdprManager;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprManager
     */
    hasGuard(name: string): boolean;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprManager
     */
    getGuard(name: string): GdprGuard | null;
    /**
     * @inheritDoc
     * @memberof GdprManager
     */
    hasGroup(name: string): boolean;
    /**
     * @inheritDoc
     * @memberof GdprManager
     */
    getGroup(name: string): GdprGuardGroup | null;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprManager
     */
    isEnabled(name: string): boolean;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprManager
     */
    enable(): GdprGuard;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprManager
     */
    disable(): GdprGuard;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprManager
     */
    toggle(): GdprGuard;
    /**
     * Does nothing for a manager
     * @inheritDoc
     * @override
     * @memberof GdprManager
     */
    makeRequired(): GdprGuard;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprManager
     */
    enableForStorage(type: GdprStorage): GdprGuard;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprManager
     */
    disableForStorage(type: GdprStorage): GdprGuard;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprManager
     */
    toggleForStorage(type: GdprStorage): GdprGuard;
    /**
     * @inheritDoc
     * @override
     * @memberof GdprManager
     * @returns {GdprManagerRaw}
     */
    raw(): GdprManagerRaw;
    /**
     * Shortcircuit on predicate
     * @ignore
     * @protected
     * @param pred
     * @memberof GdprManager
     */
    protected reduceGroupsPred(pred: (group: GdprGuardGroup) => boolean): boolean;
    /**
     * Execute a callback on each group of this guard
     * @ignore
     * @protected
     * @param cb
     * @memberof GdprManager
     */
    protected forEachGroup(cb: (group: GdprGuardGroup) => any): GdprManager;
    getGroups(): GdprGuardGroup[];
}
