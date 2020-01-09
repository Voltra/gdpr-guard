import { GdprGuard, GdprGuardRaw } from "../GdprGuard"

class GdprSerializer{
    static serialize(obj: GdprGuard): object|GdprGuardRaw{
        return obj.raw();
    }
}

export {
    GdprSerializer,
}