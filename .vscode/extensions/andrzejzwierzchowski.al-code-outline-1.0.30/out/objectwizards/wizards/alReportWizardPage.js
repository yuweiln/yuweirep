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
const alReportSyntaxBuilder_1 = require("../syntaxbuilders/alReportSyntaxBuilder");
class ALReportWizardPage extends alTableBasedWizardPage_1.ALTableBasedWizardPage {
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Report Wizard", settings, data);
        this._reportWizardData = data;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alreportwizard', 'alreportwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALReportWizard";
    }
    finishWizard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //build parameters
            this._reportWizardData.objectId = data.objectId;
            this._reportWizardData.objectName = data.objectName;
            this._reportWizardData.selectedTable = data.selectedTable;
            this._reportWizardData.selectedFieldList = [];
            if (data.fields) {
                for (var i = 0; i < data.fields.length; i++) {
                    this._reportWizardData.selectedFieldList.push(data.fields[i]);
                }
            }
            //build new object
            var builder = new alReportSyntaxBuilder_1.ALReportSyntaxBuilder();
            var source = builder.buildFromReportWizardData(this._reportWizardData);
            this.createObjectFile('Report', this._reportWizardData.objectId, this._reportWizardData.objectName, source);
            return true;
        });
    }
}
exports.ALReportWizardPage = ALReportWizardPage;
//# sourceMappingURL=alReportWizardPage.js.map