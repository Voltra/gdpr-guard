import { GdprGuard, GdprGuardRaw } from "../GdprGuard"

/**
 * A namespace-like class that allows serialization of gdpr objects
 * @abstract
 * @class GdprSerializer
 * @export
 */
abstract class GdprSerializer {
	/**
	 * Serialize a GdprGuard (or its subtypes) to its raw format (POD)
	 * @static
	 * @param {GdprGuard} obj The object to serialize
	 * @returns {(object|GdprGuardRaw)}
	 * @memberof GdprSerializer
	 */
	static serialize(obj: GdprGuard): object | GdprGuardRaw {
		return obj.raw();
	}
}

export {
	GdprSerializer,
}
