enum GdprStorage{
    None = 0b1,
    Cookie = 0b10,
    LocalStorage = 0b100,
    SessionStorage = 0b1000,
    IndexedDb = 0b10000,
    FileSystem = 0b10000,
    ServerStorage = 0b10000,
    All = Cookie | LocalStorage | SessionStorage | IndexedDb | FileSystem | ServerStorage,
}

export {
    GdprStorage,
}