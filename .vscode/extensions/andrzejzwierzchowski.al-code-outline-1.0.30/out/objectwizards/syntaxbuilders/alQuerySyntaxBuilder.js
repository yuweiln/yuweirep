'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALQuerySyntaxBuilder {
    constructor() {
    }
    buildFromQueryWizardData(data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        let isApi = (data.queryType.toLowerCase() === "api");
        writer.writeStartObject("query", data.objectId, data.objectName);
        writer.writeProperty("QueryType", data.queryType);
        if (isApi) {
            writer.writeProperty("APIPublisher", writer.encodeString(data.apiPublisher));
            writer.writeProperty("APIGroup", writer.encodeString(data.apiGroup));
            writer.writeProperty("APIVersion", writer.encodeString(data.apiVersion));
            writer.writeProperty("EntityName", writer.encodeString(data.entityName));
            writer.writeProperty("EntitySetName", writer.encodeString(data.entitySetName));
        }
        writer.writeLine("");
        //write dataset
        this.writeDataSet(writer, data);
        //write triggers
        writer.writeLine("");
        writer.writeLine("trigger OnBeforeOpen()");
        writer.writeLine("begin");
        writer.writeLine("");
        writer.writeLine("end;");
        writer.writeEndObject();
        return writer.toString();
    }
    writeDataSet(writer, data) {
        let dataItemName = writer.createName(data.selectedTable);
        writer.writeStartNamedBlock("elements");
        writer.writeStartNameSourceBlock("dataitem", dataItemName, writer.encodeName(data.selectedTable));
        if (data.selectedFieldList) {
            for (let i = 0; i < data.selectedFieldList.length; i++) {
                writer.writeNameSourceBlock("column", writer.createName(data.selectedFieldList[i]), writer.encodeName(data.selectedFieldList[i]));
            }
        }
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
}
exports.ALQuerySyntaxBuilder = ALQuerySyntaxBuilder;
//# sourceMappingURL=alQuerySyntaxBuilder.js.map