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

export {
    GdprStorage,
}