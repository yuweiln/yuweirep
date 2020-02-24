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
const alTableBasedWizardPage_1 = require("./alTableBasedWizardPage");
const alXmlPortSyntaxBuilder_1 = require("../syntaxbuilders/alXmlPortSyntaxBuilder");
class ALXmlPortWizardPage extends alTableBasedWizardPage_1.ALTableBasedWizardPage {
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL XmlPort Wizard", settings, data);
        this._xmlPortWizardData = data;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alxmlportwizard', 'alxmlportwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALXmlPortWizard";
    }
    finishWizard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //build parameters
            this._xmlPortWizardData.objectId = data.objectId;
            this._xmlPortWizardData.objectName = data.objectName;
            this._xmlPortWizardData.selectedTable = data.selectedTable;
            this._xmlPortWizardData.fieldNodeType = data.fieldNodeType;
            this._xmlPortWizardData.selectedFieldList = [];
            if (data.fields) {
                for (var i = 0; i < data.fields.length; i++) {
                    this._xmlPortWizardData.selectedFieldList.push(data.fields[i]);
                }
            }
            //build new object
            var builder = new alXmlPortSyntaxBuilder_1.ALXmlPortSyntaxBuilder();
            var source = builder.buildFromXmlPortWizardData(this._xmlPortWizardData);
            this.createObjectFile('XmlPort', this._xmlPortWizardData.objectId, this._xmlPortWizardData.objectName, source);
            return true;
        });
    }
}
exports.ALXmlPortWizardPage = ALXmlPortWizardPage;
//# sourceMappingURL=alXmlPortWizardPage.js.map