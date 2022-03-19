import { GdprGuard, GdprRawInto } from "./GdprGuard";
import { GdprGuardGroup, GdprGuardGroupRaw } from "./GdprGuardGroup";
import { GdprGuardCollection } from "./GdprGuardCollection";
import { GdprStorage } from "./GdprStorage";
import { GdprManagerEventHub } from "./GdprManagerEventHub";
export interface GdprManagerRaw {
    bannerWasShown: boolean;
    enabled: boolean;
    groups: GdprGuardGroupRaw[];
}
export declare class GdprManager implements GdprGuardCollection, GdprRawInto<GdprManagerRaw> {
    bannerWasShown: boolean;
    enabled: boolean;
    events: GdprManagerEventHub;
    protected groups: Map<string, GdprGuardGroup>;
    readonly name: string;
    readonly description: string;
    readonly storage: GdprStorage;
    required: boolean;
    protected constructor();
    static create(groups?: GdprGuardGroup[]): GdprManager;
    closeBanner(): void;
    resetAndShowBanner(): void;
    createGroup(name: string, description?: string): GdprManager;
    addGroup(category: GdprGuardGroup): GdprManager;
    hasGuard(name: string): boolean;
    getGuard(name: string): GdprGuard | null;
    hasGroup(name: string): boolean;
    getGroup(name: string): GdprGuardGroup | null;
    isEnabled(name: string): boolean;
    enable(): GdprManager;
    disable(): GdprManager;
    toggle(): GdprManager;
    makeRequired(): GdprManager;
    enableForStorage(type: GdprStorage): GdprManager;
    disableForStorage(type: GdprStorage): GdprManager;
    toggleForStorage(type: GdprStorage): GdprManager;
    raw(): GdprManagerRaw;
    protected reduceGroupsPred(pred: (group: GdprGuardCollection) => boolean): boolean;
    protected forEachGroup(cb: (group: GdprGuardCollection) => any): GdprManager;
    getGroups(): GdprGuardGroup[];
}
