"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alCodeFix_1 = require("./alCodeFix");
class ALCodeCopFixAA0139 extends alCodeFix_1.ALCodeFix {
    constructor() {
        super();
        this.diagnosticCode = "AA0139";
    }
    createFix(document, diagnostic) {
        const fix = new vscode.CodeAction(`Add CopyStr`, vscode.CodeActionKind.QuickFix);
        fix.edit = new vscode.WorkspaceEdit();
        fix.diagnostics = [diagnostic];
        let currRange = diagnostic.range;
        let leftSideRange = new vscode.Range(currRange.start.line, 0, currRange.start.line, currRange.start.character);
        let leftSideText = document.getText(leftSideRange).trim();
        if (leftSideText.endsWith(':=')) {
            leftSideText = leftSideText.substr(0, leftSideText.length - 2).trim();
            if (leftSideText) {
                let stmt = "CopyStr(" + document.getText(currRange) + ", 1, MaxStrLen(" + leftSideText + "))";
                fix.edit.replace(document.uri, currRange, stmt);
                fix.isPreferred = true;
                return fix;
            }
        }
        return undefined;
    }
}
exports.ALCodeCopFixAA0139 = ALCodeCopFixAA0139;
//# sourceMappingURL=alCodeCopFixAA0139.js.map