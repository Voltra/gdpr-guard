import { GdprManagerRaw, GdprManager } from "../GdprManager";
declare type GdprManagerFactory = () => Promise<GdprManager>;
interface GdprSavior {
    restore(shouldUpdate?: boolean): Promise<GdprManager | null>;
    exists(shouldUpdate?: boolean): Promise<boolean>;
    restoreOrCreate(factory: GdprManagerFactory): Promise<GdprManager>;
    store(manager: GdprManagerRaw): Promise<boolean>;
    storeIfNotExists(manager: GdprManagerRaw): Promise<boolean>;
    updateSharedManager(manager: GdprManager): Promise<void>;
    check(): Promise<void>;
}
declare abstract class GdprSaviorAdapter implements GdprSavior {
    abstract restore(shouldUpdate?: boolean): Promise<GdprManager | null>;
    abstract store(manager: GdprManagerRaw): Promise<boolean>;
    abstract updateSharedManager(manager: GdprManager): Promise<void>;
    exists(shouldUpdate?: boolean): Promise<boolean>;
    storeIfNotExists(manager: GdprManagerRaw): Promise<boolean>;
    restoreOrCreate(factory: GdprManagerFactory): Promise<GdprManager>;
    check(): Promise<void>;
}
export { GdprManagerFactory, GdprSavior, GdprSaviorAdapter, };
