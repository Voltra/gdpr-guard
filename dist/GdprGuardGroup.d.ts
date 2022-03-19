import { GdprGuard, GdprGuardRaw, GdprRawInto } from "./GdprGuard";
import { GdprStorage } from "./GdprStorage";
import { GdprGuardCollection } from "./GdprGuardCollection";
export interface GdprGuardGroupRaw extends GdprGuardRaw {
    guards: GdprGuardRaw[];
}
export declare class GdprGuardGroup implements GdprGuardCollection, GdprRawInto<GdprGuardGroupRaw> {
    name: string;
    description: string;
    enabled: boolean;
    required: boolean;
    readonly storage: GdprStorage;
    protected bindings: Map<string, GdprGuard>;
    constructor(name: string, description?: string, enabled?: boolean, required?: boolean);
    static for(name: string, description?: string, enabled?: boolean, required?: boolean): GdprGuardGroup;
    addGuard(guard: GdprGuard): GdprGuardGroup;
    hasGuard(name: string): boolean;
    getGuard(name: string): GdprGuard | null;
    isEnabled(name: string): boolean;
    enable(): GdprGuardGroup;
    disable(): GdprGuardGroup;
    toggle(): GdprGuardGroup;
    makeRequired(): GdprGuardGroup;
    enableForStorage(type: GdprStorage): GdprGuardGroup;
    disableForStorage(type: GdprStorage): GdprGuardGroup;
    toggleForStorage(type: GdprStorage): GdprGuardGroup;
    raw(): GdprGuardGroupRaw;
    protected doForEachGuard(cb: (guard: GdprGuard) => any): GdprGuardGroup;
    getGuards(): GdprGuard[];
}
