"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ALCodeFix {
    constructor() {
        this.diagnosticCode = "";
    }
    createFix(document, diagnostic) {
        return new vscode.CodeAction('');
    }
}
exports.ALCodeFix = ALCodeFix;
//# sourceMappingURL=alCodeFix.js.map