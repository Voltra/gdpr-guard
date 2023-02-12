import { GdprStorage } from "../GdprStorage";
import { GdprManagerBuilder } from "./GdprManagerBuilder";
import { GdprGuard } from "../GdprGuard";
import { GdprGuardBuilder } from "./GdprGuardBuilder";
/**
 * Builder for a gdpr group
 * @class GdprGroupBuilder
 * @extends {GdprManagerBuilder}
 * @export
 */
declare class GdprGroupBuilder extends GdprManagerBuilder {
    protected parent: GdprManagerBuilder;
    protected name: string;
    protected description: string;
    protected enable: boolean;
    protected require: boolean;
    guards: GdprGuard[];
    /**
     * @ignore
     * @protected
     */
    protected constructor(parent: GdprManagerBuilder, name: string, description: string, storage: GdprStorage, enable: boolean, require: boolean);
    /**
     * Factory for a group builder
     * @static
     * @param {GdprManagerBuilder} mb The parent manager builder
     * @param {string} name The name of the group
     * @param {string} [description] The description of the group
     * @param {?GdprStorage} [storage] The storage of the group
     * @param {boolean} [enabled=true] Whether or not the group should be enabled
     * @param {boolean} [required=true] Whether or not the group should be required
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    static create(mb: GdprManagerBuilder, name: string, description?: string, storage?: GdprStorage | null, enabled?: boolean, required?: boolean): GdprGroupBuilder;
    startGroup(storage?: GdprStorage | null, name?: string, description?: string): GdprGroupBuilder;
    startRequiredGroup(storage?: GdprStorage | null, name?: string, description?: string): GdprGroupBuilder;
    /**
     * End the group using the current builder state
     * @returns {GdprManagerBuilder}
     * @memberof GdprGroupBuilder
     */
    endGroup(): GdprManagerBuilder;
    /**
     * Set the name of the group
     * @param {string} name The new name for the group
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    withName(name: string): GdprGroupBuilder;
    /**
     * Set the description of the group
     * @param {string} description The new description for the group
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    withDescription(description: string): GdprGroupBuilder;
    /**
     * Set the storage of the group
     * @param {GdprStorage} storage The new storage for the group
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    storedIn(storage: GdprStorage): GdprGroupBuilder;
    /**
     * Mark as enabled
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    enabled(): GdprGroupBuilder;
    /**
     * Mark as disabled
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    disabled(): GdprGroupBuilder;
    /**
     * Mark as required
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    required(): GdprGroupBuilder;
    /**
     * Start adding a guard
     * @param {?GdprStorage} [storage] The storage for the guard (by default it uses the group's storage)
     * @returns {GdprGuardBuilder}
     * @memberof GdprGroupBuilder
     */
    startGuard(storage?: GdprStorage | null): GdprGuardBuilder;
    /**
     * Start adding a required guard
     * @param {?GdprStorage} [storage] The storage for the guard (by default it uses the group's storage)
     * @returns {GdprGuardBuilder}
     * @memberof GdprGroupBuilder
     */
    startRequiredGuard(storage: GdprStorage | null): GdprGuardBuilder;
    /**
     * Add an enabled guard
     * @param {string} name The name of the guard
     * @param {string} [description] The description of the guard
     * @param {?GdprStorage} [storage] The storage of the guard
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    withEnabledGuard(name: string, description?: string, storage?: GdprStorage | null): GdprGroupBuilder;
    /**
     * Add a disabled guard
     * @param {string} name The name of the guard
     * @param {string} [description] The description of the guard
     * @param {?GdprStorage} [storage] The storage of the guard
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    withDisabledGuard(name: string, description?: string, storage?: GdprStorage | null): GdprGroupBuilder;
    /**
     * Edit the builder state
     * @ignore
     * @protected
     * @param {(builder: GdprGroupBuilder) => any} cb
     * @returns {GdprGroupBuilder}
     * @memberof GdprGroupBuilder
     */
    protected edit(cb: (builder: GdprGroupBuilder) => any): GdprGroupBuilder;
}
export { GdprGroupBuilder, };
