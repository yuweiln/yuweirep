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
const fileBuilder_1 = require("../fileBuilder");
class ALSymbolsBasedWizard {
    constructor() {
    }
    showNewDocument(content, fileName, relativeFileDir) {
        return __awaiter(this, void 0, void 0, function* () {
            let autoGenerateFile = this.shouldAutoGenerateFiles();
            if (autoGenerateFile && fileName) {
                this.showNewGeneratedFile(content, fileName, relativeFileDir);
            }
            else {
                fileBuilder_1.FileBuilder.showNewUntitledDocument(content);
            }
        });
    }
    showNewGeneratedFile(content, fileName, relativeFileDir) {
        return __awaiter(this, void 0, void 0, function* () {
            let autoShowDocument = vscode.workspace.getConfiguration('alOutline').get('autoShowFiles');
            let filePath = yield fileBuilder_1.FileBuilder.generateObjectFileInRelativeDir(content, fileName, relativeFileDir);
            if ((filePath) && (autoShowDocument))
                fileBuilder_1.FileBuilder.showFile(filePath);
        });
    }
    getObjectId(promptText, defaultObjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            let objectIdString = defaultObjectId.toString();
            if (this.shouldPromptForObjectId()) {
                objectIdString = yield this.promptForObjectId(promptText, objectIdString);
            }
            if (!objectIdString) {
                return -1;
            }
            let objectId = Number(objectIdString);
            if (isNaN(objectId)) {
                return -1;
            }
            return objectId;
        });
    }
    getObjectName(promptText, defaultObjectName) {
        return __awaiter(this, void 0, void 0, function* () {
            let objectName = defaultObjectName;
            if (this.shouldPromptForObjectName()) {
                objectName = yield this.promptForObjectName(promptText, objectName);
            }
            if (!objectName) {
                return objectName;
            }
            if (this.shouldStripCharacters()) {
                objectName = fileBuilder_1.FileBuilder.stripNonAlphaNumericCharacters(objectName);
            }
            return objectName;
        });
    }
    getRelativeFileDir(objectType) {
        return __awaiter(this, void 0, void 0, function* () {
            let relativeFileDir = yield fileBuilder_1.FileBuilder.getPatternGeneratedRelativeFilePath(objectType);
            if (this.shouldPromptForFileDir() && this.shouldAutoGenerateFiles()) {
                relativeFileDir = yield this.promptForFileDir('Please specify a directory, relative to the root, to create the new file(s) in.', relativeFileDir);
            }
            return relativeFileDir;
        });
    }
    //#region UI functions
    promptForObjectId(promptText, defaultObjectId) {
        return vscode.window.showInputBox({
            value: defaultObjectId,
            prompt: promptText,
            validateInput: (text) => {
                let objectId = Number(text);
                if (isNaN(objectId)) {
                    return 'Only numbers are allowed for object IDs.';
                }
                else {
                    return undefined;
                }
            }
        });
    }
    promptForObjectName(promptText, defaultObjectName) {
        return vscode.window.showInputBox({
            value: defaultObjectName,
            prompt: promptText
        });
    }
    promptForFileDir(promptText, defaultFilePath) {
        return vscode.window.showInputBox({
            value: defaultFilePath,
            prompt: promptText,
            ignoreFocusOut: true
        });
    }
    //#endregion
    //#region Setting Helper Functions
    shouldPromptForObjectId() {
        return vscode.workspace.getConfiguration('alOutline').get('promptForObjectId');
    }
    shouldPromptForObjectName() {
        return vscode.workspace.getConfiguration('alOutline').get('promptForObjectName');
    }
    shouldPromptForFileDir() {
        return vscode.workspace.getConfiguration('alOutline').get('promptForFilePath');
    }
    shouldStripCharacters() {
        return vscode.workspace.getConfiguration('alOutline').get('stripNonAlphanumericCharactersFromObjectNames');
    }
    shouldAutoGenerateFiles() {
        return vscode.workspace.getConfiguration('alOutline').get('autoGenerateFiles');
    }
}
exports.ALSymbolsBasedWizard = ALSymbolsBasedWizard;
//# sourceMappingURL=alSymbolsBasedWizard.js.map