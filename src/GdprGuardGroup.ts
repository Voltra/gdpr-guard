import { GdprGuard, GdprGuardRaw, GdprRawInto } from "./GdprGuard";
import { GdprStorage } from "./GdprStorage";
import { GdprGuardCollection } from "./GdprGuardCollection";

/**
 * Raw representation of a guard group
 */
export interface GdprGuardGroupRaw extends GdprGuardRaw {
	guards: GdprGuardRaw[],
}

/**
 * A group of guards
 */
export class GdprGuardGroup implements GdprGuardCollection, GdprRawInto<GdprGuardGroupRaw> {
	public readonly storage: GdprStorage = GdprStorage.None;

	/**
	 * Binding from guard name to guard
	 * @protected
	 */
	protected bindings: Map<string, GdprGuard> = new Map();

	/**
	 * Creates an instance of GdprGuardGroup.
	 * @ignore
	 * @param name
	 * @param [description]
	 * @param [enabled]
	 * @param [required]
	 * @memberof GdprGuardGroup
	 */
	constructor(public name: string, public description: string = "", public enabled: boolean = false, public required: boolean = false) {
		if (this.required)
			this.enabled = true;
	}

	/**
	 * Factory for creating a groupe
	 * @static
	 * @param name The name of the group
	 * @param [description] The description of the group
	 * @param [enabled=false] Whether or not the group is enabled by default
	 * @param [required=false] Whether or not the entire group is required
	 * @returns {GdprGuardGroup}
	 * @memberof GdprGuardGroup
	 */
	static for(name: string, description: string = "", enabled: boolean = false, required: boolean = false): GdprGuardGroup {
		return new GdprGuardGroup(name, description, enabled, required);
	}

	/**
	 * Add a guard to this group
	 * @param {GdprGuard} guard
	 * @returns {GdprGuardGroup}
	 * @memberof GdprGuardGroup
	 */
	addGuard(guard: GdprGuard): GdprGuardGroup {
		this.bindings.set(guard.name, guard);
		return this;
	}

	/**
	 * @inheritDoc
	 * @memberof GdprGuardGroup
	 */
	hasGuard(name: string): boolean {
		return this.name === name
			|| this.bindings.has(name)
			|| this.reduceSubGroupsPred(group => group.hasGuard(name));
	}

	/**
	 * @inheritDoc
	 * @memberof GdprGuardGroup
	 */
	getGuard(name: string): GdprGuard | null {
		if (this.name === name)
			return this;

		return this.bindings.get(name)
			?? this.reduceSubGroups(group => group.getGuard(name))
			?? null;
	}

	/**
	 * @inheritDoc
	 * @memberof GdprGuardGroup
	 */
	isEnabled(name: string): boolean {
		if (this.hasGuard(name)) {
			const guard = this.getGuard(name);
			if (guard !== null) {
				return guard.enabled;
			}
		}

		return false;
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprGuardGroup
	 * @returns {GdprGuardGroup}
	 */
	enable(): GdprGuardGroup {
		if (this.required)
			return this;

		this.enabled = true;
		return this.doForEachGuard(guard => guard.enable());
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprGuardGroup
	 * @returns {GdprGuardGroup}
	 */
	disable(): GdprGuardGroup {
		if (this.required)
			return this;

		this.enabled = false;
		return this.doForEachGuard(guard => guard.disable());
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprGuardGroup
	 * @returns {GdprGuardGroup}
	 */
	toggle(): GdprGuardGroup {
		return this.enabled ? this.disable() : this.enable();
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprGuardGroup
	 * @returns {GdprGuardGroup}
	 */
	makeRequired(): GdprGuardGroup {
		this.required = true;
		this.enabled = true;
		return this.doForEachGuard(guard => guard.makeRequired());
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprGuardGroup
	 */
	enableForStorage(type: GdprStorage): GdprGuardGroup {
		if (this.required) {
			return this;
		}

		return this.doForEachGuard(guard => {
			guard.enableForStorage(type);
		});
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprGuardGroup
	 */
	disableForStorage(type: GdprStorage): GdprGuardGroup {
		if (this.required) {
			return this;
		}

		return this.doForEachGuard(guard => {
			guard.disableForStorage(type);
		});
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprGuardGroup
	 */
	toggleForStorage(type: GdprStorage): GdprGuardGroup {
		if (this.required) {
			return this;
		}

		return this.doForEachGuard(guard => {
			guard.toggleForStorage(type);
		});
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprGuardGroup
	 */
	raw(): GdprGuardGroupRaw {
		const ret: GdprGuardGroupRaw = {
			name: this.name,
			description: this.description,
			enabled: this.enabled,
			required: this.required,
			storage: this.storage,
			guards: [],
		};

		ret.guards = [...this.bindings].map(([_, guard]) => guard.raw());

		return ret;
	}

	/**
	 * Execute a callback on each guard of this group
	 * @ignore
	 * @protected
	 * @param cb
	 * @memberof GdprGuardGroup
	 */
	protected doForEachGuard(cb: (guard: GdprGuard) => any): GdprGuardGroup {
		this.bindings.forEach(guard => cb(guard));
		return this;
	}

	/**
	 * Shortcircuit on predicate
	 * @ignore
	 * @protected
	 * @param {(group: GdprGuardCollection) => boolean} pred
	 * @returns {boolean}
	 * @memberof GdprManager
	 */
	protected reduceSubGroupsPred(pred: (guard: GdprGuardGroup) => boolean): boolean {
		for (const [_, guard] of this.bindings) {
			if (guard instanceof GdprGuardGroup && pred(guard))
				return true;
		}
		return false;
	}

	/**
	 * Shortcircuit on finding a matching guard
	 * @ignore
	 * @protected
	 * @param extractor
	 * @memberof GdprManager
	 */
	protected reduceSubGroups(extractor: (guard: GdprGuardCollection & GdprGuard) => GdprGuard | null): GdprGuard | null {
		for (const [_, guard] of this.bindings) {
			if (!(guard instanceof GdprGuardGroup)) {
				continue;
			}

			const extracted = extractor(guard);

			if (extracted) {
				return extracted;
			}
		}
		return null;
	}

	getGuards(): GdprGuard[] {
		return [...this.bindings.values()];
	}
}

