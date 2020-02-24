'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const alTableBasedWizardData_1 = require("./alTableBasedWizardData");
class ALQueryWizardData extends alTableBasedWizardData_1.ALTableBasedWizardData {
    constructor() {
        super();
        this.createRequestPage = false;
        this.queryType = "Normal";
        this.apiPublisher = "publisherName";
        this.apiGroup = "apiGroup";
        this.apiVersion = "v1.0";
        this.entityName = "entityName";
        this.entitySetName = "entitySetName";
    }
}
exports.ALQueryWizardData = ALQueryWizardData;
//# sourceMappingURL=alQueryWizardData.js.map