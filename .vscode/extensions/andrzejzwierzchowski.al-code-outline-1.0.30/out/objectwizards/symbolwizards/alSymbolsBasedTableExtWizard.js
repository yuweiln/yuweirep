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
class ALSymbolsBasedTableExtWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor() {
        super();
    }
    //#region Wizards with UI
    showWizard(tableSymbols) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tableSymbols.length == 1)
                yield this.showTableExtWizard(tableSymbols[0]);
            else
                yield this.showMultiTableExtWizard(tableSymbols);
        });
    }
    showMultiTableExtWizard(tableSymbols) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired() || !fileBuilder_1.FileBuilder.checkCrsExtensionObjectNamePatternRequired(true))
                return;
            const extObjType = azSymbolKind_1.AZSymbolKind.TableExtensionObject;
            let startObjectId = yield this.getObjectId("Please enter a starting ID for the table extensions.", 0);
            if (startObjectId < 0) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(extObjType);
            for (let i = 0; i < tableSymbols.length; i++) {
                let tableSymbol = tableSymbols[i];
                let extObjectId = startObjectId + i;
                let extObjectName = yield fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectName(extObjType, extObjectId, tableSymbol);
                yield this.createAndShowNewTableExtension(tableSymbol, extObjType, extObjectId, extObjectName, relativeFileDir);
            }
        });
    }
    showTableExtWizard(tableSymbol) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired() || !fileBuilder_1.FileBuilder.checkCrsExtensionObjectNamePatternRequired(false))
                return;
            const extObjType = azSymbolKind_1.AZSymbolKind.TableExtensionObject;
            let extObjectId = yield this.getObjectId("Please enter an ID for the table extension.", 0);
            if (extObjectId < 0) {
                return;
            }
            let extObjectName = yield fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectName(extObjType, extObjectId, tableSymbol);
            if (!extObjectName)
                extObjectName = tableSymbol.name + ' Extension';
            extObjectName = yield this.getObjectName("Please enter a name for the table extension.", extObjectName);
            if (!extObjectName) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(extObjType);
            yield this.createAndShowNewTableExtension(tableSymbol, extObjType, extObjectId, extObjectName, relativeFileDir);
        });
    }
    createAndShowNewTableExtension(tableSymbol, extObjType, extObjectId, extObjectName, relativeFileDir) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileName = yield fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectFileName(extObjType, extObjectId, extObjectName, tableSymbol);
            this.showNewDocument(this.buildTableExtForTable(tableSymbol, extObjectId, extObjectName), fileName, relativeFileDir);
        });
    }
    //#endregion
    //#region Table Extension builders
    buildTableExtForTable(tableSymbol, objectId, extObjectName) {
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        writer.writeStartExtensionObject("tableextension", objectId.toString(), extObjectName, tableSymbol.name);
        writer.writeStartFields();
        writer.writeLine("");
        writer.writeEndFields();
        writer.writeEndObject();
        return writer.toString();
    }
}
exports.ALSymbolsBasedTableExtWizard = ALSymbolsBasedTableExtWizard;
//# sourceMappingURL=alSymbolsBasedTableExtWizard.js.map