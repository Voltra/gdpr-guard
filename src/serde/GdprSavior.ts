import { GdprManager, GdprManagerRaw } from "../GdprManager";

/**
 * Factory function for a GdprManager
 * @typedef GdprManagerFactory
 * @export
 */
type GdprManagerFactory = () => Promise<GdprManager>;

/**
 * Handle saving/restoring/checking semantics
 * @interface GdprSavior
 * @export
 */
interface GdprSavior {
	/**
	 * Restore the manager (saved state)
	 * @param shouldUpdate - Whether or not it should update its savior internals (should default to true)
	 */
	restore(shouldUpdate?: boolean): Promise<GdprManager | null>;

	/**
	 * Determine whether or not there is already an existing manager (saved state)
	 * @param shouldUpdate - Whether or not it should update its savior internals (should default to true)
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

abstract class GdprSaviorAdapter implements GdprSavior {
	public abstract restore(shouldUpdate?: boolean): Promise<GdprManager | null>;

	public abstract store(manager: GdprManagerRaw): Promise<boolean>;

	public abstract updateSharedManager(manager: GdprManager): Promise<void>;

	public async exists(shouldUpdate: boolean = true): Promise<boolean> {
		const restored = await this.restore(shouldUpdate);
		return restored !== null;
	}

	public async storeIfNotExists(manager: GdprManagerRaw): Promise<boolean> {
		const exists = await this.exists();
		return exists ? true : this.store(manager);
	}

	public async restoreOrCreate(factory: GdprManagerFactory): Promise<GdprManager> {
		const restored = await this.restore();

		if (!restored) {
			const generated = await factory();
			this.updateSharedManager(generated);
			return generated;
		}

		return restored;
	}

	public async check(): Promise<void> {
		await Promise.resolve();

		setTimeout(() => {
			this.exists(true);
		}, 100);
	}
}

export {
	GdprManagerFactory,
	GdprSavior,
	GdprSaviorAdapter,
}
