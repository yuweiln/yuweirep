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
const alPageWizardFastTabData_1 = require("./alPageWizardFastTabData");
const alPageSyntaxBuilder_1 = require("../syntaxbuilders/alPageSyntaxBuilder");
class ALPageWizardPage extends alTableBasedWizardPage_1.ALTableBasedWizardPage {
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Page Wizard", settings, data);
        this._pageWizardData = data;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alpagewizard', 'alpagewizard.html');
    }
    getViewType() {
        return "azALDevTools.ALPageWizard";
    }
    finishWizard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //build parameters
            this._pageWizardData.objectId = data.objectId;
            this._pageWizardData.objectName = data.objectName;
            this._pageWizardData.selectedTable = data.selectedTable;
            this._pageWizardData.pageType = data.pageType;
            this._pageWizardData.fastTabs = data.fastTabs;
            this._pageWizardData.appArea = data.appArea;
            this._pageWizardData.usageCategory = data.usageCategory;
            this._pageWizardData.caption = data.caption;
            this._pageWizardData.apiPublisher = data.apiPublisher;
            this._pageWizardData.apiGroup = data.apiGroup;
            this._pageWizardData.apiVersion = data.apiVersion;
            this._pageWizardData.entityName = data.entityName;
            this._pageWizardData.entitySetName = data.entitySetName;
            //information about selected fields
            this._pageWizardData.selectedFieldList = [];
            if (data.fields) {
                for (var i = 0; i < data.fields.length; i++) {
                    this._pageWizardData.selectedFieldList.push(data.fields[i]);
                }
            }
            //information about fast tabs
            this._pageWizardData.fastTabsData = [];
            if (data.fastTabsData) {
                for (var i = 0; i < data.fastTabsData.length; i++) {
                    var sourceFastTabDetails = data.fastTabsData[i];
                    var fastTabDetails = new alPageWizardFastTabData_1.ALPageWizardFastTabData(sourceFastTabDetails.name);
                    if (sourceFastTabDetails.fields) {
                        for (var fld = 0; fld < sourceFastTabDetails.fields.length; fld++)
                            fastTabDetails.fields.push(sourceFastTabDetails.fields[fld]);
                    }
                    this._pageWizardData.fastTabsData.push(fastTabDetails);
                }
            }
            //build new object
            let builder = new alPageSyntaxBuilder_1.ALPageSyntaxBuilder();
            let source = builder.buildFromPageWizardData(this._pageWizardData);
            this.createObjectFile('Page', this._pageWizardData.objectId, this._pageWizardData.objectName, source);
            return true;
        });
    }
}
exports.ALPageWizardPage = ALPageWizardPage;
//# sourceMappingURL=alPageWizardPage.js.map