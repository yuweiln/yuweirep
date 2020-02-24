"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class CodeCopCodeActions {
    provideCodeActions(document, range, context, token) {
        // for each diagnostic entry that has the matching `code`, create a code action command
        let Actions = [];
        Actions = Actions.concat(context.diagnostics
            .filter(diagnostic => diagnostic.code === "AA0008")
            .map((d, i, arr) => this.createAA0008Fix(document, d)));
        Actions = Actions.concat(context.diagnostics
            .filter(diagnostic => diagnostic.code === "AA0005")
            .map((d, i, arr) => this.createAA0005Fix(document, d)));
        Actions = Actions.concat(context.diagnostics
            .filter(diagnostic => diagnostic.code === "AA0137")
            .map((d, i, arr) => this.createAA0137Fix(document, d)));
        Actions = Actions.concat(context.diagnostics
            .filter(diagnostic => diagnostic.code === "AA0139")
            .map((d, i, arr) => this.createAA0139Fix(document, d)));
        return Actions;
    }
    createAA0008Fix(document, diagnostic) {
    }
    createAA0137Fix(document, diagnostic) {
    }
    createAA0005Fix(document, diagnostic) {
    }
}
CodeCopCodeActions.providedCodeActionKinds = [
    vscode.CodeActionKind.SourceFixAll,
    vscode.CodeActionKind.QuickFix
];
exports.CodeCopCodeActions = CodeCopCodeActions;
//# sourceMappingURL=alCodeCopCodeAction.js.map