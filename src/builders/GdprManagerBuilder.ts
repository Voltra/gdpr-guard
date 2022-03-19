import { GdprGuardGroup } from "../GdprGuardGroup"
import { GdprStorage } from "../GdprStorage"
import { GdprManager } from "../GdprManager"
import { GdprGroupBuilder } from "./builders"

/**
 * Builder for a GdprManager
 * @class GdprManagerBuilder
 * @export
 */
class GdprManagerBuilder {
	public storage: GdprStorage = GdprStorage.Cookie;
	public groups: GdprGuardGroup[] = [];
	public bannerWasShown: boolean = false;

	/**
	 * Factory for a builder
	 * @static
	 * @returns {GdprManagerBuilder}
	 * @memberof GdprManagerBuilder
	 */
	public static make(): GdprManagerBuilder {
		return new GdprManagerBuilder();
	}

	withBannerShown(wasShown: boolean = true) {
		this.bannerWasShown = wasShown;
	}

	/**
	 * Start a new group
	 * @param {?GdprStorage} [storage] The storage type of the group
	 * @param {string} [name] The name of the group
	 * @param {string} [description] The description of the group
	 * @param {boolean} [enabled=true] Whether or not the group is enabled
	 * @returns {GdprGroupBuilder}
	 * @memberof GdprManagerBuilder
	 */
	startGroup(storage: GdprStorage | null = null, name: string = "", description: string = "", enabled: boolean = true): GdprGroupBuilder {
		return GdprGroupBuilder.create(this, name, description, storage, enabled, false);
	}

	/**
	 * Start a new group as required
	 * @param {?GdprStorage} [storage] The storage type of the group
	 * @param {string} [name] The name of the group
	 * @param {string} [description] The description of the group
	 * @returns {GdprGroupBuilder}
	 * @memberof GdprManagerBuilder
	 */
	startRequiredGroup(storage: GdprStorage | null = null, name: string = "", description: string = "") {
		return this.startEnabledGroup(storage, name, description).required();
	}

	/**
	 * Start a new enabled group
	 * @param {?GdprStorage} [storage] The storage type of the group
	 * @param {string} [name] The name of the group
	 * @param {string} [description] The description of the group
	 * @returns {GdprGroupBuilder}
	 * @memberof GdprManagerBuilder
	 */
	startEnabledGroup(storage: GdprStorage | null = null, name: string = "", description: string = ""): GdprGroupBuilder {
		return this.startGroup(storage, name, description, true).enabled();
	}

	/**
	 * Start a new disabled group
	 * @param {?GdprStorage} [storage] The storage type of the group
	 * @param {string} [name] The name of the group
	 * @param {string} [description] The description of the group
	 * @returns {GdprGroupBuilder}
	 * @memberof GdprManagerBuilder
	 */
	startDisabledGroup(storage: GdprStorage | null = null, name: string = "", description: string = ""): GdprGroupBuilder {
		return this.startGroup(storage, name, description, false).disabled();
	}

	/**
	 * Build the manager from the current builder state
	 * @returns {GdprManager}
	 * @memberof GdprManagerBuilder
	 */
	build(): GdprManager {
		const manager = GdprManager.create(this.groups);
		manager.bannerWasShown = this.bannerWasShown;
		return manager;
	}

	/**
	 * End this group's creation (no-op for manager builders)
	 * @returns {GdprManagerBuilder}
	 * @memberof GdprManagerBuilder
	 */
	endGroup(): GdprManagerBuilder {
		return this;
	}
}

export {
	GdprManagerBuilder,
}
