import { GdprManager } from "../GdprManager"
import { GdprStorage } from "../GdprStorage"
import { GdprGuardGroup } from "../GdprGuardGroup"
import { GdprGuard, GdprGuardRaw, makeGuard } from "../GdprGuard"
import { GdprManagerRaw } from "../../dist/GdprManager";
import { GdprGuardGroupRaw } from "../../dist/GdprGuardGroup";

/*
	For retro-compatibility, we do not check for
	the presence of the `bannerWasShown` key
*/
const managerKeys = ["enabled", "groups"];
const groupKeys = ["guards"];
const guardKeys = [
	"name",
	"enabled",
	"required",
	"description",
	"storage"
];

const isManager = (raw: any): raw is GdprManagerRaw => {
	const allKeys = managerKeys.every(key => key in raw);
	return allKeys
			&& typeof raw.enabled == "boolean"
			&& Array.isArray(raw.groups);
};

const isGroup = (raw: GdprGuardRaw|any): raw is GdprGuardGroupRaw => {
	const allKeys = groupKeys.every(key => key in raw);

	return allKeys && Array.isArray(raw.guards);
};

const isGuard = (raw: any): raw is GdprGuardRaw => {
	const allKeys = guardKeys.every(key => key in raw);

	return allKeys
		&& typeof raw.name == "string"
		&& typeof raw.enabled == "boolean"
		&& typeof raw.required == "boolean"
		&& typeof raw.description == "string"
		&& typeof raw.storage == "number"
		&& raw.storage in GdprStorage;
};

/**
 * Namespace-like class that allows deserialization from raw format
 * @abstract
 * @class GdprDeserializer
 * @export
 */
abstract class GdprDeserializer {
	/**
	 * Deserialize a GdprManager from its raw representation
	 * @param raw The serialized manager
	 * @returns {?GdprManager}
	 * @static
	 * @memberof GdprDeserializer
	 */
	static manager(raw: GdprManagerRaw|any): GdprManager | null {
		if (!isManager(raw))
			return null;

		const groups: GdprGuardGroup[] = raw.groups
			.map(group => this.group(group))
			.filter(group => group !== null) as GdprGuardGroup[];

		const manager = GdprManager.create([]);
		manager.enabled = !!raw.enabled;
		manager.bannerWasShown = !!raw.bannerWasShown;

		if (!groups.length)
			return null;

		groups.forEach(group => manager.addGroup(group));
		return manager;
	}

	/**
	 * Deserialize a GdprGuardGroup from its raw representation
	 * @param {any} raw The serialized group
	 * @returns {?GdprGuardGroup}
	 * @static
	 * @memberof GdprDeserializer
	 */
	static group(raw: any): GdprGuardGroup | null {
		const guard: GdprGuard | null = this.guard(raw);
		if (guard === null)
			return null;

		if (!isGroup(guard))
			return null;

		const group = GdprGuardGroup.for(
			guard.name,
			guard.description,
			guard.enabled,
			guard.required
		);


		const guards: GdprGuard[] = raw.guards
			.map((guard: GdprGuardRaw) => groupKeys.every(key => key in guard) ? this.group(guard) : this.guard(guard))
			.filter((guard: GdprGuardRaw|null) => guard !== null) as GdprGuard[];

		if (!guards.length)
			return null;

		guards.forEach(guard => group.addGuard(guard));
		return group;
	}

	/**
	 * Deserialize a GdprGuard from its raw representation
	 * @param {any} raw The serialized guard
	 * @returns {?GdprGuard}
	 * @static
	 * @memberof GdprDeserializer
	 */
	static guard(raw: any): GdprGuard | null {
		return !isGuard(raw) ? null : makeGuard(
			raw.name,
			raw.description,
			raw.storage as GdprStorage,
			!!raw.required,
			!!raw.enabled
		);
	}
}

export {
	GdprDeserializer,
}
