import { GdprGuard } from "./GdprGuard";
import { GdprManager } from "./GdprManager";
import { GdprGuardGroup } from "./GdprGuardGroup";

export interface GdprVisitor {
	onManager(manager: GdprManager): void;
	onGroup(group: GdprGuardGroup): void;
	onGuard(guard: GdprGuard): void;
}

/**
 * Visit the GDPR structure
 * @param guard The root of the GDPR structure to visit
 * @param {Partial<GdprVisitor>} visitor
 */
export const visitGdpr = (guard: GdprGuard, {
	onManager = () => {},
	onGroup = () => {},
	onGuard = () => {},
}: Partial<GdprVisitor> = {}) => {
	if(guard instanceof GdprManager) {
		onManager(guard);

		guard.getGroups()
			.forEach(group => visitGdpr(group, {
				onManager,
				onGroup,
				onGuard,
			}))
	} else if (guard instanceof GdprGuardGroup) {
		onGroup(guard);

		guard.getGuards()
			.forEach(guard => visitGdpr(guard, {
				onManager,
				onGroup,
				onGuard,
			}));
	} else {
		onGuard(guard);
	}
};
