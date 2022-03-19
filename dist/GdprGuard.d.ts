import { GdprStorage } from "./GdprStorage";
export interface GdprRawInto<RawRepr> {
    raw(): RawRepr | object;
}
export interface GdprGuardRaw {
    name: string;
    enabled: boolean;
    required: boolean;
    description: string;
    storage: GdprStorage;
}
export interface GdprGuard extends GdprRawInto<GdprGuardRaw> {
    readonly name: string;
    enabled: boolean;
    readonly description: string;
    readonly storage: GdprStorage;
    required: boolean;
    isEnabled(name: string): boolean;
    enable(): GdprGuard;
    disable(): GdprGuard;
    toggle(): GdprGuard;
    makeRequired(): GdprGuard;
    enableForStorage(type: GdprStorage): GdprGuard;
    disableForStorage(type: GdprStorage): GdprGuard;
    toggleForStorage(type: GdprStorage): GdprGuard;
    raw(): object | GdprGuardRaw;
}
export declare function makeGuard(name: string, description: string, storage?: GdprStorage, required?: boolean, enabled?: boolean | null): GdprGuard;
