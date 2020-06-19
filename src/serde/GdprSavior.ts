import { GdprManager } from "../GdprManager";

/**
 * Factory function for a GdprManager
 * @typedef GdprManagerFactory
 * @export
 */
type GdprManagerFactory = () => GdprManager;

/**
 * Handle saving/restoring/checking semantics
 * @interface GdprSavior
 * @export
 */
interface GdprSavior{
	/**
	 * Restore the manager (saved state)
	 * @param shouldUpdate - Whether or not it should update its savior internals
	 */
	restore(shouldUpdate?: boolean): Promise<GdprManager|null>;

	/**
	 * Determine whether or not there is already an existing manager (saved state)
	 * @param shouldUpdate - Whether or not it should update its savior internals
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
	store(manager: GdprManager): Promise<boolean>;

	/**
	 * Store the manager state if none is already save
	 * @param manager - The manager to store (state to save)
	 */
	storeIfNotExists(manager: GdprManager): Promise<boolean>;
}

export {
	GdprManagerFactory,
	GdprSavior,
}