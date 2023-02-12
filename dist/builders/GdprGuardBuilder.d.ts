import { GdprGroupBuilder } from "./builders";
import { GdprStorage } from "../GdprStorage";
/**
 * Builder for a gdpr guard
 * @class GdprGuardBuilder
 * @export
 */
declare class GdprGuardBuilder {
    protected parent: GdprGroupBuilder;
    protected storage: GdprStorage;
    protected enable: boolean;
    protected require: boolean;
    protected name: string;
    protected description: string;
    /**
     * Creates an instance of GdprGuardBuilder.
     * @ignore
     * @protected
     * @param {GdprGroupBuilder} parent
     * @param {GdprStorage} storage
     * @param {boolean} enable
     * @param {boolean} require
     * @memberof GdprGuardBuilder
     */
    protected constructor(parent: GdprGroupBuilder, storage: GdprStorage, enable: boolean, require: boolean);
    /**
     * Factory for creating a guard builder
     * @static
     * @param {GdprGroupBuilder} gb The parent group builder
     * @param {GdprStorage} [storage=GdprStorage.Cookie] The guard's storage
     * @param {boolean} [enabled=false] Whether or not the guard should be enabled
     * @param {boolean} [required=false] Whether or not the guard should be required
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    static create(gb: GdprGroupBuilder, storage?: GdprStorage, enabled?: boolean, required?: boolean): GdprGuardBuilder;
    /**
     * End the guard creation with the current builder state
     * @returns {GdprGroupBuilder}
     * @memberof GdprGuardBuilder
     */
    endGuard(): GdprGroupBuilder;
    /**
     * Set the name of the guard
     * @param {string} name The new name for the guard
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    withName(name: string): GdprGuardBuilder;
    /**
     * Set the description of the guard
     * @param {string} description The new description for the guard
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    withDescription(description: string): GdprGuardBuilder;
    /**
     * Mark as enabled
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    enabled(): GdprGuardBuilder;
    /**
     * Mark as disabled
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    disabled(): GdprGuardBuilder;
    /**
     * Set the storage of the guard
     * @param {GdprStorage} storage The new storage for the guard
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    storedIn(storage: GdprStorage): GdprGuardBuilder;
    /**
     * Mark as required
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    required(): GdprGuardBuilder;
    /**
     * Edit the builder's state
     * @ignore
     * @protected
     * @param {(builder: GdprGuardBuilder) => any} edit
     * @returns {GdprGuardBuilder}
     * @memberof GdprGuardBuilder
     */
    protected edit(edit: (builder: GdprGuardBuilder) => any): GdprGuardBuilder;
}
export { GdprGuardBuilder, };
