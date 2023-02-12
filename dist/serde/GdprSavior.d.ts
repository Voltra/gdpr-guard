import { GdprManager, GdprManagerRaw } from "../GdprManager";
/**
 * Factory function for a GdprManager
 * @typedef GdprManagerFactory
 * @export
 */
export type GdprManagerFactory = () => Promise<GdprManager>;
/**
 * Handle saving/restoring/checking semantics
 * @interface GdprSavior
 * @export
 */
export interface GdprSavior {
    /**
     * Restore the manager (saved state)
     * @param shouldUpdate - Whether it should update its savior internals (should default to true)
     */
    restore(shouldUpdate?: boolean): Promise<GdprManager | null>;
    /**
     * Determine whether there is already an existing manager (saved state)
     * @param shouldUpdate - Whether it should update its savior internals (should default to true)
     */
    exists(shouldUpdate?: boolean): Promise<boolean>;
    /**
     * Restore the manager or create one using the factory
     * @param factory - Factory to create a manager (default manager state)
     * @warning This should not store/save the manager before returning it
     */
    restoreOrCreate(factory: GdprManagerFactory): Promise<GdprManager>;
    /**
     * Overwrite the saved state of the manager
     * @param manager - The manager to store (state to save)
     */
    store(manager: GdprManagerRaw): Promise<boolean>;
    /**
     * Store the manager state if none is already save
     * @param manager - The manager to store (state to save)
     */
    storeIfNotExists(manager: GdprManagerRaw): Promise<boolean>;
    /**
     * Handle shared state updates
     * @param manager - The new manager to use
     */
    updateSharedManager(manager: GdprManager): Promise<void>;
    /**
     * Check if there is an existing manager state (should rely on GdprSavior#exists)
     */
    check(): Promise<void>;
}
export declare abstract class GdprSaviorAdapter implements GdprSavior {
    /**
     * @inheritDoc
     * @override
     */
    abstract restore(shouldUpdate?: boolean): Promise<GdprManager | null>;
    /**
     * @inheritDoc
     * @override
     */
    abstract store(manager: GdprManagerRaw): Promise<boolean>;
    /**
     * @inheritDoc
     * @override
     */
    abstract updateSharedManager(manager: GdprManager): Promise<void>;
    /**
     * @inheritDoc
     * @override
     */
    exists(shouldUpdate?: boolean): Promise<boolean>;
    /**
     * @inheritDoc
     * @override
     */
    storeIfNotExists(manager: GdprManagerRaw): Promise<boolean>;
    /**
     * @inheritDoc
     * @override
     */
    restoreOrCreate(factory: GdprManagerFactory): Promise<GdprManager>;
    /**
     * @inheritDoc
     * @override
     */
    check(): Promise<void>;
}
