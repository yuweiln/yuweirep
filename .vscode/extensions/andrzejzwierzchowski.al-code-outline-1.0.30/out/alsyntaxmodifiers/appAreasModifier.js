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
const toolsAddAppAreasRequest_1 = require("../langserver/toolsAddAppAreasRequest");
const textEditorHelper_1 = require("../tools/textEditorHelper");
class AppAreasModifier {
    constructor(context) {
        this._context = context;
    }
    AddMissinAppAreaToWorkspace(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let confirmation = yield vscode.window.showInformationMessage('Do you want to add missing application areas to all files in the current project folder?', 'Yes', 'No');
            if (confirmation !== 'Yes')
                return;
            if (!name)
                name = yield this.getApplicationAreaName();
            if (!name)
                return;
            let workspaceUri = textEditorHelper_1.TextEditorHelper.getActiveWorkspaceFolderUri();
            vscode.workspace.saveAll();
            let request = new toolsAddAppAreasRequest_1.ToolsAddAppAreasRequest('', workspaceUri.fsPath, name);
            let response = yield this._context.toolsLangServerClient.addAppAreas(request);
            if (response) {
                if ((response.error) && (response.errorMessage))
                    vscode.window.showErrorMessage(response.errorMessage);
                else
                    vscode.window.showInformationMessage(response.noOfAppAreas.toString() +
                        ' application area(s) added to ' +
                        response.noOfFiles.toString() +
                        ' file(s).');
            }
        });
    }
    AddMissingAppAreaToActiveEditor(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name)
                name = yield this.getApplicationAreaName();
            if (!name)
                return;
            if (!vscode.window.activeTextEditor)
                return;
            var text = vscode.window.activeTextEditor.document.getText();
            if (!text)
                return;
            let request = new toolsAddAppAreasRequest_1.ToolsAddAppAreasRequest(text, '', name);
            let response = yield this._context.toolsLangServerClient.addAppAreas(request);
            if (response) {
                if ((response.error) && (response.errorMessage))
                    vscode.window.showErrorMessage(response.errorMessage);
                else if ((response.source) && (response.source != text) && (response.noOfAppAreas > 0)) {
                    text = response.source;
                    const edit = new vscode.WorkspaceEdit();
                    var firstLine = vscode.window.activeTextEditor.document.lineAt(0);
                    var lastLine = vscode.window.activeTextEditor.document.lineAt(vscode.window.activeTextEditor.document.lineCount - 1);
                    var textRange = new vscode.Range(0, firstLine.range.start.character, vscode.window.activeTextEditor.document.lineCount - 1, lastLine.range.end.character);
                    edit.replace(vscode.window.activeTextEditor.document.uri, textRange, text);
                    vscode.workspace.applyEdit(edit);
                    vscode.window.showInformationMessage(response.noOfAppAreas.toString() +
                        ' application area(s) added.');
                }
                else
                    vscode.window.showInformationMessage('There are no missing application areas.');
            }
        });
    }
    getApplicationAreaName() {
        return __awaiter(this, void 0, void 0, function* () {
            let appAreasList = ['Basic', 'FixedAsset', 'All', 'Custom'];
            //ask for Application Area Type
            let appAreaName = yield vscode.window.showQuickPick(appAreasList, {
                canPickMany: false,
                placeHolder: 'Select Application Area'
            });
            if (appAreaName === 'Custom')
                appAreaName = yield vscode.window.showInputBox({
                    placeHolder: "Enter your custom Application Area"
                });
            return appAreaName;
        });
    }
}
exports.AppAreasModifier = AppAreasModifier;
//# sourceMappingURL=appAreasModifier.js.map