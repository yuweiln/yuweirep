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
class ALSymbolsBasedQueryWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor() {
        super();
    }
    //#region Wizards with UI
    showWizard(tableSymbols) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tableSymbols.length == 1)
                yield this.showQueryWizard(tableSymbols[0]);
            else
                yield this.showMultiQueryWizard(tableSymbols);
        });
    }
    showMultiQueryWizard(tableSymbols) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired())
                return;
            const objType = azSymbolKind_1.AZSymbolKind.QueryObject;
            let startObjectId = yield this.getObjectId(`Please enter a starting ID for the query objects.`, 0);
            if (startObjectId < 0) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(objType);
            for (let i = 0; i < tableSymbols.length; i++) {
                let tableSymbol = tableSymbols[i];
                let objectId = startObjectId + i;
                let objectName = this.getDefaultQueryName(tableSymbol);
                yield this.createAndShowNewQuery(tableSymbol, objType, objectId, objectName, relativeFileDir);
            }
        });
    }
    showQueryWizard(tableSymbol) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsFileNamePatternRequired())
                return;
            const objType = azSymbolKind_1.AZSymbolKind.QueryObject;
            let objectId = yield this.getObjectId("Please enter an ID for the query object.", 0);
            if (objectId < 0) {
                return;
            }
            let objectName = this.getDefaultQueryName(tableSymbol);
            objectName = yield this.getObjectName("Please enter a name for the query object.", objectName);
            if (!objectName) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(objType);
            yield this.createAndShowNewQuery(tableSymbol, objType, objectId, objectName, relativeFileDir);
        });
    }
    createAndShowNewQuery(tableSymbol, objType, objectId, objectName, relativeFileDir) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileName = yield fileBuilder_1.FileBuilder.getPatternGeneratedFullObjectFileName(objType, objectId, objectName);
            this.showNewDocument(this.buildQueryForTable(tableSymbol, objectId, objectName), fileName, relativeFileDir);
        });
    }
    //#endregion
    //#region Query builders
    buildQueryForTable(tableSymbol, objectId, objectName) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        writer.writeStartObject("query", objectId.toString(), objectName);
        writer.writeProperty("QueryType", "Normal");
        writer.writeLine("");
        //write dataset
        this.appendElements(writer, tableSymbol);
        //write triggers
        writer.writeLine("");
        writer.writeLine("trigger OnBeforeOpen()");
        writer.writeLine("begin");
        writer.writeLine("");
        writer.writeLine("end;");
        writer.writeEndObject();
        return writer.toString();
    }
    appendElements(writer, tableSymbol) {
        var dataItemName = writer.createName(tableSymbol.name);
        writer.writeStartNamedBlock("elements");
        writer.writeStartNameSourceBlock("dataitem", dataItemName, writer.encodeName(tableSymbol.name));
        let fieldList = [];
        tableSymbol.collectChildSymbols(azSymbolKind_1.AZSymbolKind.Field, fieldList);
        fieldList.forEach(item => {
            writer.writeNameSourceBlock("column", writer.createName(item.name), writer.encodeName(item.name));
        });
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
    //#endregion
    //#region Helper Methods
    getDefaultQueryName(tableSymbol) {
        return `${tableSymbol.name.trim()} Query`;
    }
}
exports.ALSymbolsBasedQueryWizard = ALSymbolsBasedQueryWizard;
//# sourceMappingURL=alSymbolsBasedQueryWizard.js.map