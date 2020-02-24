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
const alQueryWizardData_1 = require("./alQueryWizardData");
const alQueryWizardPage_1 = require("./alQueryWizardPage");
const alLangServerProxy_1 = require("../../allanguage/alLangServerProxy");
class ALQueryWizard extends alObjectWizard_1.ALObjectWizard {
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
            let objectId = yield alLangProxy.getNextObjectId(settings.getDestDirectoryUri(), "Query");
            let wizardData = new alQueryWizardData_1.ALQueryWizardData();
            wizardData.objectId = objectId;
            wizardData.objectName = '';
            let wizardPage = new alQueryWizardPage_1.ALQueryWizardPage(this._toolsExtensionContext, settings, wizardData);
            wizardPage.show();
        });
    }
}
exports.ALQueryWizard = ALQueryWizard;
//# sourceMappingURL=alQueryWizard.js.map