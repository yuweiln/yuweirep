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
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSymbolsBasedWizard_1 = require("./alSymbolsBasedWizard");
const fileBuilder_1 = require("../fileBuilder");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALSymbolsBasedPageWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor() {
        super();
    }
    //#region Wizards with UI
    showWizard(tableSymbols, pageType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tableSymbols.length == 1)
                yield this.showPageWizard(tableSymbols[0], pageType);
            else
                yield this.showMultiPageWizard(tableSymbols, pageType);
        });
    }
    showMultiPageWizard(tableSymbols, pageType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired())
                return;
            const objType = azSymbolKind_1.AZSymbolKind.PageObject;
            let startObjectId = yield this.getObjectId(`Please enter a starting ID for the ${pageType} pages.`, 0);
            if (startObjectId < 0) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(objType);
            for (let i = 0; i < tableSymbols.length; i++) {
                let tableSymbol = tableSymbols[i];
                let objectId = startObjectId + i;
                let objectName = this.getDefaultPageName(tableSymbol, pageType);
                yield this.createAndShowNewPage(tableSymbol, objType, objectId, objectName, pageType, relativeFileDir);
            }
        });
    }
    showPageWizard(tableSymbol, pageType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsFileNamePatternRequired())
                return;
            const objType = azSymbolKind_1.AZSymbolKind.PageObject;
            let objectId = yield this.getObjectId(`Please enter an ID for the ${pageType} page.`, 0);
            if (objectId < 0) {
                return;
            }
            let objectName = this.getDefaultPageName(tableSymbol, pageType);
            objectName = yield this.getObjectName(`Please enter a name for the ${pageType} page.`, objectName);
            if (!objectName) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(objType);
            yield this.createAndShowNewPage(tableSymbol, objType, objectId, objectName, pageType, relativeFileDir);
        });
    }
    createAndShowNewPage(tableSymbol, objType, objectId, objectName, pageType, relativeFileDir) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileName = yield fileBuilder_1.FileBuilder.getPatternGeneratedFullObjectFileName(objType, objectId, objectName);
            let pageContents;
            if (pageType === 'List') {
                pageContents = this.buildListPageForTable(tableSymbol, objectId, objectName);
            }
            else if (pageType === 'Card') {
                pageContents = this.buildCardPageForTable(tableSymbol, objectId, objectName);
            }
            else {
                vscode.window.showErrorMessage(`Page generator for page type: ${pageType} not implemented.`);
                return;
            }
            this.showNewDocument(pageContents, fileName, relativeFileDir);
        });
    }
    //#endregion
    //#region Page builders
    buildListPageForTable(tableSymbol, objectId, objectName) {
        return this.buildPageForTable(tableSymbol, objectId, objectName, "List", "repeater");
    }
    buildCardPageForTable(tableSymbol, objectId, objectName) {
        return this.buildPageForTable(tableSymbol, objectId, objectName, "Card", "group");
    }
    buildPageForTable(tableSymbol, objectId, objectName, pageType, fieldGroupType) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        writer.writeStartObject("page", objectId.toString(), objectName);
        writer.writeLine("");
        writer.writeProperty("PageType", pageType);
        writer.writeProperty("SourceTable", writer.encodeName(tableSymbol.name));
        writer.writeProperty("Caption", writer.encodeString(objectName));
        //usage category and application area for list pages
        if (pageType === "List") {
            let appArea = vscode.workspace.getConfiguration('alOutline').get('defaultAppArea');
            let usageCategory = vscode.workspace.getConfiguration('alOutline').get('defaultListUsageCategory');
            if ((usageCategory) && (usageCategory !== "")) {
                //application area requires useage category to be set
                if ((appArea) && (appArea !== ""))
                    writer.writeProperty("ApplicationArea", appArea);
                writer.writeProperty("UsageCategory", usageCategory);
            }
        }
        writer.writeLine("");
        writer.writeStartLayout();
        writer.writeStartGroup("area", "content");
        writer.writeStartGroup(fieldGroupType, "General");
        let fieldList = [];
        tableSymbol.collectChildSymbols(azSymbolKind_1.AZSymbolKind.Field, fieldList);
        fieldList.forEach(item => {
            writer.writePageField(item.name);
        });
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndLayout();
        writer.writeLine("");
        writer.writeEndObject();
        return writer.toString();
    }
    //#endregion
    //#region Helper Methods
    getDefaultPageName(tableSymbol, pageType) {
        return `${tableSymbol.name.trim()} ${pageType}`;
    }
}
exports.ALSymbolsBasedPageWizard = ALSymbolsBasedPageWizard;
//# sourceMappingURL=alSymbolsBasedPageWizard.js.map