import { GdprGuard } from "./GdprGuard";
import { GdprGuardGroup, GdprGuardGroupRaw } from "./GdprGuardGroup";
import { GdprGuardCollection } from "./GdprGuardCollection";
import { GdprStorage } from "./GdprStorage";
interface GdprManagerRaw {
    enabled: boolean;
    groups: GdprGuardGroupRaw[];
}
declare class GdprManager implements GdprGuardCollection {
    protected groups: Map<string, GdprGuardGroup>;
    readonly name: string;
    readonly description: string;
    enabled: boolean;
    readonly storage: GdprStorage;
    required: boolean;
    protected constructor();
    static create(groups?: GdprGuardGroup[]): GdprManager;
    createGroup(name: string, description?: string): GdprManager;
    addGroup(category: GdprGuardGroup): GdprManager;
    protected reduceGroupsPred(pred: (group: GdprGuardCollection) => boolean): boolean;
    protected forEachGroup(cb: (group: GdprGuardCollection) => any): GdprManager;
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
}
export { GdprManager, GdprManagerRaw, };
