import { GdprStorage } from "./GdprStorage"

interface GdprGuard{
    readonly name: string,
    enabled: boolean,
    readonly description: string,
    readonly storage: GdprStorage,

    isEnabled(name: string): boolean,

    enable(): GdprGuard,
    disable(): GdprGuard,
    toggle(): GdprGuard,

    enableForStorage(type: GdprStorage): GdprGuard,
    disableForStorage(type: GdprStorage): GdprGuard,
    toggleForStorage(type: GdprStorage): GdprGuard,
    raw(): object,
}

interface GdprGuardRaw{
    name: string,
    enabled: boolean,
    description: string,
    storage: GdprStorage,
}

function makeGuard(name: string, description: string, storage: GdprStorage = GdprStorage.Cookie, enabled: boolean = false): GdprGuard{
    return {
        name,
        description,
        storage,
        enabled,
        enable(){
            if(!this.enabled)
                this.toggle();

            return this;
        },
        disable(){
            if(this.enabled)
                this.toggle();

            return this;
        },
        toggle(){
            this.enabled = !this.enabled;
            return this;
        },
        isEnabled(name){
            return this.name === name && this.enabled;
        },
        enableForStorage(type){
            if(!this.enabled)
                this.toggleForStorage(type);
            return this;
        },
        disableForStorage(type){
            if(this.enabled)
                this.toggleForStorage(type);
            return this;
        },
        toggleForStorage(type){
            if(this.storage == type)
                this.toggle();
            return this;
        },
        raw(): GdprGuardRaw{
            return JSON.parse(JSON.stringify(this));
        }
    };
}

export {
    GdprGuard,
    GdprGuardRaw,
    makeGuard,
}