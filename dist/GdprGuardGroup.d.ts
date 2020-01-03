import { GdprGuard, GdprGuardRaw } from "./GdprGuard";
import { GdprStorage } from "./GdprStorage";
import { GdprGuardCollection } from "./GdprGuardCollection";
interface GdprGuardGroupRaw extends GdprGuardRaw {
    guards: GdprGuardRaw[];
}
declare class GdprGuardGroup implements GdprGuardCollection {
    name: string;
    description: string;
    enabled: boolean;
    required: boolean;
    protected bindings: Map<string, GdprGuard>;
    readonly storage: GdprStorage;
    constructor(name: string, description?: string, enabled?: boolean, required?: boolean);
    static for(name: string, description?: string, enabled?: boolean, required?: boolean): GdprGuardGroup;
    addGuard(guard: GdprGuard): GdprGuardGroup;
    hasGuard(name: string): boolean;
    getGuard(name: string): GdprGuard | null;
    protected doForEachGuard(cb: (guard: GdprGuard) => any): GdprGuardGroup;
    isEnabled(name: string): boolean;
    enable(): GdprGuardGroup;
    disable(): GdprGuardGroup;
    toggle(): GdprGuardGroup;
    makeRequired(): GdprGuardGroup;
    enableForStorage(type: GdprStorage): GdprGuardGroup;
    disableForStorage(type: GdprStorage): GdprGuardGroup;
    toggleForStorage(type: GdprStorage): GdprGuardGroup;
    raw(): GdprGuardGroupRaw;
}
export { GdprGuardGroup, GdprGuardGroupRaw, };
