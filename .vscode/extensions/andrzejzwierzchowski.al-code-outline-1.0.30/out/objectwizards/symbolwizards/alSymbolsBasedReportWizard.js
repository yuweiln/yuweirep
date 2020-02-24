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
class ALSymbolsBasedReportWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor() {
        super();
    }
    //#region Wizards with UI
    showWizard(tableSymbols) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tableSymbols.length == 1)
                yield this.showReportWizard(tableSymbols[0]);
            else
                yield this.showMultiReportWizard(tableSymbols);
        });
    }
    showMultiReportWizard(tableSymbols) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired())
                return;
            const objType = azSymbolKind_1.AZSymbolKind.ReportObject;
            let startObjectId = yield this.getObjectId(`Please enter a starting ID for the report objects.`, 0);
            if (startObjectId < 0) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(objType);
            for (let i = 0; i < tableSymbols.length; i++) {
                let tableSymbol = tableSymbols[i];
                let objectId = startObjectId + i;
                let objectName = this.getDefaultReportName(tableSymbol);
                yield this.createAndShowNewReport(tableSymbol, objType, objectId, objectName, relativeFileDir);
            }
        });
    }
    showReportWizard(tableSymbol) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsFileNamePatternRequired())
                return;
            const objType = azSymbolKind_1.AZSymbolKind.ReportObject;
            let objectId = yield this.getObjectId("Please enter an ID for the report object.", 0);
            if (objectId < 0) {
                return;
            }
            let objectName = this.getDefaultReportName(tableSymbol);
            objectName = yield this.getObjectName("Please enter a name for the report object.", objectName);
            if (!objectName) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(objType);
            yield this.createAndShowNewReport(tableSymbol, objType, objectId, objectName, relativeFileDir);
        });
    }
    createAndShowNewReport(tableSymbol, objType, objectId, objectName, relativeFileDir) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileName = yield fileBuilder_1.FileBuilder.getPatternGeneratedFullObjectFileName(objType, objectId, objectName);
            this.showNewDocument(this.buildReportForTable(tableSymbol, objectId, objectName), fileName, relativeFileDir);
        });
    }
    //#endregion
    //#region Report builders
    buildReportForTable(tableSymbol, objectId, objectName) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        writer.writeStartObject("report", objectId.toString(), objectName);
        //write dataset
        this.appendDataSet(writer, tableSymbol);
        //write report request page suggetsion
        this.appendReportRequestPage(writer);
        writer.writeEndObject();
        return writer.toString();
    }
    appendDataSet(writer, tableSymbol) {
        var dataSetName = writer.createName(tableSymbol.name);
        writer.writeStartNamedBlock("dataset");
        writer.writeStartNameSourceBlock("dataitem", dataSetName, writer.encodeName(tableSymbol.name));
        let fieldList = [];
        tableSymbol.collectChildSymbols(azSymbolKind_1.AZSymbolKind.Field, fieldList);
        fieldList.forEach(item => {
            writer.writeNameSourceBlock("column", writer.createName(item.name), writer.encodeName(item.name));
        });
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
    appendReportRequestPage(writer) {
        writer.writeStartNamedBlock("requestpage");
        //layout
        writer.writeStartLayout();
        writer.writeStartGroup("area", "content");
        writer.writeStartGroup("group", "GroupName");
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndLayout();
        //actions
        writer.writeStartNamedBlock("actions");
        writer.writeStartGroup("area", "processing");
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
    //#endregion
    //#region Helper Methods
    getDefaultReportName(tableSymbol) {
        return `${tableSymbol.name.trim()} Report`;
    }
}
exports.ALSymbolsBasedReportWizard = ALSymbolsBasedReportWizard;
//# sourceMappingURL=alSymbolsBasedReportWizard.js.map