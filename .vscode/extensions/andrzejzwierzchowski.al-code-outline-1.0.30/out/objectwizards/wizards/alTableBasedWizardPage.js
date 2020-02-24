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
const projectItemWizardPage_1 = require("./projectItemWizardPage");
class ALTableBasedWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    constructor(toolsExtensionContext, title, settings, data) {
        super(toolsExtensionContext, title, settings);
        this._tableWizardData = data;
    }
    //initialize wizard
    onDocumentLoaded() {
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._tableWizardData
        });
        //load tables
        if ((!this._tableWizardData.fixedTable) && ((this._tableWizardData.tableList == null) || (this._tableWizardData.tableList.length == 0)))
            this.loadTables();
    }
    loadTables() {
        return __awaiter(this, void 0, void 0, function* () {
            this._tableWizardData.tableList = yield this._toolsExtensionContext.alLangProxy.getTableList(this._settings.getDestDirectoryUri());
            this.sendMessage({
                command: "setTables",
                data: this._tableWizardData.tableList
            });
        });
    }
    loadFields() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._tableWizardData.fieldList = yield this._toolsExtensionContext.alLangProxy.getFieldList(this._settings.getDestDirectoryUri(), this._tableWizardData.selectedTable);
                this.sendMessage({
                    command: "setFields",
                    data: this._tableWizardData.fieldList
                });
            }
            catch (e) {
            }
        });
    }
    setTable(tableName) {
        var fieldChanged = (this._tableWizardData.selectedTable != tableName);
        this._tableWizardData.selectedTable = tableName;
        if ((fieldChanged) || (!this._tableWizardData.fieldList) || (this._tableWizardData.fieldList.length == 0))
            this.loadFields();
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        switch (message.command) {
            case "selectTable":
                this.setTable(message.tableName);
                return true;
        }
        return false;
    }
}
exports.ALTableBasedWizardPage = ALTableBasedWizardPage;
//# sourceMappingURL=alTableBasedWizardPage.js.map