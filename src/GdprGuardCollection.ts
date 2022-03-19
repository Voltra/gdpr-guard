import { GdprGuard } from "./GdprGuard"

/**
 * An interface representing a collecion of guards
 * @interface GdprGuardCollection
 * @extends {GdprGuard}
 * @export
 */
export interface GdprGuardCollection extends GdprGuard {
	/**
	 * Determine whether or not the collection has a given guard
	 * @param {string} name The name of the guard to look for
	 * @returns {boolean} TRUE if it is in its hierarchy, FALSE otherwise
	 * @memberof GdprGuardCollection
	 */
	hasGuard(name: string): boolean;

	/**
	 * Retrieve a guard from the collection
	 * @param {string} name being the name of the guard to retrieve
	 * @returns {?GdprGuard}
	 * @memberof GdprGuardCollection
	 */
	getGuard(name: string): GdprGuard | null;
}
