/**
 * The types of storage concerned by GDPR
 * @enum {number}
 * @export
 */
declare enum GdprStorage {
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
    FileSystem = 16,
    /**
     * Storage on server (session, DB, cloud, etc...)
     */
    ServerStorage = 16,
    /**
     * All storage
     */
    All = 30
}
export { GdprStorage, };
