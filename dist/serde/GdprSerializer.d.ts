import { GdprGuard, GdprGuardRaw } from "../GdprGuard";
declare abstract class GdprSerializer {
    static serialize(obj: GdprGuard): object | GdprGuardRaw;
}
export { GdprSerializer, };
