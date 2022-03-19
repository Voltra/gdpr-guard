import { GdprGuard } from "./GdprGuard";
export interface GdprGuardCollection extends GdprGuard {
    hasGuard(name: string): boolean;
    getGuard(name: string): GdprGuard | null;
}
