"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const alPageWizard_1 = require("../objectwizards/wizards/alPageWizard");
const alXmlPortWizard_1 = require("../objectwizards/wizards/alXmlPortWizard");
const alReportWizard_1 = require("../objectwizards/wizards/alReportWizard");
const alQueryWizard_1 = require("../objectwizards/wizards/alQueryWizard");
const alEnumWizard_1 = require("../objectwizards/wizards/alEnumWizard");
const alEnumExtWizard_1 = require("../objectwizards/wizards/alEnumExtWizard");
const alObjectWizardSettings_1 = require("../objectwizards/wizards/alObjectWizardSettings");
const alTableWizard_1 = require("../objectwizards/wizards/alTableWizard");
class ALObjectWizardsService {
    constructor(context) {
        //initialize
        this._context = context;
        //create list of wizards
        this._wizards = [];
        this._wizards.push(new alTableWizard_1.ALTableWizard(context, 'Table', 'New AL Table Wizard', 'Allows to select table name and enter list of fields'));
        this._wizards.push(new alPageWizard_1.ALPageWizard(context, 'Page', 'New AL Page Wizard', 'Allows to select page type, fast tabs, source table and fields.'));
        this._wizards.push(new alXmlPortWizard_1.ALXmlPortWizard(context, 'XmlPort', 'New AL XmlPort Wizard', 'Allows to select source table and fields'));
        this._wizards.push(new alReportWizard_1.ALReportWizard(context, 'Report', 'New AL Report Wizard', 'Allows to select source table and fields'));
        this._wizards.push(new alQueryWizard_1.ALQueryWizard(context, 'Query', 'New AL Query Wizard', 'Allows to select query type, source table and fields'));
        this._wizards.push(new alEnumWizard_1.ALEnumWizard(context, 'Enum', 'New AL Enum Wizard', 'Allows to select list of enum values and captions'));
        this._wizards.push(new alEnumExtWizard_1.ALEnumExtWizard(context, 'Enum Extension', 'New AL Enum Extension Wizard', 'Allows to add list of enum values and captions to existing enum'));
        //register commands
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.newALFile', (fileUri) => {
            this.runALWizards(fileUri);
        }));
    }
    runALWizards(fileUri) {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = new alObjectWizardSettings_1.ALObjectWizardSettings();
            if (fileUri) {
                let fullPath = fileUri.fsPath;
                if (fs.lstatSync(fullPath).isDirectory()) {
                    settings.destDirectoryPath = fullPath;
                }
                else {
                    let parsedPath = path.parse(fullPath);
                    settings.destDirectoryPath = parsedPath.dir;
                }
            }
            //select wizard
            let wizard = yield vscode.window.showQuickPick(this._wizards, {
                placeHolder: 'Select wizard type'
            });
            if (!wizard)
                return;
            //run wizard
            wizard.run(settings);
        });
    }
}
exports.ALObjectWizardsService = ALObjectWizardsService;
//# sourceMappingURL=alObjectWizardsService.js.map