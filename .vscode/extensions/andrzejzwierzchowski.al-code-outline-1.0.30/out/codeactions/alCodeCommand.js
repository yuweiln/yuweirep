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
class ALCodeCommand {
    constructor(context, commandName) {
        this._toolsExtensionContext = context;
        this.name = commandName;
        this._toolsExtensionContext.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand(commandName, () => this.run()));
    }
    run() {
        if (!vscode.window.activeTextEditor)
            return;
        let position = vscode.window.activeTextEditor.selection.active;
        let range = new vscode.Range(position, position);
        this.runAsync(range);
    }
    runAsync(range) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getDocumentUri() {
        return this._toolsExtensionContext.activeDocumentSymbols.getDocUri();
    }
}
exports.ALCodeCommand = ALCodeCommand;
//# sourceMappingURL=alCodeCommand.js.map