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
const path = require("path");
const azDocumentSymbolsLibrary_1 = require("../symbollibraries/azDocumentSymbolsLibrary");
const baseSymbolsWebView_1 = require("../webviews/baseSymbolsWebView");
class SymbolsTreeView extends baseSymbolsWebView_1.BaseSymbolsWebView {
    constructor(devToolsContext, documentName, documentUri) {
        super(devToolsContext, documentName, documentUri);
        this._copySymbols = true;
        if (this._documentUri)
            this._disposables.push(this._devToolsContext.activeDocumentSymbols.onSymbolsChanged(symbolsLib => this.onSymbolsChanged(symbolsLib)));
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'symbolstreeview', 'symbolstreeview.html');
    }
    getViewType() {
        return 'azALDevTools.SymbolsTreeView';
    }
    loadSymbols() {
        return __awaiter(this, void 0, void 0, function* () {
            let currDocUri = this._devToolsContext.activeDocumentSymbols.getDocUri();
            if ((currDocUri) && (currDocUri.toString() == this._documentUri.toString()) && (this._devToolsContext.activeDocumentSymbols.rootSymbol)) {
                this._selectedSymbolPath = this._devToolsContext.activeDocumentSymbols.findSymbolPathInSelectionRange(this.selectedSymbolRange);
                this.setSymbols(this._devToolsContext.activeDocumentSymbols.rootSymbol, this._title);
            }
            else {
                let library = new azDocumentSymbolsLibrary_1.AZDocumentSymbolsLibrary(this._devToolsContext, this._documentUri);
                yield library.loadAsync(false);
                this._selectedSymbolPath = library.findSymbolPathInSelectionRange(this.selectedSymbolRange);
                this.setSymbols(library.rootSymbol, this._title);
            }
        });
    }
    onSymbolsChanged(lib) {
        if (this._devToolsContext.activeDocumentSymbols.getDocUri().path == this._documentUri.path) {
            this._selectedSymbolPath = undefined;
            this.setSymbols(this._devToolsContext.activeDocumentSymbols.rootSymbol, this._title);
        }
    }
    onPanelClosed() {
        if (this._documentUri)
            this._devToolsContext.alSymbolsTreeService.removeUriSymbolsTreeView(this._documentUri);
    }
}
exports.SymbolsTreeView = SymbolsTreeView;
//# sourceMappingURL=symbolsTreeView.js.map