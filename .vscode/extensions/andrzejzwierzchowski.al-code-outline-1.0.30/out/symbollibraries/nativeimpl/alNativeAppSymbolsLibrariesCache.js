'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const alNativeAppSymbolsLibrary_1 = require("./alNativeAppSymbolsLibrary");
class ALNativeAppSymbolsLibrariesCache {
    constructor(context) {
        this._context = context;
        this._cache = [];
    }
    clear() {
        this._cache = [];
    }
    getOrCreate(filePath) {
        //try to find library
        for (let i = 0; i < this._cache.length; i++) {
            if (this._cache[i].filePath == filePath)
                return this._cache[i];
        }
        //create new library
        let library = new alNativeAppSymbolsLibrary_1.ALNativeAppSymbolsLibrary(this._context, filePath);
        this._cache.push(library);
        return library;
    }
}
exports.ALNativeAppSymbolsLibrariesCache = ALNativeAppSymbolsLibrariesCache;
//# sourceMappingURL=alNativeAppSymbolsLibrariesCache.js.map