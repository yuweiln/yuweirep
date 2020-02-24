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
const path = require("path");
const projectItemWizardPage_1 = require("./projectItemWizardPage");
const alEnumExtSyntaxBuilder_1 = require("../syntaxbuilders/alEnumExtSyntaxBuilder");
class ALEnumExtWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Enum Extension Wizard", settings);
        this._enumExtWizardData = data;
    }
    //initialize wizard
    onDocumentLoaded() {
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._enumExtWizardData
        });
        //load base enums
        if ((this._enumExtWizardData.baseEnumList == null) || (this._enumExtWizardData.baseEnumList.length == 0))
            this.loadBaseEnums();
    }
    loadBaseEnums() {
        return __awaiter(this, void 0, void 0, function* () {
            this._enumExtWizardData.baseEnumList = yield this._toolsExtensionContext.alLangProxy.getEnumList(this._settings.getDestDirectoryUri());
            this.sendMessage({
                command: "setEnums",
                data: this._enumExtWizardData.baseEnumList
            });
        });
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alenumextwizard', 'alenumextwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALEnumExtWizard";
    }
    finishWizard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //build parameters
            this._enumExtWizardData.objectId = data.objectId;
            this._enumExtWizardData.objectName = data.objectName;
            this._enumExtWizardData.baseEnum = data.baseEnum;
            this._enumExtWizardData.valueList = data.valueList;
            this._enumExtWizardData.captionList = data.captionList;
            let firstValueId = Number.parseInt(data.firstValueId);
            if (Number.isNaN(firstValueId))
                this._enumExtWizardData.firstValueId = 0;
            else
                this._enumExtWizardData.firstValueId = firstValueId;
            //build new object
            let builder = new alEnumExtSyntaxBuilder_1.ALEnumExtSyntaxBuilder();
            let source = builder.buildFromEnumExtWizardData(this._enumExtWizardData);
            this.createObjectExtensionFile('EnumExtension', this._enumExtWizardData.objectId, this._enumExtWizardData.objectName, this._enumExtWizardData.baseEnum, source);
            return true;
        });
    }
}
exports.ALEnumExtWizardPage = ALEnumExtWizardPage;
//# sourceMappingURL=alEnumExtWizardPage.js.map