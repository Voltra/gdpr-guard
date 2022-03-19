import { GdprGroupBuilder } from "./builders";
import { GdprStorage } from "../GdprStorage";
declare class GdprGuardBuilder {
    protected parent: GdprGroupBuilder;
    protected storage: GdprStorage;
    protected enable: boolean;
    protected require: boolean;
    protected name: string;
    protected description: string;
    protected constructor(parent: GdprGroupBuilder, storage: GdprStorage, enable: boolean, require: boolean);
    static create(gb: GdprGroupBuilder, storage?: GdprStorage, enabled?: boolean, required?: boolean): GdprGuardBuilder;
    endGuard(): GdprGroupBuilder;
    withName(name: string): GdprGuardBuilder;
    withDescription(description: string): GdprGuardBuilder;
    enabled(): GdprGuardBuilder;
    disabled(): GdprGuardBuilder;
    storedIn(storage: GdprStorage): GdprGuardBuilder;
    required(): GdprGuardBuilder;
    protected edit(edit: (builder: GdprGuardBuilder) => any): GdprGuardBuilder;
}
export { GdprGuardBuilder, };
