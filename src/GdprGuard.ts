import { GdprStorage } from "./GdprStorage"

interface GdprGuard{
    readonly name: string,
    enabled: boolean,
    readonly description: string,
    readonly storage: GdprStorage,
    required: boolean,

    isEnabled(name: string): boolean,

    enable(): GdprGuard,
    disable(): GdprGuard,
    toggle(): GdprGuard,
    makeRequired(): GdprGuard,

    enableForStorage(type: GdprStorage): GdprGuard,
    disableForStorage(type: GdprStorage): GdprGuard,
    toggleForStorage(type: GdprStorage): GdprGuard,
    raw(): object,
}

interface GdprGuardRaw{
    name: string,
    enabled: boolean,
    required: boolean,
    description: string,
    storage: GdprStorage,
}

function makeGuard(name: string, description: string, storage: GdprStorage = GdprStorage.Cookie, required: boolean = false, enabled: boolean|null = null): GdprGuard{
    return {
        name,
        description,
        storage,
        required,
        enabled: enabled === null ? required : enabled,
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
            if(!this.required)
                this.enabled = !this.enabled;
            return this;
        },
        makeRequired(){
            this.required = true;
            this.enabled = true;
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
            if(this.storage == type && !this.required)
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