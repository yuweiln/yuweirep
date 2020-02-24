"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alCodeCopCodeAction_1 = require("./alCodeCopCodeAction");
class ALCodeAnalyzerFix {
    constructor(_context) {
        this.context = _context;
    }
    loadActions() {
        return __awaiter(this, void 0, void 0, function* () {
            // Load Code Actions
            this.context.subscriptions.push(vscode.languages.registerCodeActionsProvider('al', new alCodeCopCodeAction_1.CodeCopCodeActions(), {
                providedCodeActionKinds: alCodeCopCodeAction_1.CodeCopCodeActions.providedCodeActionKinds
            }));
            // Others
            this.context.subscriptions.push(vscode.commands.registerCommand('azALDevTools.SpreadApplicationArea', () => {
                let Areas = ["Basic", "FixedAsset", "All", "Custom"];
                //ask for Application Area Type
                vscode.window.showQuickPick(Areas, {
                    canPickMany: false,
                    placeHolder: 'Select Application Area'
                }).then(val => {
                    if (val === "Custom") {
                        vscode.window.showInputBox({
                            placeHolder: "Enter your custom Application Area"
                        }).then(valCust => this.InsertApplicationArea(valCust));
                    }
                    else {
                        this.InsertApplicationArea(val);
                    }
                });
            }));
        });
    }
    InsertApplicationArea(val) {
        if (!vscode.window.activeTextEditor)
            return;
        var text = vscode.window.activeTextEditor.document.getText();
        if (!text)
            return;
    }
}
exports.ALCodeAnalyzerFix = ALCodeAnalyzerFix;
//# sourceMappingURL=AlCodeAnalyzerFix.js.map