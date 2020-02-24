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
const alTableWizardFieldData_1 = require("./alTableWizardFieldData");
const alTableSyntaxBuilder_1 = require("../syntaxbuilders/alTableSyntaxBuilder");
class ALTableWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Table Wizard", settings);
        this._tableWizardData = data;
    }
    //initialize wizard
    onDocumentLoaded() {
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._tableWizardData
        });
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'altablewizard', 'altablewizard.html');
    }
    getViewType() {
        return "azALDevTools.ALTableWizard";
    }
    finishWizard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //build parameters
            this._tableWizardData.objectId = data.objectId;
            this._tableWizardData.objectName = data.objectName;
            this._tableWizardData.fields = this.validateFields(data.fields);
            //build new object
            var builder = new alTableSyntaxBuilder_1.ALTableSyntaxBuilder();
            var source = builder.buildFromTableWizardData(this._tableWizardData);
            this.createObjectFile('Table', this._tableWizardData.objectId, this._tableWizardData.objectName, source);
            return true;
        });
    }
    validateFields(data) {
        let fields = [];
        if ((data) && (data.length > 0)) {
            for (let i = 0; i < data.length; i++) {
                fields.push(new alTableWizardFieldData_1.ALTableWizardFieldData(data[i].id, data[i].name, data[i].dataType, data[i].length, data[i].dataClassification));
            }
        }
        return fields;
    }
}
exports.ALTableWizardPage = ALTableWizardPage;
//# sourceMappingURL=alTableWizardPage.js.map