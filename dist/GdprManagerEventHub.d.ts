export type GdprManagerEventHandler = () => void;
/**
 * An event hub for a {@link GdprManager}'s events
 */
export declare class GdprManagerEventHub {
    protected eventMap: Record<string, GdprManagerEventHandler[]>;
    /**
     * Attach a listener for when the given guard is enabled
     * @param guardName - The name of the guard
     * @param callback - The event listener
     */
    onEnable(guardName: string, callback: GdprManagerEventHandler): this;
    /**
     * Attach a listener for when the given guard is disabled
     * @param guardName - The guard's name
     * @param callback - The event listener
     */
    onDisable(guardName: string, callback: GdprManagerEventHandler): this;
    /**
     * Enable the given guard
     * @param guardName - The guard's name
     */
    enable(guardName: string): this;
    /**
     * Disable the given guard
     * @param guardName - The guard's name
     */
    disable(guardName: string): this;
    protected tagFor(type: string, guardName: string): string;
    protected addListener(type: string, guardName: string, callback: GdprManagerEventHandler): void;
    protected executeListeners(type: string, guardName: string): void;
}
