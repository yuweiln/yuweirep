"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alCodeFix_1 = require("./alCodeFix");
class ALCodeCopFixAA0005 extends alCodeFix_1.ALCodeFix {
    constructor() {
        super();
        this.diagnosticCode = "AA0005";
    }
    createFix(document, diagnostic) {
        const fix = new vscode.CodeAction(`Remove begin..end`, vscode.CodeActionKind.QuickFix);
        fix.edit = new vscode.WorkspaceEdit();
        fix.diagnostics = [diagnostic];
        let currRange = diagnostic.range;
        let text = document.getText(diagnostic.range);
        let last = text.length;
        if (text[text.length - 1] == ';' || text[text.length - 1] === ';') {
            last = text.length - 4;
        }
        else {
            last = text.length - 3;
        }
        text = text.slice(5, last);
        fix.edit.replace(document.uri, currRange, text);
        fix.isPreferred = true;
        return fix;
    }
}
exports.ALCodeCopFixAA0005 = ALCodeCopFixAA0005;
//# sourceMappingURL=alCodeCopFIxAA0005.js.map