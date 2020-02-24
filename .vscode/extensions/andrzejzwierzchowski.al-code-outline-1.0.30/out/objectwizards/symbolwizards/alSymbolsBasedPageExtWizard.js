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
const fileBuilder_1 = require("../fileBuilder");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSymbolsBasedWizard_1 = require("./alSymbolsBasedWizard");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALSymbolsBasedPageExtWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor() {
        super();
    }
    //#region Wizards with UI
    showWizard(symbols) {
        return __awaiter(this, void 0, void 0, function* () {
            if (symbols.length == 1)
                yield this.showPageExtWizard(symbols[0]);
            else
                yield this.showMultiPageExtWizard(symbols);
        });
    }
    showMultiPageExtWizard(pageSymbols) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired() || !fileBuilder_1.FileBuilder.checkCrsExtensionObjectNamePatternRequired(true))
                return;
            const extObjType = azSymbolKind_1.AZSymbolKind.PageExtensionObject;
            let startObjectId = yield this.getObjectId("Please enter a starting ID for the page extensions.", 0);
            if (startObjectId < 0) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(extObjType);
            for (let i = 0; i < pageSymbols.length; i++) {
                let pageSymbol = pageSymbols[i];
                let extObjectId = startObjectId + i;
                let extObjectName = yield fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectName(extObjType, extObjectId, pageSymbol);
                yield this.createAndShowNewPageExtension(pageSymbol, extObjType, extObjectId, extObjectName, relativeFileDir);
            }
        });
    }
    showPageExtWizard(pageSymbol) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired() || !fileBuilder_1.FileBuilder.checkCrsExtensionObjectNamePatternRequired(false))
                return;
            const extObjType = azSymbolKind_1.AZSymbolKind.PageExtensionObject;
            let extObjectId = yield this.getObjectId("Please enter an ID for the page extension.", 0);
            if (extObjectId < 0) {
                return;
            }
            let extObjectName = yield fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectName(extObjType, extObjectId, pageSymbol);
            if (!extObjectName)
                extObjectName = pageSymbol.name + ' Extension';
            extObjectName = yield this.getObjectName("Please enter a name for the page extension.", extObjectName);
            if (!extObjectName) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(extObjType);
            yield this.createAndShowNewPageExtension(pageSymbol, extObjType, extObjectId, extObjectName, relativeFileDir);
        });
    }
    createAndShowNewPageExtension(pageSymbol, extObjType, extObjectId, extObjectName, relativeFileDir) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileName = yield fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectFileName(extObjType, extObjectId, extObjectName, pageSymbol);
            this.showNewDocument(this.buildPageExtForPage(pageSymbol, extObjectId, extObjectName), fileName, relativeFileDir);
        });
    }
    //#endregion
    //#region Page Extension builders
    buildPageExtForPage(pageSymbol, objectId, extObjectName) {
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        writer.writeStartExtensionObject("pageextension", objectId.toString(), extObjectName, pageSymbol.name);
        writer.writeStartLayout();
        writer.writeLine("");
        writer.writeEndLayout();
        writer.writeLine("");
        writer.writeStartActions();
        writer.writeLine("");
        writer.writeEndActions();
        writer.writeEndObject();
        return writer.toString();
    }
}
exports.ALSymbolsBasedPageExtWizard = ALSymbolsBasedPageExtWizard;
//# sourceMappingURL=alSymbolsBasedPageExtWizard.js.map