import { GdprStorage } from "../GdprStorage";
import { GdprManagerBuilder } from "./GdprManagerBuilder";
import { GdprGuard } from "../GdprGuard";
import { GdprGuardBuilder } from "./GdprGuardBuilder";
declare class GdprGroupBuilder extends GdprManagerBuilder {
    protected parent: GdprManagerBuilder;
    protected name: string;
    protected description: string;
    protected enable: boolean;
    protected require: boolean;
    guards: GdprGuard[];
    protected constructor(parent: GdprManagerBuilder, name: string, description: string, storage: GdprStorage, enable: boolean, require: boolean);
    static create(mb: GdprManagerBuilder, name: string, description?: string, storage?: GdprStorage | null, enabled?: boolean, required?: boolean): GdprGroupBuilder;
    startGroup(storage?: GdprStorage | null, name?: string, description?: string): GdprGroupBuilder;
    startRequiredGroup(storage?: GdprStorage | null, name?: string, description?: string): GdprGroupBuilder;
    endGroup(): GdprManagerBuilder;
    withName(name: string): GdprGroupBuilder;
    withDescription(description: string): GdprGroupBuilder;
    storedIn(storage: GdprStorage): GdprGroupBuilder;
    enabled(): GdprGroupBuilder;
    disabled(): GdprGroupBuilder;
    required(): GdprGroupBuilder;
    startGuard(storage?: GdprStorage | null): GdprGuardBuilder;
    startRequiredGuard(storage: GdprStorage | null): GdprGuardBuilder;
    withEnabledGuard(name: string, description?: string, storage?: GdprStorage | null): GdprGroupBuilder;
    withDisabledGuard(name: string, description?: string, storage?: GdprStorage | null): GdprGroupBuilder;
    protected edit(cb: (builder: GdprGroupBuilder) => any): GdprGroupBuilder;
}
export { GdprGroupBuilder, };
