'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALEnumExtSyntaxBuilder {
    constructor() {
    }
    buildFromEnumExtWizardData(data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        writer.writeStartExtensionObject("enumextension", data.objectId, data.objectName, data.baseEnum);
        writer.writeLine("");
        if ((data.valueList) && (data.valueList != "")) {
            let values = data.valueList.split(",");
            let captions;
            if ((data.captionList) && (data.captionList != ""))
                captions = data.captionList.split(",");
            else
                captions = [];
            let valueId = data.firstValueId;
            if ((values) && (values.length > 0)) {
                for (let i = 0; i < values.length; i++) {
                    writer.writeStartNameSourceBlock("value", valueId.toString(), writer.encodeName(values[i]));
                    if (captions.length > i)
                        writer.writeProperty("Caption", writer.encodeString(captions[i]));
                    else
                        writer.writeProperty("Caption", writer.encodeString(values[i]));
                    writer.writeEndBlock();
                    valueId++;
                }
            }
        }
        writer.writeLine("");
        writer.writeEndObject();
        return writer.toString();
    }
}
exports.ALEnumExtSyntaxBuilder = ALEnumExtSyntaxBuilder;
//# sourceMappingURL=alEnumExtSyntaxBuilder.js.map