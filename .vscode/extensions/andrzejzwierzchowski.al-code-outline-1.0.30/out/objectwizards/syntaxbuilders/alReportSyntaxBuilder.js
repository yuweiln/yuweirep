'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALReportSyntaxBuilder {
    constructor() {
    }
    buildFromReportWizardData(data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        writer.writeStartObject("report", data.objectId, data.objectName);
        //write layout path
        if (data.rdlcLayout != "")
            writer.writeProperty("RDLCLayout", writer.encodeString(data.rdlcLayout));
        if (data.wordLayout != "")
            writer.writeProperty("WordLayout", writer.encodeString(data.wordLayout));
        //write dataset
        this.writeDataSet(writer, data);
        //write report request page suggetsion
        if (data.createRequestPage)
            this.writeRequestPage(writer);
        writer.writeEndObject();
        return writer.toString();
    }
    writeDataSet(writer, data) {
        let dataSetName = writer.createName(data.selectedTable);
        writer.writeStartNamedBlock("dataset");
        writer.writeStartNameSourceBlock("dataitem", dataSetName, writer.encodeName(data.selectedTable));
        if (data.selectedFieldList) {
            for (let i = 0; i < data.selectedFieldList.length; i++) {
                writer.writeNameSourceBlock("column", writer.createName(data.selectedFieldList[i]), writer.encodeName(data.selectedFieldList[i]));
            }
        }
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
    writeRequestPage(writer) {
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
}
exports.ALReportSyntaxBuilder = ALReportSyntaxBuilder;
//# sourceMappingURL=alReportSyntaxBuilder.js.map