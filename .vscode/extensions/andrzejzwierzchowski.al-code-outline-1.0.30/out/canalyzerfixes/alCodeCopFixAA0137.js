"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alCodeFix_1 = require("./alCodeFix");
class ALCodeCopFixAA0137 extends alCodeFix_1.ALCodeFix {
    constructor() {
        super();
        this.diagnosticCode = "AA0137";
    }
    createFix(document, diagnostic) {
        const fix = new vscode.CodeAction(`Remove Variable`, vscode.CodeActionKind.QuickFix);
        fix.edit = new vscode.WorkspaceEdit();
        fix.diagnostics = [diagnostic];
        let currRange = diagnostic.range;
        let startPosition = new vscode.Position(currRange.start.line, currRange.start.character);
        let stopPosition = new vscode.Position(currRange.end.line + 1, 0);
        fix.edit.replace(document.uri, new vscode.Range(startPosition, stopPosition), "");
        fix.isPreferred = true;
        return fix;
    }
}
exports.ALCodeCopFixAA0137 = ALCodeCopFixAA0137;
//# sourceMappingURL=alCodeCopFixAA0137.js.map