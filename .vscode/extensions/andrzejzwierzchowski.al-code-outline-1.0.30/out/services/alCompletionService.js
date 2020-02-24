"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alDocCommentsProvider_1 = require("../editorextensions/alDocCommentsProvider");
class ALCompletionService {
    constructor(context) {
        this._context = context;
        //documentation completion provider
        this._alDocCommentsProvider = new alDocCommentsProvider_1.ALDocCommentsProvider(this._context);
        this._context.vscodeExtensionContext.subscriptions.push(vscode.languages.registerCompletionItemProvider('al', this._alDocCommentsProvider, '/'));
    }
}
exports.ALCompletionService = ALCompletionService;
//# sourceMappingURL=alCompletionService.js.map