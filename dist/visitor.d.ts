import { GdprGuard } from "./GdprGuard";
import { GdprManager } from "./GdprManager";
import { GdprGuardGroup } from "./GdprGuardGroup";
export interface GdprVisitor {
    /**
     * Callback for when you reach a manager in the tree
     * @param manager The manager currently being visited
     */
    onManager(manager: GdprManager): void;
    /**
     * Callback for when you reach a group in the tree
     * @param group The group currently being visited
     */
    onGroup(group: GdprGuardGroup): void;
    /**
     * Callback for when you reach a (leaf) guard in the tree
     * @param guard The group currently being visited
     */
    onGuard(guard: GdprGuard): void;
    /**
     * Callback called on each item
     * @param guard The guard currently being visited
     */
    onEach(guard: GdprGuard | GdprManager): void;
}
/**
 * Visit the GDPR structure
 * @param guard The root of the GDPR structure to visit
 * @param {Partial<GdprVisitor>} visitor
 */
export declare const visitGdpr: (guard: GdprGuard | GdprManager, { onManager, onGroup, onGuard, onEach, }?: Partial<GdprVisitor>) => void;
