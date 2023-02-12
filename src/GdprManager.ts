import { GdprGuard, GdprGuardRaw, GdprRawInto } from "./GdprGuard";
import { GdprGuardGroup, GdprGuardGroupRaw } from "./GdprGuardGroup";
import { GdprGuardCollection } from "./GdprGuardCollection"
import { GdprStorage } from "./GdprStorage";
import { GdprManagerEventHub } from "./GdprManagerEventHub";
import { visitGdpr } from "./visitor";

/**
 * Raw representation of a guard manager
 */
export interface GdprManagerRaw extends GdprGuardRaw {
	bannerWasShown: boolean;
	enabled: boolean;
	groups: GdprGuardGroupRaw[];
}


/**
 * Manage multiple guard groups
 */
export class GdprManager implements GdprGuardCollection, GdprRawInto<GdprManagerRaw> {
	/**
	 * Whether the banner has already been shown to the user
	 */
	public bannerWasShown: boolean = false;

	/**
	 * Whether the whole manager is enabled
	 */
	public enabled: boolean = true;

	/**
	 * A hub to attach listeners to events triggered by this manager
	 */
	public readonly events = new GdprManagerEventHub();

	/**
	 * A mapping from group name to the corresponding group
	 * @protected
	 */
	protected groups: Map<string, GdprGuardGroup> = new Map();

	public readonly name: string = "manager";
	public readonly description: string = "Manager of GDPR guard groups";
	public readonly storage: GdprStorage = GdprStorage.None;
	public required: boolean = false;

	/**
	 * Creates an instance of GdprManager.
	 * @memberof GdprManager
	 * @ignore
	 */
	protected constructor() {
	}

	/**
	 * Factory for creating a gdpr manager
	 * @static
	 * @param {GdprGuardGroup[]} [groups=[]] The initial guard groups
	 * @returns {GdprManager}
	 * @memberof GdprManager
	 */
	public static create(groups: GdprGuardGroup[] = []): GdprManager {
		const manager = new GdprManager();
		groups.forEach(group => manager.addGroup(group));
		return manager;
	}

	/**
	 * Mark the GDPR banner as shown and trigger enable and disable events
	 */
	closeBanner() {
		this.bannerWasShown = true;

		visitGdpr(this, {
			onEach: (guard: GdprGuard) => {
				if (guard.enabled) {
					this.events.enable(guard.name);
				} else {
					this.events.disable(guard.name);
				}
			}
		});
	}

	/**
	 * Reset the state of the GDPR banner and show it
	 */
	resetAndShowBanner() {
		this.bannerWasShown = false;
	}

	/**
	 * Create and add a group to this manager
	 * @param {string} name The new group's name
	 * @param {string} [description] The new group's description
	 * @returns {GdprManager}
	 * @memberof GdprManager
	 */
	createGroup(name: string, description: string = ""): GdprManager {
		return this.addGroup(GdprGuardGroup.for(name, description));
	}


	/**
	 * Add a group to this manager
	 * @param {GdprGuardGroup} category The group to add
	 * @returns {GdprManager}
	 * @memberof GdprManager
	 */
	addGroup(category: GdprGuardGroup): GdprManager {
		this.groups.set(category.name, category);
		return this;
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprManager
	 */
	hasGuard(name: string): boolean {
		return this.reduceGroupsPred(group => group.hasGuard(name));
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprManager
	 */
	getGuard(name: string): GdprGuard | null {
		for (const [_, group] of this.groups) {
			if (group.hasGuard(name))
				return group.getGuard(name);
		}
		return null;
	}

	/**
	 * @inheritDoc
	 * @memberof GdprManager
	 */
	hasGroup(name: string): boolean {
		return this.reduceGroupsPred(group => group.name === name);
	}

	/**
	 * @inheritDoc
	 * @memberof GdprManager
	 */
	getGroup(name: string): GdprGuardGroup | null {
		for (const [n, group] of this.groups) {
			if (n === name)
				return group;
		}
		return null;
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprManager
	 */
	isEnabled(name: string): boolean {
		return this.reduceGroupsPred(group => group.isEnabled(name));
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprManager
	 */
	enable(): GdprGuard {
		this.enabled = true;
		return this.forEachGroup(group => group.enable());
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprManager
	 */
	disable(): GdprGuard {
		this.enabled = false;
		return this.forEachGroup(group => group.disable());
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprManager
	 */
	toggle(): GdprGuard {
		return this.enabled ? this.disable() : this.enable();
	}

	/**
	 * Does nothing for a manager
	 * @inheritDoc
	 * @override
	 * @memberof GdprManager
	 */
	makeRequired(): GdprGuard {
		// noop
		return this;
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprManager
	 */
	enableForStorage(type: GdprStorage): GdprGuard {
		return this.forEachGroup(group => group.enableForStorage(type));
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprManager
	 */
	disableForStorage(type: GdprStorage): GdprGuard {
		return this.forEachGroup(group => group.disableForStorage(type));
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprManager
	 */
	toggleForStorage(type: GdprStorage): GdprGuard {
		return this.forEachGroup(group => group.toggleForStorage(type));
	}

	/**
	 * @inheritDoc
	 * @override
	 * @memberof GdprManager
	 * @returns {GdprManagerRaw}
	 */
	raw(): GdprManagerRaw {
		const ret: GdprManagerRaw = {
			bannerWasShown: this.bannerWasShown,
			enabled: this.enabled,
			groups: [],

			// Useless, but for typechecking:
			name: this.name,
			description: this.description,
			storage: this.storage,
			required: this.required,
		};

		ret.groups = [...this.groups.values()].map(group => group.raw());

		return ret;
	}

	/**
	 * Shortcircuit on predicate
	 * @ignore
	 * @protected
	 * @param pred
	 * @memberof GdprManager
	 */
	protected reduceGroupsPred(pred: (group: GdprGuardGroup) => boolean): boolean {
		for (const [_, group] of this.groups) {
			if (pred(group))
				return true;
		}
		return false;
	}

	/**
	 * Execute a callback on each group of this guard
	 * @ignore
	 * @protected
	 * @param cb
	 * @memberof GdprManager
	 */
	protected forEachGroup(cb: (group: GdprGuardGroup) => any): GdprManager {
		this.groups.forEach(group => cb(group));
		return this;
	}

	getGroups(): GdprGuardGroup[] {
		return [...this.groups.values()];
	}
}

