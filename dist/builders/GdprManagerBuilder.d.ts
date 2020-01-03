import { GdprGuardGroup } from "../GdprGuardGroup";
import { GdprStorage } from "../GdprStorage";
import { GdprManager } from "../GdprManager";
import { GdprGroupBuilder } from "./builders";
declare class GdprManagerBuilder {
    storage: GdprStorage;
    groups: GdprGuardGroup[];
    static make(): GdprManagerBuilder;
    startGroup(storage?: GdprStorage | null, name?: string, description?: string, enabled?: boolean): GdprGroupBuilder;
    startRequiredGroup(storage?: GdprStorage | null, name?: string, description?: string): GdprGroupBuilder;
    startEnabledGroup(storage?: GdprStorage | null, name?: string, description?: string): GdprGroupBuilder;
    startDisabledGroup(storage?: GdprStorage | null, name?: string, description?: string): GdprGroupBuilder;
    build(): GdprManager;
    endGroup(): GdprManagerBuilder;
}
export { GdprManagerBuilder, };
