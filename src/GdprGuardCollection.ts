import { GdprGuard } from "./GdprGuard"

/**
 * An interface representing a collecion of guards
 */
export interface GdprGuardCollection extends GdprGuard {
	/**
	 * Determine whether or not the collection has a given guard
	 * @param name The name of the guard to look for
	 * @returns TRUE if it is in its hierarchy, FALSE otherwise
	 * @memberof GdprGuardCollection
	 */
	hasGuard(name: string): boolean;

	/**
	 * Retrieve a guard from the collection
	 * @param name being the name of the guard to retrieve
	 * @memberof GdprGuardCollection
	 */
	getGuard(name: string): GdprGuard | null;
}
