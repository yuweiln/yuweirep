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
const path = require("path");
const vscode = require("vscode");
const toolsPackageSymbolsRequest_1 = require("../langserver/toolsPackageSymbolsRequest");
const azSymbolInformation_1 = require("./azSymbolInformation");
const azSymbolKind_1 = require("./azSymbolKind");
const alBaseServerSideLibrary_1 = require("./alBaseServerSideLibrary");
class ALAppSymbolsLibrary extends alBaseServerSideLibrary_1.ALBaseServerSideLibrary {
    constructor(context, sourceFilePath) {
        super(context);
        this.filePath = sourceFilePath;
        this.displayName = path.parse(sourceFilePath).base;
    }
    loadInternalAsync(forceReload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let request = new toolsPackageSymbolsRequest_1.ToolsPackageSymbolsRequest(this.filePath);
                let response = yield this._context.toolsLangServerClient.getAppPackageSymbols(request);
                if ((response) && (response.root))
                    this.rootSymbol = azSymbolInformation_1.AZSymbolInformation.fromAny(response.root);
                else
                    this.rootSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.Document, this.displayName);
                if (response)
                    this._libraryId = response.libraryId;
            }
            catch (e) {
                let msg = 'Loading symbols from file "' + this.filePath + '" failed.';
                if (e.message)
                    msg = msg + ' (' + e.message + ')';
                else
                    msg = msg + ' (UNDEFINED ERROR)';
                vscode.window.showErrorMessage(msg);
                return false;
            }
            return true;
        });
    }
}
exports.ALAppSymbolsLibrary = ALAppSymbolsLibrary;
//# sourceMappingURL=alAppSymbolsLibrary.js.map