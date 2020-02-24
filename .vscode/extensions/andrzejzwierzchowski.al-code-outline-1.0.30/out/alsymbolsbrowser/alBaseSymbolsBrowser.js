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
const baseWebViewEditor_1 = require("../webviews/baseWebViewEditor");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const alSymbolsBasedPageWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedPageWizard");
const alSymbolsBasedQueryWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedQueryWizard");
const alSymbolsBasedReportWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedReportWizard");
const alSymbolsBasedXmlPortWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedXmlPortWizard");
const alSymbolsBasedPageExtWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedPageExtWizard");
const alSymbolsBasedTableExtWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedTableExtWizard");
const alSyntaxHelper_1 = require("../allanguage/alSyntaxHelper");
const symbolsTreeView_1 = require("../symbolstreeview/symbolsTreeView");
const textEditorHelper_1 = require("../tools/textEditorHelper");
/** Base class for AL Object and AL Symbol browsers */
class ALBaseSymbolsBrowser extends baseWebViewEditor_1.BaseWebViewEditor {
    constructor(devToolsContext, library) {
        let name = library.displayName;
        if (name == '')
            name = 'AL Object Browser';
        super(devToolsContext.vscodeExtensionContext, library.displayName);
        this._devToolsContext = devToolsContext;
        this._library = library;
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        switch (message.command) {
            case 'definition':
                this.goToDefinition(message.path);
                return true;
            case 'shownewtab':
                this.showNewTab(message.path);
                break;
            case 'runinwebclient':
                this.runInWebClient(message.path);
                return true;
            case 'newcardpage':
                this.createPage(message.path, message.selpaths, "Card");
                return true;
            case 'newlistpage':
                this.createPage(message.path, message.selpaths, "List");
                return true;
            case 'newreport':
                this.createReport(message.path, message.selpaths);
                return true;
            case 'newxmlport':
                this.createXmlPort(message.path, message.selpaths);
                return true;
            case 'newquery':
                this.createQuery(message.path, message.selpaths);
                return true;
            case 'extendtable':
                this.createTableExt(message.path, message.selpaths);
                return true;
            case 'extendpage':
                this.createPageExt(message.path, message.selpaths);
                return true;
            case 'copysel':
                this.copySelected(message.path, message.selpaths);
                return true;
        }
        return false;
    }
    getObjectsFromPath(selPaths, kind) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!selPaths)
                return undefined;
            let objList = yield this._library.getSymbolsListByPathAsync(selPaths, kind);
            if (!objList)
                return undefined;
            if (objList.length > 100) {
                let action = yield vscode.window.showWarningMessage(`You are about to run this command for ${selPaths.length} objects. Do you want to continue?`, { modal: true }, 'Yes', 'No');
                if (action !== 'Yes') {
                    return undefined;
                }
            }
            return objList;
        });
    }
    copySelected(path, selPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolList = yield this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.AnyALObject);
            if (symbolList) {
                let objectsText = 'Type\tId\tName';
                for (let i = 0; i < symbolList.length; i++) {
                    symbolList[i];
                    objectsText += ('\n' +
                        symbolList[i].getObjectTypeName() + '\t' +
                        symbolList[i].id.toString() + '\t' +
                        symbolList[i].name);
                }
                vscode.env.clipboard.writeText(objectsText);
            }
        });
    }
    createPage(path, selPaths, pageType) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolList = yield this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.TableObject);
            if (symbolList) {
                let builder = new alSymbolsBasedPageWizard_1.ALSymbolsBasedPageWizard();
                yield builder.showWizard(symbolList, pageType);
            }
        });
    }
    createQuery(path, selPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolList = yield this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.TableObject);
            if (symbolList) {
                let builder = new alSymbolsBasedQueryWizard_1.ALSymbolsBasedQueryWizard();
                builder.showWizard(symbolList);
            }
        });
    }
    createReport(path, selPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolList = yield this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.TableObject);
            if (symbolList) {
                let builder = new alSymbolsBasedReportWizard_1.ALSymbolsBasedReportWizard();
                builder.showWizard(symbolList);
            }
        });
    }
    createXmlPort(path, selPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolList = yield this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.TableObject);
            if (symbolList) {
                let builder = new alSymbolsBasedXmlPortWizard_1.ALSymbolsBasedXmlPortWizard();
                builder.showWizard(symbolList);
            }
        });
    }
    createPageExt(path, selPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolList = yield this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.PageObject);
            if (symbolList) {
                let builder = new alSymbolsBasedPageExtWizard_1.ALSymbolsBasedPageExtWizard();
                builder.showWizard(symbolList);
            }
        });
    }
    createTableExt(path, selPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolList = yield this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.TableObject);
            if (symbolList) {
                let builder = new alSymbolsBasedTableExtWizard_1.ALSymbolsBasedTableExtWizard();
                builder.showWizard(symbolList);
            }
        });
    }
    showNewTab(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let alSymbolList = yield this._library.getSymbolsListByPathAsync([path], azSymbolKind_1.AZSymbolKind.AnyALObject);
            if ((alSymbolList) && (alSymbolList.length > 0)) {
                let symbolsTreeView = new symbolsTreeView_1.SymbolsTreeView(this._devToolsContext, 'lib://' + alSymbolList[0].fullName, undefined);
                symbolsTreeView.setSymbols(alSymbolList[0], alSymbolList[0].fullName);
                symbolsTreeView.show();
            }
        });
    }
    goToDefinition(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let alSymbolList = yield this._library.getSymbolsListByPathAsync([path], azSymbolKind_1.AZSymbolKind.AnyALObject);
            if ((alSymbolList) && (alSymbolList.length > 0)) {
                let preview = !vscode.workspace.getConfiguration('alOutline').get('openDefinitionInNewTab');
                let targetLocation = undefined;
                let alSymbol = alSymbolList[0];
                //get data type name
                let typeName = alSyntaxHelper_1.ALSyntaxHelper.kindToVariableType(alSymbol.kind);
                if (!typeName) {
                    let typeName = alSyntaxHelper_1.ALSyntaxHelper.kindToWorkspaceSymbolType(alSymbol.kind);
                    if (!typeName) {
                        vscode.window.showErrorMessage('This object type is not supported.');
                        return;
                    }
                    targetLocation = yield this._devToolsContext.alLangProxy.getWorkspaceSymbol(typeName, alSymbol.name);
                }
                else
                    targetLocation = yield this._devToolsContext.alLangProxy.getDefinitionLocation(typeName, alSymbol.name);
                if (targetLocation) {
                    textEditorHelper_1.TextEditorHelper.openEditor(targetLocation.uri, true, preview, targetLocation.range.start);
                }
                else {
                    vscode.window.showErrorMessage('Object definition is not available.');
                }
            }
        });
    }
    runInWebClient(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let alSymbolList = yield this._library.getSymbolsListByPathAsync([path], azSymbolKind_1.AZSymbolKind.AnyALObject);
            if ((alSymbolList) && (alSymbolList.length > 0)) {
                this._devToolsContext.objectRunner.runSymbolAsync(alSymbolList[0]);
            }
        });
    }
    onPanelClosed() {
        this._library.unloadAsync();
    }
}
exports.ALBaseSymbolsBrowser = ALBaseSymbolsBrowser;
//# sourceMappingURL=alBaseSymbolsBrowser.js.map