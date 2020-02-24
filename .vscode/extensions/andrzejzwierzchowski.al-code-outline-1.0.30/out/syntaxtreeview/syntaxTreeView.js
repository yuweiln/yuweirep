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
const path = require("path");
const azSymbolInformation_1 = require("../symbollibraries/azSymbolInformation");
const toolsGetSyntaxTreeRequest_1 = require("../langserver/toolsGetSyntaxTreeRequest");
const textEditorHelper_1 = require("../tools/textEditorHelper");
const toolsGetSyntaxTreeSymbolRequest_1 = require("../langserver/toolsGetSyntaxTreeSymbolRequest");
const toolsCloseSyntaxTreeRequest_1 = require("../langserver/toolsCloseSyntaxTreeRequest");
const baseSymbolsWebView_1 = require("../webviews/baseSymbolsWebView");
class SyntaxTreeView extends baseSymbolsWebView_1.BaseSymbolsWebView {
    constructor(devToolsContext, documentUri) {
        super(devToolsContext, undefined, documentUri);
        this._firstLoad = true;
        this._disposables.push(vscode.workspace.onDidChangeTextDocument(e => {
            if ((e.document) && (this._documentUri) &&
                (e.document.uri.fsPath == this._documentUri.fsPath))
                this.loadSymbols();
        }));
        vscode.window.onDidChangeActiveTextEditor(editor => {
            this.loadSymbols();
        });
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'syntaxtreeview', 'syntaxtreeview.html');
    }
    getViewType() {
        return 'azALDevTools.SyntaxTreeView';
    }
    loadSymbols() {
        return __awaiter(this, void 0, void 0, function* () {
            let editor = textEditorHelper_1.TextEditorHelper.findDocumentEditor(this._documentUri);
            let source = '';
            if (editor)
                source = editor.document.getText();
            let request = new toolsGetSyntaxTreeRequest_1.ToolsGetSyntaxTreeRequest(source, this._documentUri.fsPath, this._firstLoad);
            this._firstLoad = false;
            let response = yield this._devToolsContext.toolsLangServerClient.getSyntaxTree(request);
            if ((response) && (response.root)) {
                let rootSymbol = azSymbolInformation_1.AZSymbolInformation.fromAny(response.root);
                rootSymbol.updateTree(true, false);
                this.setSymbols(rootSymbol, undefined);
            }
            else
                this.setSymbols(undefined, undefined);
        });
    }
    onSymbolSelected(symbolPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = new toolsGetSyntaxTreeSymbolRequest_1.ToolsGetSyntaxTreeSymbolsRequest(this._documentUri.fsPath, symbolPath);
            let response = yield this._devToolsContext.toolsLangServerClient.getSyntaxTreeSymbol(request);
            if (response) {
                this.setSymbolInfo(response.symbol);
                if (response.symbol) {
                    let editor = textEditorHelper_1.TextEditorHelper.findDocumentEditor(this._documentUri);
                    if (editor) {
                        editor.selection = new vscode.Selection(response.symbol.range.start.line, response.symbol.range.start.character, response.symbol.range.end.line, response.symbol.range.end.character);
                        editor.revealRange(editor.selection);
                    }
                }
            }
            else
                this.setSymbolInfo(undefined);
        });
    }
    setSymbolInfo(symbol) {
        this.sendMessage({
            command: 'setSymbolInfo',
            data: symbol
        });
    }
    onPanelClosed() {
        super.onPanelClosed();
        let request = new toolsCloseSyntaxTreeRequest_1.ToolsCloseSyntaxTreeRequest(this._documentUri.fsPath);
        this._devToolsContext.toolsLangServerClient.closeSyntaxTree(request);
    }
}
exports.SyntaxTreeView = SyntaxTreeView;
//# sourceMappingURL=syntaxTreeView.js.map