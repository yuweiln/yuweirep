'use strict';
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
const path = require("path");
const baseWebViewEditor_1 = require("../../webviews/baseWebViewEditor");
const crsAlLangExtHelper_1 = require("../../crsAlLangExtHelper");
const fileBuilder_1 = require("../fileBuilder");
class ProjectItemWizardPage extends baseWebViewEditor_1.BaseWebViewEditor {
    constructor(toolsExtensionContext, title, settings) {
        super(toolsExtensionContext.vscodeExtensionContext, title);
        this._toolsExtensionContext = toolsExtensionContext;
        this._settings = settings;
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        switch (message.command) {
            case 'finishClick':
                this.onFinish(message.data);
                return true;
            case 'cancelClick':
                this.onCancel();
                return true;
        }
        return false;
    }
    finishWizard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    onFinish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.finishWizard(data))
                this.close();
        });
    }
    onCancel() {
        this.close();
    }
    getObjectFileName(objectType, objectId, objectName) {
        return __awaiter(this, void 0, void 0, function* () {
            let crsExtensionApi = yield crsAlLangExtHelper_1.CRSALLangExtHelper.GetCrsAlLangExt();
            if (crsExtensionApi)
                return crsExtensionApi.ObjectNamesApi.GetObjectFileName(objectType, objectId, objectName);
            else
                return objectName + ".al";
        });
    }
    getExtObjectFileName(objectType, objectId, objectName, extendedObjectName) {
        return __awaiter(this, void 0, void 0, function* () {
            let crsExtensionApi = yield crsAlLangExtHelper_1.CRSALLangExtHelper.GetCrsAlLangExt();
            if (crsExtensionApi)
                return crsExtensionApi.ObjectNamesApi.GetObjectExtensionFileName(objectType, objectId, objectName, "", extendedObjectName);
            else
                return objectName + ".al";
        });
    }
    createObjectFile(objectType, objectId, objectName, content) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileName = yield this.getObjectFileName(objectType, objectId, objectName);
            let destPath = this.getDestFilePath(this._settings.destDirectoryPath, objectType);
            let fullPath = fileBuilder_1.FileBuilder.generateObjectFileInDir(destPath, fileName, content);
            if (fullPath)
                fileBuilder_1.FileBuilder.showFile(fullPath);
        });
    }
    createObjectExtensionFile(objectType, objectId, objectName, extendedObjectName, content) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileName = yield this.getExtObjectFileName(objectType, objectId, objectName, extendedObjectName);
            let destPath = this.getDestFilePath(this._settings.destDirectoryPath, objectType);
            let fullPath = fileBuilder_1.FileBuilder.generateObjectFileInDir(destPath, fileName, content);
            if (fullPath)
                fileBuilder_1.FileBuilder.showFile(fullPath);
        });
    }
    getDestFilePath(targetPath, objectType) {
        //target path has been specified - do not use crs reorganize settings
        if (targetPath)
            return targetPath;
        let workspacePathSelected = false;
        //no path - select current workspace folder
        if (!targetPath) {
            targetPath = this._toolsExtensionContext.alLangProxy.getCurrentWorkspaceFolderPath();
            if (!targetPath)
                return undefined;
            workspacePathSelected = true;
        }
        //get crs settings        
        let settings = vscode.workspace.getConfiguration('CRS', vscode.Uri.file(targetPath));
        let saveFileAction = settings.get('OnSaveAlFileAction');
        if ((!saveFileAction) || (saveFileAction.toLowerCase() != 'reorganize'))
            return targetPath;
        //reorganize is active - find destination path
        if (!workspacePathSelected)
            targetPath = this._toolsExtensionContext.alLangProxy.getCurrentWorkspaceFolderPath();
        let alPath = settings.get('AlSubFolderName');
        if (alPath)
            targetPath = path.join(targetPath, alPath);
        targetPath = path.join(targetPath, objectType.toLowerCase());
        return targetPath;
    }
}
exports.ProjectItemWizardPage = ProjectItemWizardPage;
//# sourceMappingURL=projectItemWizardPage.js.map