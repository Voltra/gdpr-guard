import { GdprManager, GdprManagerRaw } from "../GdprManager";
import { GdprGuardGroup, GdprGuardGroupRaw } from "../GdprGuardGroup";
import { GdprGuard, GdprGuardRaw } from "../GdprGuard";
/**
 * Namespace-like class that allows deserialization from raw format
 * @abstract
 * @class GdprDeserializer
 * @export
 */
export declare abstract class GdprDeserializer {
    /**
     * Deserialize a GdprManager from its raw representation
     * @param raw The serialized manager
     * @returns {?GdprManager}
     * @static
     * @memberof GdprDeserializer
     */
    static manager(raw: GdprManagerRaw | any): GdprManager | null;
    /**
     * Deserialize a GdprGuardGroup from its raw representation
     * @param {any} raw The serialized group
     * @returns {?GdprGuardGroup}
     * @static
     * @memberof GdprDeserializer
     */
    static group(raw: GdprGuardGroupRaw | any): GdprGuardGroup | null;
    /**
     * Deserialize a GdprGuard from its raw representation
     * @param {any} raw The serialized guard
     * @returns {?GdprGuard}
     * @static
     * @memberof GdprDeserializer
     */
    static guard(raw: GdprGuardRaw | any): GdprGuard | null;
}
