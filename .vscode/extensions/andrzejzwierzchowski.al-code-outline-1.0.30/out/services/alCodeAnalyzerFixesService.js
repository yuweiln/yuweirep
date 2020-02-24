"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alCAFixesCodeActionsProvider_1 = require("../canalyzerfixes/alCAFixesCodeActionsProvider");
class ALCodeActionsService {
    constructor(context) {
        this._context = context;
        this._alCACodeActionsProvider = new alCAFixesCodeActionsProvider_1.ALCAFixesCodeActionsProvider();
        this._context.vscodeExtensionContext.subscriptions.push(vscode.languages.registerCodeActionsProvider('al', this._alCACodeActionsProvider));
    }
}
exports.ALCodeActionsService = ALCodeActionsService;
//# sourceMappingURL=alCodeAnalyzerFixesService.js.map