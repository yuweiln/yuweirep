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
const alLangServerProxy_1 = require("../../allanguage/alLangServerProxy");
const alTableWizardData_1 = require("./alTableWizardData");
const alTableWizardPage_1 = require("./alTableWizardPage");
class ALTableWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    runAsync(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            let alLangProxy = new alLangServerProxy_1.ALLangServerProxy();
            let objectId = yield alLangProxy.getNextObjectId(settings.getDestDirectoryUri(), "table");
            let wizardData = new alTableWizardData_1.ALTableWizardData();
            wizardData.objectId = objectId;
            wizardData.objectName = '';
            let wizardPage = new alTableWizardPage_1.ALTableWizardPage(this._toolsExtensionContext, settings, wizardData);
            wizardPage.show();
        });
    }
}
exports.ALTableWizard = ALTableWizard;
//# sourceMappingURL=alTableWizard.js.map