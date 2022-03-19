export type GdprManagerEventHandler = () => void;

/**
 * An event hub for a {@link GdprManager}'s events
 */
export class GdprManagerEventHub {
	protected eventMap = {} as Record<string, GdprManagerEventHandler[]>;

	/**
	 * Attach a listener for when the given guard is enabled
	 * @param guardName - The name of the guard
	 * @param callback - The event listener
	 */
	onEnable(guardName: string, callback: GdprManagerEventHandler): this {
		this.addListener("enable", guardName, callback);
		return this;
	}

	/**
	 * Attach a listener for when the given guard is disabled
	 * @param guardName - The guard's name
	 * @param callback - The event listener
	 */
	onDisable(guardName: string, callback: GdprManagerEventHandler): this {
		this.addListener("disable", guardName, callback);
		return this;
	}

	/**
	 * Enable the given guard
	 * @param guardName - The guard's name
	 */
	enable(guardName: string): this {
		this.executeListeners("enable", guardName);
		return this;
	}

	/**
	 * Disable the given guard
	 * @param guardName - The guard's name
	 */
	disable(guardName: string): this {
		this.executeListeners("disable", guardName);
		return this;
	}

	protected tagFor(type: string, guardName: string): string {
		return `${type}--${guardName}`;
	}

	protected addListener(type: string, guardName: string, callback: GdprManagerEventHandler) {
		const tag = this.tagFor(type, guardName);

		if (!(tag in this.eventMap)) {
			this.eventMap[tag] = [];
		}

		this.eventMap[tag].push(callback);
	}

	protected executeListeners(type: string, guardName: string) {
		const tag = this.tagFor(type, guardName);
		this.eventMap[tag]?.forEach(cb => cb());
	}
}
