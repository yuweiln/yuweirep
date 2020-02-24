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
const alEnumExtWizardData_1 = require("./alEnumExtWizardData");
const alEnumExtWizardPage_1 = require("./alEnumExtWizardPage");
class ALEnumExtWizard extends alObjectWizard_1.ALObjectWizard {
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
            let objectId = yield alLangProxy.getNextObjectId(settings.getDestDirectoryUri(), "enumextension");
            let wizardData = new alEnumExtWizardData_1.ALEnumExtWizardData();
            wizardData.objectId = objectId;
            wizardData.objectName = '';
            let wizardPage = new alEnumExtWizardPage_1.ALEnumExtWizardPage(this._toolsExtensionContext, settings, wizardData);
            wizardPage.show();
        });
    }
}
exports.ALEnumExtWizard = ALEnumExtWizard;
//# sourceMappingURL=alEnumExtWizard.js.map