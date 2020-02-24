"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alCodeFix_1 = require("./alCodeFix");
class ALCodeCopFixAA0008 extends alCodeFix_1.ALCodeFix {
    constructor() {
        super();
        this.diagnosticCode = "AA0008";
    }
    createFix(document, diagnostic) {
        const fix = new vscode.CodeAction(`Add parentheses`, vscode.CodeActionKind.QuickFix);
        fix.edit = new vscode.WorkspaceEdit();
        fix.diagnostics = [diagnostic];
        let currRange = diagnostic.range;
        fix.edit.insert(document.uri, new vscode.Position(currRange.end.line, currRange.end.character), '()');
        fix.isPreferred = true;
        return fix;
    }
}
exports.ALCodeCopFixAA0008 = ALCodeCopFixAA0008;
//# sourceMappingURL=alCodeCopFixAA0008.js.map