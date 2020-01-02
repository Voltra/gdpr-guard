import { GdprGuard, GdprGuardRaw } from "./GdprGuard"
import { GdprGuardGroup, GdprGuardGroupRaw } from "./GdprGuardGroup";
import { GdprGuardCollection } from "./GdprGuardCollection"
import { GdprStorage } from "./GdprStorage";

interface GdprManagerRaw{
    enabled: boolean,
    groups: GdprGuardGroupRaw[],
}


class GdprManager implements GdprGuardCollection{
    public static readonly REQUIRED_GROUP: string = "REQUIRED";
    public static readonly REQUIRED_GROUP_DESC: string = "Features that cannot be disabled";


    protected groups: Map<string, GdprGuardGroup> = new Map();
    readonly name: string = "manager";
    readonly description: string = "Manager of GDPR guard groups";
    enabled: boolean = true;
    readonly storage: GdprStorage = GdprStorage.None;

    protected constructor(){
    }

    public static create(groups: GdprGuardGroup[] = []): GdprManager{
        const manager = new GdprManager();
        groups.forEach(group => manager.addGroup(group));
        return manager;
    }

    createGroup(name: string, description: string = ""): GdprManager{
        return this.addGroup(GdprGuardGroup.for(name, description));
    }


    addGroup(category: GdprGuardGroup): GdprManager{
        this.groups.set(category.name, category);
        return this;
    }

    protected reduceGroupsPred(pred: (group: GdprGuardCollection) => boolean): boolean{
        for(const [_, group] of this.groups){
            if(pred(group))
                return true;
        }
        return false;
    }

    protected forEachGroup(cb: (group: GdprGuardCollection) => any): GdprManager{
        this.groups.forEach(group => cb(group));
        return this;
    }

    hasGuard(name: string): boolean {
        return this.reduceGroupsPred(group => group.hasGuard(name));
    }

    getGuard(name: string): GdprGuard | null {
        for(const [_, group] of this.groups){
            if(group.hasGuard(name))
                return group.getGuard(name);
        }
        return null;
    }

    hasGroup(name: string): boolean {
        return this.reduceGroupsPred(group => group.name === name);
    }

    getGroup(name: string): GdprGuardGroup | null {
        for(const [n, group] of this.groups){
            if(n === name)
                return group;
        }
        return null;
    }

    isEnabled(name: string): boolean {
        return this.reduceGroupsPred(group => group.isEnabled(name));
    }

    enable(): GdprManager {
        return this.forEachGroup(group => group.enable());
    }

    disable(): GdprManager {
        return this.forEachGroup(group => {
            if(group.name !== GdprManager.REQUIRED_GROUP)
                group.disable();
        });
    }

    toggle(): GdprManager {
        return this.enabled ? this.disable() : this.enable();
    }

    enableForStorage(type: GdprStorage): GdprManager {
        return this.forEachGroup(group => group.enableForStorage(type));
    }

    disableForStorage(type: GdprStorage): GdprManager {
        return this.forEachGroup(group => {
            if(group.name !== GdprManager.REQUIRED_GROUP)
                group.disableForStorage(type);
        });
    }

    toggleForStorage(type: GdprStorage): GdprManager {
        return this.forEachGroup(group => {
            if(group.name !== GdprManager.REQUIRED_GROUP)
                group.toggleForStorage(type);
        });
    }

    raw(): GdprManagerRaw{
        const ret: GdprManagerRaw = {
            enabled: this.enabled,
            groups: [],
        };

        ret.groups = [...this.groups].map(([_, group]) => group.raw());

        return ret;
    }
}

export {
    GdprManager,
    GdprManagerRaw,
}