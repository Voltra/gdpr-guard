/**
 * The types of storage concerned by GDPR
 * @enum {number}
 * @export
 */
enum GdprStorage{
    /**
     * No storage
     */
    None = 0b1,

    /**
     * Cookie-based storage
     */
    Cookie = 0b10,

    /**
     * Storage in localStorage
     */
    LocalStorage = 0b100,

    /**
     * Storage in sessionStorage
     */
    SessionStorage = 0b1000,

    /**
     * Storage in indexedDb
     */
    IndexedDb = 0b10000,

    /**
     * Storage on client-side filesystem
     */
    FileSystem = 0b10000,

    /**
     * Storage on server (session, DB, cloud, etc...)
     */
    ServerStorage = 0b10000,

    /**
     * All storage
     */
    All = Cookie | LocalStorage | SessionStorage | IndexedDb | FileSystem | ServerStorage,
}

const storageFromOrdinal = (key: number): GdprStorage|null => {
    // Thank you very much typescript
    switch(true){
        case key == GdprStorage.All:
            return GdprStorage.All;

        case key == GdprStorage.None:
            return GdprStorage.None;

        case key == GdprStorage.Cookie:
            return GdprStorage.Cookie;

        case key == GdprStorage.LocalStorage:
            return GdprStorage.LocalStorage;

        case key == GdprStorage.SessionStorage:
            return GdprStorage.SessionStorage;

        case key == GdprStorage.IndexedDb:
            return GdprStorage.IndexedDb;

        case key == GdprStorage.FileSystem:
            return GdprStorage.FileSystem;

        case key == GdprStorage.ServerStorage:
            return GdprStorage.ServerStorage;

        default:
            return null;
    }
};

export {
    GdprStorage,
    storageFromOrdinal,
}