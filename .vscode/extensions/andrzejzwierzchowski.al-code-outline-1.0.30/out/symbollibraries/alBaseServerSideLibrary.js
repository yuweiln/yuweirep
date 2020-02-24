"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const azSymbolsLibrary_1 = require("./azSymbolsLibrary");
const azSymbolInformation_1 = require("./azSymbolInformation");
const toolsLibrarySymbolsDetailsRequest_1 = require("../langserver/toolsLibrarySymbolsDetailsRequest");
const toolsCloseSymbolsLibraryRequest_1 = require("../langserver/toolsCloseSymbolsLibraryRequest");
class ALBaseServerSideLibrary extends azSymbolsLibrary_1.AZSymbolsLibrary {
    constructor(context) {
        super();
        this._context = context;
        this._libraryId = 0;
    }
    getSymbolsListByPathAsync(pathList, kind) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this._context.toolsLangServerClient.getLibrarySymbolsDetails(new toolsLibrarySymbolsDetailsRequest_1.ToolsLibrarySymbolsDetailsRequest(this._libraryId, kind, pathList));
            let symbolList = [];
            if ((data) && (data.symbols) && (data.symbols.length > 0)) {
                for (let i = 0; i < data.symbols.length; i++) {
                    let symbol = azSymbolInformation_1.AZSymbolInformation.fromAny(data.symbols[i]);
                    if (symbol) {
                        symbol.updateTree(true, this._twoWayTree);
                        symbolList.push(symbol);
                    }
                }
            }
            return symbolList;
        });
    }
    unloadAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            this._context.toolsLangServerClient.closeSymbolsLibrary(new toolsCloseSymbolsLibraryRequest_1.ToolsCloseSymbolsLibraryRequest(this._libraryId));
        });
    }
}
exports.ALBaseServerSideLibrary = ALBaseServerSideLibrary;
//# sourceMappingURL=alBaseServerSideLibrary.js.map