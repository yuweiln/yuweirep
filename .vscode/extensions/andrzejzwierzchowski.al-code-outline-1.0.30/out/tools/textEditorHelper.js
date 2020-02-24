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
class TextEditorHelper {
    static findDocumentEditor(docUri) {
        if (docUri) {
            let docUriString = docUri.toString();
            if ((vscode.window.activeTextEditor) &&
                (vscode.window.activeTextEditor.document) &&
                (vscode.window.activeTextEditor.document.uri) &&
                (vscode.window.activeTextEditor.document.uri.toString() == docUriString))
                return vscode.window.activeTextEditor;
            let editors = vscode.window.visibleTextEditors;
            for (let i = 0; i < editors.length; i++) {
                if ((editors[i].document) && (editors[i].document.uri)) {
                    let editorUri = editors[i].document.uri.toString();
                    if (editorUri == docUriString) {
                        return editors[i];
                    }
                }
            }
        }
        return undefined;
    }
    static openEditor(docUri, reuseExisting, preview, position) {
        return __awaiter(this, void 0, void 0, function* () {
            let editorViewColumn = undefined;
            if (reuseExisting) {
                let editor = this.findDocumentEditor(docUri);
                if (editor)
                    editorViewColumn = editor.viewColumn;
            }
            try {
                let targetDoc = yield vscode.workspace.openTextDocument(docUri);
                let targetEditor = yield vscode.window.showTextDocument(targetDoc, {
                    preview: preview,
                    viewColumn: editorViewColumn
                });
                if (position) {
                    targetEditor.selection = new vscode.Selection(position, position);
                    targetEditor.revealRange(targetEditor.selection);
                }
                return targetEditor;
            }
            catch (e) {
                vscode.window.showErrorMessage(e.message);
            }
            return undefined;
        });
    }
    static showNewDocument(content, language) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let document = yield vscode.workspace.openTextDocument({
                    content: content,
                    language: language
                });
                vscode.window.showTextDocument(document, {
                    preview: false
                });
            }
            catch (e) {
                vscode.window.showErrorMessage(e.message);
            }
        });
    }
    static getActiveWorkspaceFolderUri() {
        let folder = undefined;
        if ((vscode.window.activeTextEditor) && (vscode.window.activeTextEditor.document) && (vscode.window.activeTextEditor.document.uri)) {
            folder = vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri);
            if ((folder) && (folder.uri))
                return folder.uri;
        }
        let editors = vscode.window.visibleTextEditors;
        for (let i = 0; i < editors.length; i++) {
            if ((editors[i].document) && (editors[i].document.uri)) {
                folder = vscode.workspace.getWorkspaceFolder(editors[i].document.uri);
                if ((folder) && (folder.uri))
                    return folder.uri;
            }
        }
        return vscode.workspace.workspaceFolders[0].uri;
    }
}
exports.TextEditorHelper = TextEditorHelper;
//# sourceMappingURL=textEditorHelper.js.map