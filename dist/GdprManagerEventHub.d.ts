export declare type GdprManagerEventHandler = () => void;
export declare class GdprManagerEventHub {
    protected eventMap: Record<string, GdprManagerEventHandler[]>;
    onEnable(guardName: string, callback: GdprManagerEventHandler): this;
    onDisable(guardName: string, callback: GdprManagerEventHandler): this;
    enable(guardName: string): this;
    disable(guardName: string): this;
    protected tagFor(type: string, guardName: string): string;
    protected addListener(type: string, guardName: string, callback: GdprManagerEventHandler): void;
    protected executeListeners(type: string, guardName: string): void;
}
