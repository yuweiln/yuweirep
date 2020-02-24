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
const vscode = require("vscode");
const docToolsWebView_1 = require("./docToolsWebView");
const azSymbolsLibrary_1 = require("../symbollibraries/azSymbolsLibrary");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const textEditorHelper_1 = require("../tools/textEditorHelper");
class BaseSymbolsWebView extends docToolsWebView_1.DocToolsWebView {
    constructor(devToolsContext, documentName, documentUri) {
        super(devToolsContext, documentName, documentUri);
        this._sourceSymbolsLibrary = new azSymbolsLibrary_1.AZSymbolsLibrary();
        this._rootSymbol = undefined;
        this._copySymbols = false;
        this._selectedSymbolPath = undefined;
    }
    setSymbols(rootSymbol, rootSymbolName) {
        if ((rootSymbol) && (this._copySymbols)) {
            this._rootSymbol = rootSymbol.createCopy(true);
            if (rootSymbolName)
                this._rootSymbol.fullName = rootSymbolName;
        }
        else
            this._rootSymbol = rootSymbol;
        this._sourceSymbolsLibrary.setRootSymbol(rootSymbol);
        this.updateView();
    }
    updateView() {
        if (!this._loaded)
            return;
        this.sendMessage({
            command: 'setData',
            data: this._rootSymbol,
            selected: this._selectedSymbolPath
        });
        if (this._rootSymbol)
            this._selectedSymbolPath = undefined;
    }
    onDocumentLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            this._loaded = true;
            if (this._documentUri)
                yield this.loadSymbols();
            else
                yield this.updateView();
        });
    }
    loadSymbols() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        if (message) {
            switch (message.command) {
                case 'definition':
                    if (message.path)
                        this.goToDefinition(message.path);
                    return true;
                case 'symbolselected':
                    if (message.path)
                        this.onSymbolSelected(message.path);
                    return true;
                case 'refresh':
                    this.loadSymbols();
                    return true;
                case 'sync':
                    this.selectSymbolAtCursor();
                    return true;
            }
        }
        return false;
    }
    onSymbolSelected(symbolPath) {
        return __awaiter(this, void 0, void 0, function* () {
            this._selectedSymbolPath = symbolPath;
        });
    }
    goToDefinition(nodePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolList = yield this._sourceSymbolsLibrary.getSymbolsListByPathAsync([nodePath], azSymbolKind_1.AZSymbolKind.Undefined);
            if ((symbolList) && (symbolList.length > 0) && (symbolList[0].selectionRange)) {
                textEditorHelper_1.TextEditorHelper.openEditor(this._documentUri, true, true, new vscode.Position(symbolList[0].selectionRange.start.line, symbolList[0].selectionRange.start.character));
            }
        });
    }
    selectSymbolInRange(range) {
        this._selectedSymbolPath = this._sourceSymbolsLibrary.findSymbolPathInRange(range);
        if (this._selectedSymbolPath) {
            this.sendMessage({
                command: 'selectSymbol',
                selected: this._selectedSymbolPath
            });
        }
    }
    selectSymbolAtCursor() {
        let editor = textEditorHelper_1.TextEditorHelper.findDocumentEditor(this._documentUri);
        if (editor)
            this.selectSymbolInRange(editor.selection);
    }
}
exports.BaseSymbolsWebView = BaseSymbolsWebView;
//# sourceMappingURL=baseSymbolsWebView.js.map