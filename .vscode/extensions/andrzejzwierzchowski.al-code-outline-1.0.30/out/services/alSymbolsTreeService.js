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
const symbolsTreeView_1 = require("../symbolstreeview/symbolsTreeView");
const syntaxTreeView_1 = require("../syntaxtreeview/syntaxTreeView");
class ALSymbolsTreeService {
    constructor(newContext) {
        //initialize
        this._context = newContext;
        this._uriSymbolTreeViews = {};
        //register commands
        this.registerCommands();
    }
    registerCommands() {
        let that = this;
        //outline preview window
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showDocumentSymbols', () => that.showEditorSymbolsTreeView()));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.goToDefinitionSymbolTree', () => that.goToDefinitionSymbolTree()));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showSyntaxTree', () => that.showSyntaxTreeAnalyzer()));
    }
    showSyntaxTreeAnalyzer() {
        let editor = vscode.window.activeTextEditor;
        if ((editor) && (editor.document) && (editor.document.uri)) {
            let syntaxTree = new syntaxTreeView_1.SyntaxTreeView(this._context, editor.document.uri);
            syntaxTree.show();
        }
    }
    showEditorSymbolsTreeView() {
        let editor = vscode.window.activeTextEditor;
        if ((editor) && (editor.document) && (editor.document.uri))
            this.showDocumentSymbols(editor.document.uri, undefined);
    }
    showDocumentSymbols(docUri, range) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolsTreeView = this._uriSymbolTreeViews[docUri.toString()];
            if (!symbolsTreeView) {
                symbolsTreeView = new symbolsTreeView_1.SymbolsTreeView(this._context, undefined, docUri);
                symbolsTreeView.selectedSymbolRange = range;
                this.addUriSymbolsTreeView(docUri, symbolsTreeView);
                symbolsTreeView.show();
            }
            else {
                symbolsTreeView.reveal();
                if (range)
                    symbolsTreeView.selectSymbolInRange(range);
            }
        });
    }
    goToDefinitionSymbolTree() {
        return __awaiter(this, void 0, void 0, function* () {
            let editor = vscode.window.activeTextEditor;
            if ((editor) && (editor.document) && (editor.document.uri)) {
                let locationList = yield vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: 'Loading object definition'
                }, (progress) => __awaiter(this, void 0, void 0, function* () {
                    return yield vscode.commands.executeCommand('vscode.executeDefinitionProvider', editor.document.uri, editor.selection.start);
                }));
                if ((locationList) && (locationList.length > 0)) {
                    let range = locationList[0].range;
                    this.showDocumentSymbols(locationList[0].uri, range);
                }
                else
                    this.showDocumentSymbols(editor.document.uri, undefined);
            }
        });
    }
    addUriSymbolsTreeView(uri, symbolsTreeView) {
        this._uriSymbolTreeViews[uri.toString()] = symbolsTreeView;
    }
    removeUriSymbolsTreeView(uri) {
        this._uriSymbolTreeViews[uri.toString()] = undefined;
    }
}
exports.ALSymbolsTreeService = ALSymbolsTreeService;
//# sourceMappingURL=alSymbolsTreeService.js.map