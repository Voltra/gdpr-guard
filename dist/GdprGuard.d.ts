import { GdprStorage } from "./GdprStorage";
interface GdprGuard {
    readonly name: string;
    enabled: boolean;
    readonly description: string;
    readonly storage: GdprStorage;
    isEnabled(name: string): boolean;
    enable(): GdprGuard;
    disable(): GdprGuard;
    toggle(): GdprGuard;
    enableForStorage(type: GdprStorage): GdprGuard;
    disableForStorage(type: GdprStorage): GdprGuard;
    toggleForStorage(type: GdprStorage): GdprGuard;
    raw(): object;
}
interface GdprGuardRaw {
    name: string;
    enabled: boolean;
    description: string;
    storage: GdprStorage;
}
declare function makeGuard(name: string, description: string, storage?: GdprStorage, enabled?: boolean): GdprGuard;
export { GdprGuard, GdprGuardRaw, makeGuard, };
