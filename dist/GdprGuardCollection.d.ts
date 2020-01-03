import { GdprGuard } from "./GdprGuard";
interface GdprGuardCollection extends GdprGuard {
    hasGuard(name: string): boolean;
    getGuard(name: string): GdprGuard | null;
}
export { GdprGuardCollection, };
