import { GdprManager } from "../GdprManager";
import { GdprGuardGroup } from "../GdprGuardGroup";
import { GdprGuard } from "../GdprGuard";
import { GdprManagerRaw } from "../../dist/GdprManager";
declare abstract class GdprDeserializer {
    static manager(raw: GdprManagerRaw | any): GdprManager | null;
    static group(raw: any): GdprGuardGroup | null;
    static guard(raw: any): GdprGuard | null;
}
export { GdprDeserializer, };
