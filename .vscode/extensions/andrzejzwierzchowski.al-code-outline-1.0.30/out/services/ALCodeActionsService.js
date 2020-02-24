"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alCAFixesCodeActionsProvider_1 = require("../canalyzerfixes/alCAFixesCodeActionsProvider");
const alCodeActionsProvider_1 = require("../codeactions/alCodeActionsProvider");
class ALCodeActionsService {
    constructor(context) {
        this._context = context;
        //code analyzers fixes actions
        let alCAFixesCodeActionsProvider = new alCAFixesCodeActionsProvider_1.ALCAFixesCodeActionsProvider();
        this._context.vscodeExtensionContext.subscriptions.push(vscode.languages.registerCodeActionsProvider('al', alCAFixesCodeActionsProvider));
        //code actions
        let alCodeActionsProvider = new alCodeActionsProvider_1.ALCodeActionsProvider(this._context);
        this._context.vscodeExtensionContext.subscriptions.push(vscode.languages.registerCodeActionsProvider('al', alCodeActionsProvider));
    }
}
exports.ALCodeActionsService = ALCodeActionsService;
//# sourceMappingURL=ALCodeActionsService.js.map