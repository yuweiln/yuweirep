'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALEnumSyntaxBuilder {
    constructor() {
    }
    buildFromEnumWizardData(data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        writer.writeStartObject("enum", data.objectId, data.objectName);
        if (data.extensible)
            writer.writeProperty("Extensible", "true");
        writer.writeLine("");
        if ((data.valueList) && (data.valueList != "")) {
            let values = data.valueList.split(",");
            let captions;
            if ((data.captionList) && (data.captionList != ""))
                captions = data.captionList.split(",");
            else
                captions = [];
            if ((values) && (values.length > 0)) {
                for (let i = 0; i < values.length; i++) {
                    writer.writeStartNameSourceBlock("value", i.toString(), writer.encodeName(values[i]));
                    if (captions.length > i)
                        writer.writeProperty("Caption", writer.encodeString(captions[i]));
                    else
                        writer.writeProperty("Caption", writer.encodeString(values[i]));
                    writer.writeEndBlock();
                }
            }
        }
        writer.writeLine("");
        writer.writeEndObject();
        return writer.toString();
    }
}
exports.ALEnumSyntaxBuilder = ALEnumSyntaxBuilder;
//# sourceMappingURL=alEnumSyntaxBuilder.js.map