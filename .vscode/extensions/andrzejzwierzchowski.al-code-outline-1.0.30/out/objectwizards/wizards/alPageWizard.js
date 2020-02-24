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
const alObjectWizard_1 = require("./alObjectWizard");
const alPageWizardData_1 = require("./alPageWizardData");
const alPageWizardPage_1 = require("./alPageWizardPage");
class ALPageWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    runAsync(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            let objectId = yield this._toolsExtensionContext.alLangProxy.getNextObjectId(settings.getDestDirectoryUri(), "Page");
            let wizardData = new alPageWizardData_1.ALPageWizardData();
            wizardData.objectId = objectId;
            wizardData.objectName = ''; //settings.getInputNameVariable();
            let wizardPage = new alPageWizardPage_1.ALPageWizardPage(this._toolsExtensionContext, settings, wizardData);
            wizardPage.show();
        });
    }
}
exports.ALPageWizard = ALPageWizard;
//# sourceMappingURL=alPageWizard.js.map