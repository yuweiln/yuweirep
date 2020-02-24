'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALXmlPortSyntaxBuilder {
    constructor() {
    }
    buildFromXmlPortWizardData(data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        writer.writeStartObject("xmlport", data.objectId, data.objectName);
        //write dataset
        this.writeSchema(writer, data);
        //write report request page suggestion
        if (data.createRequestPage)
            this.writeRequestPage(writer);
        writer.writeEndObject();
        return writer.toString();
    }
    writeSchema(writer, data) {
        let tableElementName = writer.createName(data.selectedTable);
        let fieldNodeName;
        if (data.fieldNodeType == "element")
            fieldNodeName = "fieldelement";
        else
            fieldNodeName = "fieldattribute";
        writer.writeStartNamedBlock("schema");
        writer.writeStartGroup("textelement", "RootNodeName");
        writer.writeStartNameSourceBlock("tableelement", tableElementName, writer.encodeName(data.selectedTable));
        if (data.selectedFieldList) {
            for (let i = 0; i < data.selectedFieldList.length; i++) {
                writer.writeNameSourceBlock(fieldNodeName, writer.createName(data.selectedFieldList[i]), tableElementName + "." + writer.encodeName(data.selectedFieldList[i]));
            }
        }
        writer.writeEndBlock();
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
exports.ALXmlPortSyntaxBuilder = ALXmlPortSyntaxBuilder;
//# sourceMappingURL=alXmlPortSyntaxBuilder.js.map