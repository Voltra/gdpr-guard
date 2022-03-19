import { GdprGuard } from "./GdprGuard";
import { GdprManager } from "./GdprManager";
import { GdprGuardGroup } from "./GdprGuardGroup";
export interface GdprVisitor {
    onManager(manager: GdprManager): void;
    onGroup(group: GdprGuardGroup): void;
    onGuard(guard: GdprGuard): void;
    onEach(guard: GdprGuard): void;
}
export declare const visitGdpr: (guard: GdprGuard, { onManager, onGroup, onGuard, onEach, }?: Partial<GdprVisitor>) => void;
