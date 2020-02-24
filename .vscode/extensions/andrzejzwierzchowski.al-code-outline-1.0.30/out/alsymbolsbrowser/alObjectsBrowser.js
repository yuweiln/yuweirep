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
const path = require("path");
const alBaseSymbolsBrowser_1 = require("./alBaseSymbolsBrowser");
const alSymbolsBrowser_1 = require("./alSymbolsBrowser");
const azSymbolInformation_1 = require("../symbollibraries/azSymbolInformation");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const alObjectBrowserItem_1 = require("./alObjectBrowserItem");
/**
 * AL Objects Browser
 * allows to browse AL objects in a flat list like in the Object Designer in Dynamics Nav
 */
class ALObjectsBrowser extends alBaseSymbolsBrowser_1.ALBaseSymbolsBrowser {
    constructor(devToolsContext, library) {
        super(devToolsContext, library);
        this._itemsList = [];
        this._showLibraries = false;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'objectbrowser', 'objectbrowser.html');
    }
    getViewType() {
        return 'azALDevTools.ALObjectsBrowser';
    }
    onDocumentLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            //load library
            yield this._library.loadAsync(false);
            //let objectData : ALObjectsBrowserData = new ALObjectsBrowserData(this._library);
            this._itemsList = [];
            this._showLibraries = false;
            if (this._library.rootSymbol)
                this.collectSymbols(this._library.rootSymbol, '');
            //send data to the web view
            this.sendMessage({
                command: 'setData',
                data: this._itemsList,
                showLibraries: this._showLibraries
            });
        });
    }
    collectSymbols(symbol, libraryName) {
        if (symbol.isALObject()) {
            this._itemsList.push(new alObjectBrowserItem_1.ALObjectBrowserItem(symbol.kind, symbol.id, symbol.name, libraryName, symbol.getPath()));
        }
        else if (symbol.childSymbols) {
            if (symbol.kind == azSymbolKind_1.AZSymbolKind.Package) {
                libraryName = symbol.name;
                if ((!this._showLibraries) && (this._itemsList.length > 0))
                    this._showLibraries = true;
            }
            for (let i = 0; i < symbol.childSymbols.length; i++) {
                symbol.childSymbols[i].parent = symbol;
                this.collectSymbols(symbol.childSymbols[i], libraryName);
            }
        }
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        switch (message.command) {
            case 'showTreeView':
                this.showTreeView();
                break;
            case 'currRowChanged':
                this.updatePivotObjCommand(message.path);
                return true;
        }
        return false;
    }
    updatePivotObjCommand(symbolPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let rootSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.Document, 'Symbol');
            if ((symbolPath) && (symbolPath.length > 0)) {
                let pathList = [symbolPath];
                let symbolList = yield this._library.getSymbolsListByPathAsync(pathList, azSymbolKind_1.AZSymbolKind.AnyALObject);
                if ((symbolList) && (symbolList.length > 0))
                    rootSymbol.addChildItem(symbolList[0]);
            }
            this._devToolsContext.activeDocumentSymbols.setRootSymbol(rootSymbol);
        });
    }
    showTreeView() {
        this._devToolsContext.setUseSymbolsBrowser(true);
        this._panel.dispose();
        let objectBrowser = new alSymbolsBrowser_1.ALSymbolsBrowser(this._devToolsContext, this._library);
        objectBrowser.show();
    }
    //#region Filter View
    filterObjects(column, currentIdFilter, currentNameFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (column == "Type") {
                const objTypes = ['Table', 'Page', 'Report', 'XmlPort', 'Query', 'Codeunit', 'ControlAddIn', 'PageExtension', 'TableExtension', 'Profile', 'PageCustomization', 'Enum', 'DotNetPackage'];
                const values = yield vscode.window.showQuickPick(objTypes, { canPickMany: true, placeHolder: 'Select the object type(s) to filter on.' });
                if (values) {
                    this.sendMessage({
                        msgtype: 'filterObjects',
                        column: column,
                        filterSet: values
                    });
                }
            }
            else if (column == "ID") {
                let regexp = new RegExp('^\s*|(((((=?)|(<>)|(>)|(>=)|(<)|(<=)|(\\.\\.))\s*[0-9]+)|([0-9]+\s*\\.\\.\s*[0-9]*))(\s*((\\|)|(&))\s*(((=?)|(<>)|(>)|(>=)|(<)|(<=)|(\\.\\.))\s*[0-9]+\s*)|([0-9]+\s*\\.\\.\s*[0-9]*))*)$');
                const filterExpr = yield vscode.window.showInputBox({
                    value: currentIdFilter,
                    prompt: 'Please enter an ID filter expression (e.g., "10..20|>=50").',
                    ignoreFocusOut: true,
                    validateInput: (text) => {
                        if (!regexp.test(text)) {
                            return 'Valid operators for ID filter are: |, &, =, <>, >, >=, <, <=, ..';
                        }
                        else {
                            return undefined;
                        }
                    }
                });
                if (filterExpr !== undefined) {
                    this.sendMessage({
                        msgtype: 'filterObjects',
                        column: column,
                        filterExpr: filterExpr
                    });
                }
            }
            else if (column == "Name") {
                let regexp = new RegExp('^\s*|((@?((=?)|(<>))[^\(\)=<>&\|@]+)(\s*((\\|)|(&))\s*(@?((=?)|(<>))[^\(\)=<>&\|@]+))*)$');
                const filterExpr = yield vscode.window.showInputBox({
                    value: currentNameFilter,
                    prompt: 'Please enter a filter expression (e.g., "<>@Item*").',
                    ignoreFocusOut: true,
                    validateInput: (text) => {
                        if (!regexp.test(text)) {
                            return 'Valid operators for Name filter are: |, &, =, <>, @, ?, *';
                        }
                        else {
                            return undefined;
                        }
                    }
                });
                if (filterExpr !== undefined) {
                    this.sendMessage({
                        msgtype: 'filterObjects',
                        column: column,
                        filterExpr: filterExpr
                    });
                }
            }
            else if (column == "Package") {
                let regexp = new RegExp('^\s*|((@?((=?)|(<>))[^\(\)=<>&\|@]+)(\s*((\\|)|(&))\s*(@?((=?)|(<>))[^\(\)=<>&\|@]+))*)$');
                const filterExpr = yield vscode.window.showInputBox({
                    value: currentNameFilter,
                    prompt: 'Please enter a filter expression (e.g., "<>@Application*").',
                    ignoreFocusOut: true,
                    validateInput: (text) => {
                        if (!regexp.test(text)) {
                            return 'Valid operators for Package filter are: |, &, =, <>, @, ?, *';
                        }
                        else {
                            return undefined;
                        }
                    }
                });
                if (filterExpr !== undefined) {
                    this.sendMessage({
                        msgtype: 'filterObjects',
                        column: column,
                        filterExpr: filterExpr
                    });
                }
            }
        });
    }
}
exports.ALObjectsBrowser = ALObjectsBrowser;
//# sourceMappingURL=alObjectsBrowser.js.map