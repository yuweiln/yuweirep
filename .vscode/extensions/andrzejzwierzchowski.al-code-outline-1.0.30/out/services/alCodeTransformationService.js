"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const appAreasModifier_1 = require("../alsyntaxmodifiers/appAreasModifier");
class ALCodeTransformationService {
    constructor(context) {
        this._context = context;
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.AddEditorApplicationAreas', () => {
            let appAreasModified = new appAreasModifier_1.AppAreasModifier(this._context);
            appAreasModified.AddMissingAppAreaToActiveEditor(undefined);
        }));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.AddProjectApplicationAreas', () => {
            let appAreasModified = new appAreasModifier_1.AppAreasModifier(this._context);
            appAreasModified.AddMissinAppAreaToWorkspace(undefined);
        }));
    }
}
exports.ALCodeTransformationService = ALCodeTransformationService;
//# sourceMappingURL=alCodeTransformationService.js.map