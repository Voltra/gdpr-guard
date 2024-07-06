/**
 * The types of storage concerned by GDPR
 * @enum {number}
 * @export
 */
export declare enum GdprStorage {
    /**
     * No storage
     */
    None = 1,
    /**
     * Cookie-based storage
     */
    Cookie = 2,
    /**
     * Storage in localStorage
     */
    LocalStorage = 4,
    /**
     * Storage in sessionStorage
     */
    SessionStorage = 8,
    /**
     * Storage in indexedDb
     */
    IndexedDb = 16,
    /**
     * Storage on client-side filesystem
     */
    FileSystem = 32,
    /**
     * Storage on server (session, DB, cloud, etc...)
     */
    ServerStorage = 64,
    /**
     * All storage
     */
    All = 126
}
