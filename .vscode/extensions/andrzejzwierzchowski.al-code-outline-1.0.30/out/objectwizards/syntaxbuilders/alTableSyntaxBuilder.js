"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALTableSyntaxBuilder {
    constructor() {
    }
    buildFromTableWizardData(data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        writer.writeStartObject("table", data.objectId, data.objectName);
        writer.writeProperty("Caption", writer.encodeString(data.objectName));
        writer.writeProperty("DataClassification", "ToBeClassified");
        writer.writeLine("");
        //write fields here
        writer.writeStartFields();
        for (let i = 0; i < data.fields.length; i++) {
            writer.writeTableField(data.fields[i].id, data.fields[i].name, data.fields[i].type, data.fields[i].length, data.fields[i].dataClassification);
        }
        writer.writeEndFields();
        //suggest keys
        writer.writeLine("keys");
        writer.writeStartBlock();
        if (data.fields.length > 0) {
            writer.writeStartNameSourceBlock("key", "PK", writer.encodeName(data.fields[0].name));
            writer.writeProperty("Clustered", "true");
            writer.writeEndBlock();
        }
        writer.writeEndBlock();
        writer.writeLine("");
        writer.writeEndObject();
        return writer.toString();
    }
}
exports.ALTableSyntaxBuilder = ALTableSyntaxBuilder;
//# sourceMappingURL=alTableSyntaxBuilder.js.map