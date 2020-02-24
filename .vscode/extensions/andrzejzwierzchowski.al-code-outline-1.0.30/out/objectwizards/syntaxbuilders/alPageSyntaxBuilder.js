'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALPageSyntaxBuilder {
    constructor() {
    }
    buildFromPageWizardData(data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter();
        let isApi = (data.pageType.toLowerCase() === "api");
        writer.writeStartObject("page", data.objectId, data.objectName);
        writer.writeLine("");
        writer.writeProperty("PageType", data.pageType);
        writer.writeProperty("SourceTable", writer.encodeName(data.selectedTable));
        if (isApi) {
            writer.writeProperty("APIPublisher", writer.encodeString(data.apiPublisher));
            writer.writeProperty("APIGroup", writer.encodeString(data.apiGroup));
            writer.writeProperty("APIVersion", writer.encodeString(data.apiVersion));
            writer.writeProperty("EntityName", writer.encodeString(data.entityName));
            writer.writeProperty("EntitySetName", writer.encodeString(data.entitySetName));
            writer.writeProperty("DelayedInsert", "true");
            writer.writeProperty("Caption", writer.encodeString(writer.createApiName(data.objectName)));
        }
        else {
            writer.writeProperty("Caption", writer.encodeString(data.objectName));
        }
        //usage category and application area for list pages
        if (data.pageType === "List") {
            if ((data.usageCategory) && (data.usageCategory !== "")) {
                //application area requires useage category to be set
                if ((data.appArea) && (data.appArea !== ""))
                    writer.writeProperty("ApplicationArea", data.appArea);
                writer.writeProperty("UsageCategory", data.usageCategory);
            }
        }
        writer.writeLine("");
        writer.writeStartLayout();
        writer.writeStartGroup("area", "content");
        if (data.isFastTabsPageType()) {
            if (data.fastTabsData) {
                for (let tabIdx = 0; tabIdx < data.fastTabsData.length; tabIdx++) {
                    let fastTab = data.fastTabsData[tabIdx];
                    writer.writeStartGroup("group", fastTab.name);
                    if (fastTab.fields) {
                        for (let fldIdx = 0; fldIdx < fastTab.fields.length; fldIdx++) {
                            writer.writePageField(fastTab.fields[fldIdx]);
                        }
                    }
                    writer.writeEndBlock();
                }
            }
        }
        else {
            writer.writeStartGroup("repeater", "General");
            if (data.selectedFieldList) {
                for (let i = 0; i < data.selectedFieldList.length; i++) {
                    if (isApi)
                        writer.writeApiPageField(data.selectedFieldList[i]);
                    else
                        writer.writePageField(data.selectedFieldList[i]);
                }
            }
            writer.writeEndBlock();
        }
        writer.writeEndBlock();
        writer.writeEndLayout();
        writer.writeLine("");
        writer.writeEndObject();
        return writer.toString();
    }
}
exports.ALPageSyntaxBuilder = ALPageSyntaxBuilder;
//# sourceMappingURL=alPageSyntaxBuilder.js.map