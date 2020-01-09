import { GdprManager } from "../GdprManager";
import { GdprGuardGroup } from "../GdprGuardGroup";
import { GdprGuard } from "../GdprGuard";
declare class GdprDeserializer {
    static manager(raw: any): GdprManager | null;
    static group(raw: any): GdprGuardGroup | null;
    static guard(raw: any): GdprGuard | null;
}
export { GdprDeserializer, };
