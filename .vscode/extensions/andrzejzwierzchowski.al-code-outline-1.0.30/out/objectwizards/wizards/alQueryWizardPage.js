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
const alQuerySyntaxBuilder_1 = require("../syntaxbuilders/alQuerySyntaxBuilder");
class ALQueryWizardPage extends alTableBasedWizardPage_1.ALTableBasedWizardPage {
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Query Wizard", settings, data);
        this._queryWizardData = data;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alquerywizard', 'alquerywizard.html');
    }
    getViewType() {
        return "azALDevTools.ALQueryWizard";
    }
    finishWizard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //build parameters
            this._queryWizardData.objectId = data.objectId;
            this._queryWizardData.objectName = data.objectName;
            this._queryWizardData.selectedTable = data.selectedTable;
            this._queryWizardData.queryType = data.queryType;
            this._queryWizardData.apiPublisher = data.apiPublisher;
            this._queryWizardData.apiGroup = data.apiGroup;
            this._queryWizardData.apiVersion = data.apiVersion;
            this._queryWizardData.entityName = data.entityName;
            this._queryWizardData.entitySetName = data.entitySetName;
            this._queryWizardData.selectedFieldList = [];
            if (data.fields) {
                for (var i = 0; i < data.fields.length; i++) {
                    this._queryWizardData.selectedFieldList.push(data.fields[i]);
                }
            }
            //build new object
            var builder = new alQuerySyntaxBuilder_1.ALQuerySyntaxBuilder();
            var source = builder.buildFromQueryWizardData(this._queryWizardData);
            this.createObjectFile('Query', this._queryWizardData.objectId, this._queryWizardData.objectName, source);
            return true;
        });
    }
}
exports.ALQueryWizardPage = ALQueryWizardPage;
//# sourceMappingURL=alQueryWizardPage.js.map