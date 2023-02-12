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

export abstract class GdprSaviorAdapter implements GdprSavior {
	/**
	 * @inheritDoc
	 * @override
	 */
	public abstract restore(shouldUpdate?: boolean): Promise<GdprManager | null>;


	/**
	 * @inheritDoc
	 * @override
	 */
	public abstract store(manager: GdprManagerRaw): Promise<boolean>;


	/**
	 * @inheritDoc
	 * @override
	 */
	public abstract updateSharedManager(manager: GdprManager): Promise<void>;


	/**
	 * @inheritDoc
	 * @override
	 */
	public async exists(shouldUpdate: boolean = true): Promise<boolean> {
		const restored = await this.restore(shouldUpdate);
		return restored !== null;
	}


	/**
	 * @inheritDoc
	 * @override
	 */
	public async storeIfNotExists(manager: GdprManagerRaw): Promise<boolean> {
		const exists = await this.exists();
		return exists ? true : this.store(manager);
	}


	/**
	 * @inheritDoc
	 * @override
	 */
	public async restoreOrCreate(factory: GdprManagerFactory): Promise<GdprManager> {
		const restored = await this.restore();

		if (!restored) {
			const generated = await factory();
			this.updateSharedManager(generated);

			if (generated.bannerWasShown) {
				generated.closeBanner();
			}

			return generated;
		}

		if (restored.bannerWasShown) {
			restored.closeBanner();
		}

		return restored;
	}


	/**
	 * @inheritDoc
	 * @override
	 */
	public async check(): Promise<void> {
		await Promise.resolve();

		await this.exists(true);
	}
}
