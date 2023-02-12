import { GdprGuardGroup } from "../GdprGuardGroup";
import { GdprStorage } from "../GdprStorage";
import { GdprManager } from "../GdprManager";
import { GdprGroupBuilder } from "./builders";
/**
 * Builder for a GdprManager
 * @class GdprManagerBuilder
 * @export
 */
declare class GdprManagerBuilder {
    storage: GdprStorage;
    groups: GdprGuardGroup[];
    bannerWasShown: boolean;
    /**
     * Factory for a builder
     * @static
     * @returns {GdprManagerBuilder}
     * @memberof GdprManagerBuilder
     */
    static make(): GdprManagerBuilder;
    withBannerShown(wasShown?: boolean): void;
    /**
     * Start a new group
     * @param {?GdprStorage} [storage] The storage type of the group
     * @param {string} [name] The name of the group
     * @param {string} [description] The description of the group
     * @param {boolean} [enabled=true] Whether or not the group is enabled
     * @returns {GdprGroupBuilder}
     * @memberof GdprManagerBuilder
     */
    startGroup(storage?: GdprStorage | null, name?: string, description?: string, enabled?: boolean): GdprGroupBuilder;
    /**
     * Start a new group as required
     * @param {?GdprStorage} [storage] The storage type of the group
     * @param {string} [name] The name of the group
     * @param {string} [description] The description of the group
     * @returns {GdprGroupBuilder}
     * @memberof GdprManagerBuilder
     */
    startRequiredGroup(storage?: GdprStorage | null, name?: string, description?: string): GdprGroupBuilder;
    /**
     * Start a new enabled group
     * @param {?GdprStorage} [storage] The storage type of the group
     * @param {string} [name] The name of the group
     * @param {string} [description] The description of the group
     * @returns {GdprGroupBuilder}
     * @memberof GdprManagerBuilder
     */
    startEnabledGroup(storage?: GdprStorage | null, name?: string, description?: string): GdprGroupBuilder;
    /**
     * Start a new disabled group
     * @param {?GdprStorage} [storage] The storage type of the group
     * @param {string} [name] The name of the group
     * @param {string} [description] The description of the group
     * @returns {GdprGroupBuilder}
     * @memberof GdprManagerBuilder
     */
    startDisabledGroup(storage?: GdprStorage | null, name?: string, description?: string): GdprGroupBuilder;
    /**
     * Build the manager from the current builder state
     * @returns {GdprManager}
     * @memberof GdprManagerBuilder
     */
    build(): GdprManager;
    /**
     * End this group's creation (no-op for manager builders)
     * @returns {GdprManagerBuilder}
     * @memberof GdprManagerBuilder
     */
    endGroup(): GdprManagerBuilder;
}
export { GdprManagerBuilder, };
