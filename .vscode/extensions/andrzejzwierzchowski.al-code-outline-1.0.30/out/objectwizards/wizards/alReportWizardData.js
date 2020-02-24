'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const alTableBasedWizardData_1 = require("./alTableBasedWizardData");
class ALReportWizardData extends alTableBasedWizardData_1.ALTableBasedWizardData {
    constructor() {
        super();
        this.createRequestPage = true;
        this.rdlcLayout = "";
        this.wordLayout = "";
    }
}
exports.ALReportWizardData = ALReportWizardData;
//# sourceMappingURL=alReportWizardData.js.map