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
const fileBuilder_1 = require("../fileBuilder");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSymbolsBasedWizard_1 = require("./alSymbolsBasedWizard");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALSymbolsBasedXmlPortWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor() {
        super();
    }
    //#region Wizards with UI
    showWizard(tableSymbols) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tableSymbols.length == 1)
                yield this.showXmlPortWizard(tableSymbols[0]);
            else
                yield this.showMultiXmlPortWizard(tableSymbols);
        });
    }
    showMultiXmlPortWizard(tableSymbols) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired())
                return;
            const objType = azSymbolKind_1.AZSymbolKind.XmlPortObject;
            let startObjectId = yield this.getObjectId(`Please enter a starting ID for the xmlport objects.`, 0);
            if (startObjectId < 0) {
                return;
            }
            let fieldsAsElements = yield this.promptForFieldsAsElements();
            if (fieldsAsElements === undefined) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(objType);
            for (let i = 0; i < tableSymbols.length; i++) {
                let tableSymbol = tableSymbols[i];
                let objectId = startObjectId + i;
                let objectName = this.getDefaultXmlPortName(tableSymbol);
                yield this.createAndShowNewXmlPort(tableSymbol, objType, objectId, objectName, fieldsAsElements, relativeFileDir);
            }
        });
    }
    showXmlPortWizard(tableSymbol) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileBuilder_1.FileBuilder.checkCrsFileNamePatternRequired())
                return;
            const objType = azSymbolKind_1.AZSymbolKind.XmlPortObject;
            let objectId = yield this.getObjectId("Please enter an ID for the xmlport object.", 0);
            if (objectId < 0) {
                return;
            }
            let objectName = this.getDefaultXmlPortName(tableSymbol);
            objectName = yield this.getObjectName("Please enter a name for the xmlport object.", objectName);
            if (!objectName) {
                return;
            }
            let fieldsAsElements = yield this.promptForFieldsAsElements();
            if (!fieldsAsElements) {
                return;
            }
            let relativeFileDir = yield this.getRelativeFileDir(objType);
            yield this.createAndShowNewXmlPort(tableSymbol, objType, objectId, objectName, fieldsAsElements, relativeFileDir);
        });
    }
    createAndShowNewXmlPort(tableSymbol, objType, objectId, objectName, fieldsAsElements, relativeFileDir) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileName = yield fileBuilder_1.FileBuilder.getPatternGeneratedFullObjectFileName(objType, objectId, objectName);
            this.showNewDocument(this.buildXmlPortForTable(tableSymbol, objectId, objectName, fieldsAsElements), fileName, relativeFileDir);
        });
    }
    //#endregion
    //#region Report builders
    buildXmlPortForTable(tableSymbol, objectId, objectName, fieldsAsElements) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        writer.writeStartObject("xmlport", objectId.toString(), objectName);
        //write dataset
        this.appendSchema(writer, tableSymbol, fieldsAsElements);
        //write report request page suggetsion
        this.appendReportRequestPage(writer);
        writer.writeEndObject();
        return writer.toString();
    }
    appendSchema(writer, tableSymbol, fieldsAsElements) {
        var tableElementName = writer.createName(tableSymbol.name);
        var fieldNodeName;
        if (fieldsAsElements)
            fieldNodeName = "fieldelement";
        else
            fieldNodeName = "fieldattribute";
        writer.writeStartNamedBlock("schema");
        writer.writeStartGroup("textelement", "RootNodeName");
        writer.writeStartNameSourceBlock("tableelement", tableElementName, writer.encodeName(tableSymbol.name));
        let fieldList = [];
        tableSymbol.collectChildSymbols(azSymbolKind_1.AZSymbolKind.Field, fieldList);
        fieldList.forEach(item => {
            writer.writeNameSourceBlock(fieldNodeName, writer.createName(item.name), tableElementName + "." + writer.encodeName(item.name));
        });
        writer.writeEndBlock();
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
    promptForFieldsAsElements() {
        return __awaiter(this, void 0, void 0, function* () {
            let fieldAsAttributeText = "Table fields as xml attributes";
            let fieldAsElementText = "Table fields as xml elements";
            let fieldNodeTypes = [
                {
                    label: fieldAsAttributeText,
                    description: ""
                },
                {
                    label: fieldAsElementText,
                    description: ""
                }
            ];
            let selectedNodeType = yield vscode.window.showQuickPick(fieldNodeTypes);
            if ((!selectedNodeType) || (!selectedNodeType.label)) {
                return undefined;
            }
            return (selectedNodeType.label == fieldAsElementText);
        });
    }
    getDefaultXmlPortName(tableSymbol) {
        return `${tableSymbol.name.trim()} XmlPort`;
    }
}
exports.ALSymbolsBasedXmlPortWizard = ALSymbolsBasedXmlPortWizard;
//# sourceMappingURL=alSymbolsBasedXmlPortWizard.js.map