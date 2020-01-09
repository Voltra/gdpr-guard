import { GdprManager } from "../GdprManager"
import { GdprStorage, storageFromOrdinal } from "../GdprStorage"
import { GdprGuardGroup } from "../GdprGuardGroup";
import { GdprGuard, makeGuard } from "../GdprGuard";

class GdprDeserializer{
    static manager(raw: any): GdprManager|null{
        const allKeys = ["enabled", "groups"].every(key => key in raw);
        const validateFields = allKeys
        && typeof raw.enabled == "boolean"
        && Array.isArray(raw.groups);

        if(!validateFields)
            return null;

        const groups: (GdprGuardGroup|null)[] = (<any[]>raw.groups)
        .map(group => this.group(group))
        .filter(group => group !== null);

        const manager = GdprManager.create([]);
        manager.enabled = !!raw.enabled;

        if(!groups.length)
            return null;

        groups.forEach(group => manager.addGroup(group as GdprGuardGroup));
        return manager;
    }

    static group(raw: any): GdprGuardGroup|null{
        const guard: GdprGuard|null = this.guard(raw);
        if(guard === null)
            return null;

        const keys = [
            "guards",
        ];
        const allKeys = keys.every(key => key in raw);

        const validateFields = allKeys
        && Array.isArray(raw.guards);

        if(!validateFields)
            return null;

        const group = GdprGuardGroup.for(
            guard.name,
            guard.description,
            guard.enabled,
            guard.required
        );


        const guards: (GdprGuard|null)[] = (<any[]>raw.guards)
        .map(guard => keys.every(key => key in guard) ? this.group(guard) : this.guard(guard))
        .filter(guard => guard !== null);

        if(!guards.length)
            return null;

        guards.forEach(guard => group.addGuard(guard as GdprGuard));
        return group;
    }

    static guard(raw: any): GdprGuard|null{
        const allKeys = [
            "name",
            "enabled",
            "required",
            "description",
            "storage"
        ].every(key => key in raw);

        const validateFields = allKeys
        && typeof raw.name == "string"
        && typeof raw.enabled == "boolean"
        && typeof raw.required == "boolean"
        && typeof raw.description == "string"
        && typeof raw.storage == "number"
        && raw.storage in  GdprStorage;


        return !validateFields ? null : makeGuard(
            raw.name,
            raw.description,
            storageFromOrdinal(raw.storage) as GdprStorage,
            !!raw.required,
            !!raw.enabled
        );
    }
}

export {
    GdprDeserializer,
}