"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const caRulesViewer_1 = require("../carulesviewer/caRulesViewer");
class CodeAnalyzersService {
    constructor(newContext) {
        this._context = newContext;
        this._codeAnalyzersViewer = undefined;
        this.registerCommands();
    }
    registerCommands() {
        //code analyzers
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showCodeAnalyzers', () => {
            this.showCodeAnalyzersRules();
        }));
    }
    showCodeAnalyzersRules() {
        if (!this._codeAnalyzersViewer) {
            this._codeAnalyzersViewer = new caRulesViewer_1.CARulesViewer(this._context);
            this._codeAnalyzersViewer.show();
        }
        else {
            this._codeAnalyzersViewer.reveal();
        }
    }
    onCodeAnalyzersViewerClosed() {
        this._codeAnalyzersViewer = undefined;
    }
}
exports.CodeAnalyzersService = CodeAnalyzersService;
//# sourceMappingURL=codeAnalyzersService.js.map