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
const toolsProjectSymbolsRequest_1 = require("../langserver/toolsProjectSymbolsRequest");
const azSymbolInformation_1 = require("./azSymbolInformation");
const azSymbolKind_1 = require("./azSymbolKind");
const alBaseServerSideLibrary_1 = require("./alBaseServerSideLibrary");
class ALProjectSymbolsLibrary extends alBaseServerSideLibrary_1.ALBaseServerSideLibrary {
    constructor(context, newIncludeDependencies, newProjectPath) {
        super(context);
        this._projectPath = newProjectPath;
        this._includeDependencies = newIncludeDependencies;
        this.displayName = "Project Symbols";
    }
    loadInternalAsync(forceReload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let alPackagesPath = vscode.workspace.getConfiguration('al', null).get('packageCachePath');
                if (!alPackagesPath)
                    alPackagesPath = ".alpackages";
                let workspaceFoldersPaths = [];
                let folders = vscode.workspace.workspaceFolders;
                if (folders) {
                    for (let i = 0; i < folders.length; i++) {
                        if (folders[i].uri)
                            workspaceFoldersPaths.push(folders[i].uri.fsPath);
                    }
                }
                let request = new toolsProjectSymbolsRequest_1.ToolsProjectSymbolsRequest(this._includeDependencies, this._projectPath, alPackagesPath, workspaceFoldersPaths);
                let response = yield this._context.toolsLangServerClient.getProjectSymbols(request);
                if ((response) && (response.root))
                    this.rootSymbol = azSymbolInformation_1.AZSymbolInformation.fromAny(response.root);
                else
                    this.rootSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.ProjectDefinition, this.displayName);
                if (response)
                    this._libraryId = response.libraryId;
            }
            catch (e) {
                let msg = 'Loading project symbols failed.';
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
exports.ALProjectSymbolsLibrary = ALProjectSymbolsLibrary;
//# sourceMappingURL=alProjectSymbolsLibrary.js.map