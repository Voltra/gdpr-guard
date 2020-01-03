import { GdprGroupBuilder } from "./builders";
import { GdprStorage } from "../GdprStorage";
declare class GdprGuardBuilder {
    protected parent: GdprGroupBuilder;
    protected storage: GdprStorage;
    protected enable: boolean;
    protected name: string;
    protected description: string;
    protected constructor(parent: GdprGroupBuilder, storage: GdprStorage, enable: boolean);
    static create(gb: GdprGroupBuilder, storage?: GdprStorage, enabled?: boolean): GdprGuardBuilder;
    endGuard(): GdprGroupBuilder;
    protected edit(edit: (builder: GdprGuardBuilder) => any): GdprGuardBuilder;
    withName(name: string): GdprGuardBuilder;
    withDescription(description: string): GdprGuardBuilder;
    enabled(): GdprGuardBuilder;
    disabled(): GdprGuardBuilder;
    storedIn(storage: GdprStorage): GdprGuardBuilder;
}
export { GdprGuardBuilder, };
