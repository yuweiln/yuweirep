"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ALObjectWizardSettings {
    constructor() {
    }
    getDestDirectoryUri() {
        if (!this.destDirectoryPath)
            return undefined;
        if (!this._destDirectoryUri)
            this._destDirectoryUri = vscode.Uri.file(this.destDirectoryPath);
        return this._destDirectoryUri;
    }
}
exports.ALObjectWizardSettings = ALObjectWizardSettings;
//# sourceMappingURL=alObjectWizardSettings.js.map