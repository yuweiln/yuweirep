'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const azSymbolKind_1 = require("./azSymbolKind");
class AZSymbolsLibrary {
    constructor() {
        this._onSymbolsChanged = new vscode.EventEmitter();
        this.onSymbolsChanged = this._onSymbolsChanged.event;
        this.showObjectIds = false;
        this.displayName = '';
        this.name = '';
        this.rootSymbol = undefined;
        this._twoWayTree = false;
    }
    loadAsync(forceReload) {
        return __awaiter(this, void 0, void 0, function* () {
            let loaded = yield this.loadInternalAsync(forceReload);
            if (loaded)
                this.updateObjectList();
            if ((loaded) && (this._onSymbolsChanged))
                this._onSymbolsChanged.fire(this);
            return loaded;
        });
    }
    setRootSymbol(symbol) {
        this.rootSymbol = symbol;
        if (this._onSymbolsChanged)
            this._onSymbolsChanged.fire(this);
    }
    loadInternalAsync(forceReload) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    unloadAsync() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    clear() {
        this.displayName = '';
        this.name = '';
        this.clearSymbols();
    }
    clearSymbols() {
        this.rootSymbol = undefined;
    }
    updateObjectList() {
        if (this.rootSymbol) {
            this.rootSymbol.updateTree(true, this._twoWayTree);
        }
    }
    getSymbolsListByPathAsync(pathList, kind) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolList = [];
            for (let i = 0; i < pathList.length; i++) {
                let symbol = this.getSymbolByPath(pathList[i]);
                if ((symbol) && ((kind == azSymbolKind_1.AZSymbolKind.Undefined) || (symbol.kind == kind) || ((kind == azSymbolKind_1.AZSymbolKind.AnyALObject) && (symbol.isALObject()))))
                    symbolList.push(symbol);
            }
            return symbolList;
        });
    }
    getSymbolByPath(path) {
        return this.getSymbolByPathWithRoot(this.rootSymbol, path);
    }
    getSymbolByPathWithRoot(root, path) {
        if ((root) && (path) && (path.length > 0)) {
            let symbol = this.rootSymbol;
            for (let i = path.length - 1; i >= 0; i--) {
                if ((!symbol.childSymbols) || (path[i] >= symbol.childSymbols.length))
                    return undefined;
                if (path[i] == -1)
                    symbol = this.rootSymbol;
                else
                    symbol = symbol.childSymbols[path[i]];
            }
            return symbol;
        }
        return undefined;
    }
    //#region Symbols search
    findNextSymbol(line) {
        if ((this.rootSymbol) && (this.rootSymbol.childSymbols)) {
            for (let i = 0; i < this.rootSymbol.childSymbols.length; i++) {
                let found = this.findNextSymbolInt(this.rootSymbol.childSymbols[i], line);
                if (found)
                    return found;
            }
        }
        return undefined;
    }
    findNextSymbolInt(symbol, line) {
        if ((symbol.range) && (symbol.range.start.line <= line) && (symbol.range.end.line >= line)) {
            if ((symbol.selectionRange) && (symbol.selectionRange.start.line >= line))
                return symbol;
            if (symbol.childSymbols) {
                for (let i = 0; i < symbol.childSymbols.length; i++) {
                    let found = this.findNextSymbolInt(symbol.childSymbols[i], line);
                    if (found)
                        return found;
                }
            }
        }
        return undefined;
    }
    findSymbolInRange(range) {
        if (!this.rootSymbol)
            return undefined;
        return this.findSymbolInRangeInt(this.rootSymbol, range, undefined);
    }
    findSymbolPathInRange(range) {
        if ((range) && (this.rootSymbol)) {
            let symbolsPath = [];
            this.findSymbolInRangeInt(this.rootSymbol, range, symbolsPath);
            if (symbolsPath.length > 0)
                return symbolsPath;
        }
        return undefined;
    }
    findSymbolPathInSelectionRange(range) {
        if ((range) && (this.rootSymbol)) {
            let symbolsPath = [];
            this.findSymbolInSelectionRangeInt(this.rootSymbol, range, symbolsPath);
            if (symbolsPath.length > 0)
                return symbolsPath;
        }
        return undefined;
    }
    findSymbolInRangeInt(symbol, range, symbolsPath) {
        let found = undefined;
        if (symbol.range.intersectVsRange(range)) {
            found = symbol;
        }
        if (symbol.childSymbols) {
            for (let i = 0; i < symbol.childSymbols.length; i++) {
                let foundChild = this.findSymbolInRangeInt(symbol.childSymbols[i], range, symbolsPath);
                if (foundChild) {
                    if (symbolsPath)
                        symbolsPath.push(i);
                    return foundChild;
                }
            }
        }
        return found;
    }
    findSymbolInSelectionRangeInt(symbol, range, symbolsPath) {
        let found = undefined;
        if (symbol.selectionRange) {
            if (symbol.selectionRange.intersectVsRange(range))
                found = symbol;
        }
        else if ((symbol.range) && (symbol.range.intersectVsRange(range)))
            found = symbol;
        if (symbol.childSymbols) {
            for (let i = 0; i < symbol.childSymbols.length; i++) {
                let foundChild = this.findSymbolInSelectionRangeInt(symbol.childSymbols[i], range, symbolsPath);
                if (foundChild) {
                    if (symbolsPath)
                        symbolsPath.push(i);
                    return foundChild;
                }
            }
        }
        return found;
    }
}
exports.AZSymbolsLibrary = AZSymbolsLibrary;
//# sourceMappingURL=azSymbolsLibrary.js.map