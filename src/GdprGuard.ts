import { GdprStorage } from "./GdprStorage"

export interface GdprRawInto<RawRepr> {
	/**
	 * Raw/simple representation of this guard
	 */
	raw(): RawRepr;
}

/**
 * Raw representation of a guard
 */
export interface GdprGuardRaw {
	name: string,
	enabled: boolean,
	required: boolean,
	description: string,
	storage: GdprStorage,
}

/**
 * Generic type representing a guard
 */
export interface GdprGuard extends GdprRawInto<GdprGuardRaw> {
	/**
	 * Unique name of this guard
	 */
	readonly name: string;

	/**
	 * Whether the guard is currently enabled
	 */
	enabled: boolean;

	/**
	 * A description of what this guard does
	 */
	readonly description: string;

	/**
	 * Where this guard is stored
	 */
	readonly storage: GdprStorage;

	/**
	 * Whether this guard is required
	 */
	required: boolean;

	/**
	 * Determine whether or not a guard is enabled
	 * @param name The name of the guard to look for
	 * @memberof GdprGuard
	 */
	isEnabled(name: string): boolean;

	/**
	 * Enable this guard
	 * @returns this guard
	 * @memberof GdprGuard
	 */
	enable(): GdprGuard;

	/**
	 * Disable this guard
	 * @returns this guard
	 * @memberof GdprGuard
	 */
	disable(): GdprGuard;

	/**
	 * Toggle the enabled state of this guard
	 * @returns this guard
	 * @memberof GdprGuard
	 */
	toggle(): GdprGuard;

	/**
	 * Make this guard required
	 * @returns this guard
	 * @memberof GdprGuard
	 */
	makeRequired(): GdprGuard;

	/**
	 * Enable guards of the given type (this guard and sub-guards)
	 * @param type The storage type to enable all guards for
	 * @returns this guard
	 * @memberof GdprGuard
	 */
	enableForStorage(type: GdprStorage): GdprGuard;

	/**
	 * Disable guards of the given type (this guard and sub-guards)
	 * @param type The storage type to enable all guards for
	 * @returns this guard
	 * @memberof GdprGuard
	 */
	disableForStorage(type: GdprStorage): GdprGuard;

	/**
	 * Toggle guards of the given type (this guard and sub-guards)
	 * @param type The storage type to enable all guards for
	 * @returns this guard
	 * @memberof GdprGuard
	 */
	toggleForStorage(type: GdprStorage): GdprGuard;
}

/**
 * Factory for creating a guard
 * @param name The unique name/identifier for this guard
 * @param description The description of the guard
 * @param storage Where the data will be stored
 * @param required Whether or not it is a required guard
 * @param enabled Whether or not it is currently enabled
 */
export function makeGuard(name: string, description: string, storage: GdprStorage = GdprStorage.Cookie, required: boolean = false, enabled: boolean | null = null): GdprGuard {
	return {
		name,
		description,
		storage,
		required,
		enabled: enabled === null ? required : enabled,
		enable() {
			if (!this.enabled)
				this.toggle();

			return this;
		},
		disable() {
			if (this.enabled)
				this.toggle();

			return this;
		},
		toggle() {
			if (!this.required)
				this.enabled = !this.enabled;
			return this;
		},
		makeRequired() {
			this.required = true;
			this.enabled = true;
			return this;
		},
		isEnabled(name) {
			return this.name === name && this.enabled;
		},
		enableForStorage(type) {
			if (!this.enabled)
				this.toggleForStorage(type);
			return this;
		},
		disableForStorage(type) {
			if (this.enabled)
				this.toggleForStorage(type);
			return this;
		},
		toggleForStorage(type) {
			if (!this.required && (this.storage & type))
				this.toggle();
			return this;
		},
		raw(): GdprGuardRaw {
			return JSON.parse(JSON.stringify(this));
		}
	};
}
