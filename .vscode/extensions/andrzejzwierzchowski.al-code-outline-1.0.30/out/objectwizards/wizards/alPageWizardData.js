'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
//import * as vscode from 'vscode';
const alTableBasedWizardData_1 = require("./alTableBasedWizardData");
class ALPageWizardData extends alTableBasedWizardData_1.ALTableBasedWizardData {
    constructor() {
        super();
        this.pageType = "Card";
        this.fastTabs = "General";
        //this.appArea = vscode.workspace.getConfiguration('azALDevTools').get('defaultAppArea');
        //this.usageCategory = vscode.workspace.getConfiguration('azALDevTools').get('defaultListUsageCategory');
        this.appArea = "All";
        this.usageCategory = "";
        //api fields
        this.caption = "";
        this.apiPublisher = "publisherName";
        this.apiGroup = "apiGroup";
        this.apiVersion = "v1.0";
        this.entityName = "entityName";
        this.entitySetName = "entitySetName";
        //fast tabs
        this.fastTabsData = [];
    }
    isFastTabsPageType() {
        return ((this.pageType == "Card") || (this.pageType == "Document") || (this.pageType == "CardPart") ||
            (this.pageType == "ConfirmationDialog") || (this.pageType == "NavigationPane"));
    }
}
exports.ALPageWizardData = ALPageWizardData;
//# sourceMappingURL=alPageWizardData.js.map