declare enum GdprStorage {
    None = 1,
    Cookie = 2,
    LocalStorage = 4,
    SessionStorage = 8,
    IndexedDb = 16,
    FileSystem = 16,
    ServerStorage = 16,
    All = 30
}
export { GdprStorage, };
