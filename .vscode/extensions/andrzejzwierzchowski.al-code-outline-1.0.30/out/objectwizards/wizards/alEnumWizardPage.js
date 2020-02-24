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
const alEnumSyntaxBuilder_1 = require("../syntaxbuilders/alEnumSyntaxBuilder");
class ALEnumWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Enum Wizard", settings);
        this._enumWizardData = data;
    }
    //initialize wizard
    onDocumentLoaded() {
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._enumWizardData
        });
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alenumwizard', 'alenumwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALEnumWizard";
    }
    finishWizard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //build parameters
            this._enumWizardData.objectId = data.objectId;
            this._enumWizardData.objectName = data.objectName;
            this._enumWizardData.valueList = data.valueList;
            this._enumWizardData.captionList = data.captionList;
            this._enumWizardData.extensible = data.extensible;
            //build new object
            var builder = new alEnumSyntaxBuilder_1.ALEnumSyntaxBuilder();
            var source = builder.buildFromEnumWizardData(this._enumWizardData);
            this.createObjectFile('Enum', this._enumWizardData.objectId, this._enumWizardData.objectName, source);
            return true;
        });
    }
}
exports.ALEnumWizardPage = ALEnumWizardPage;
//# sourceMappingURL=alEnumWizardPage.js.map