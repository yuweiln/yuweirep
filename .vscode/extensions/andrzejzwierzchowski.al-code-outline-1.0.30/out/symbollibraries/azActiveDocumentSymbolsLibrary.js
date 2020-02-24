"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const azDocumentSymbolsLibrary_1 = require("./azDocumentSymbolsLibrary");
class AZActiveDocumentSymbolsLibrary extends azDocumentSymbolsLibrary_1.AZDocumentSymbolsLibrary {
    constructor(context) {
        super(context, undefined);
        this._autoReload = true;
        //active document changed - symbols need reloading
        vscode.window.onDidChangeActiveTextEditor(editor => {
            this.onActiveDocumentChanged();
        });
        //active document content changed - symbols need update
        vscode.workspace.onDidChangeTextDocument(e => {
            if ((vscode.window.activeTextEditor) &&
                (e.document) &&
                (vscode.window.activeTextEditor.document.uri.fsPath == e.document.uri.fsPath))
                this.onActiveDocumentChanged();
        });
        //document saved - symbols should be reloaded because document could be formatted
        vscode.workspace.onDidSaveTextDocument(document => {
            if ((vscode.window.activeTextEditor) &&
                (document) &&
                (vscode.window.activeTextEditor.document.uri.fsPath == document.uri.fsPath))
                this.onActiveDocumentChanged();
        });
    }
    onActiveDocumentChanged() {
        if (vscode.window.activeTextEditor)
            this.setDocUri(vscode.window.activeTextEditor.document.uri);
        else
            this.setDocUri(undefined);
        if (this._autoReload)
            this.loadAsync(false);
    }
    onActiveDocumentContentChanged() {
        this._reloadRequired = true;
        if (this._autoReload)
            this.loadAsync(false);
    }
}
exports.AZActiveDocumentSymbolsLibrary = AZActiveDocumentSymbolsLibrary;
//# sourceMappingURL=azActiveDocumentSymbolsLibrary.js.map