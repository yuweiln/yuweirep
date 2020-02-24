"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alSyntaxHelper_1 = require("./alSyntaxHelper");
class ALSyntaxWriter {
    constructor() {
        this.content = "";
        this.indentText = "";
        this.indentPart = "    ";
        this.applicationArea = vscode.workspace.getConfiguration('alOutline').get('defaultAppArea');
    }
    toString() {
        return this.content;
    }
    incIndent() {
        this.indentText += this.indentPart;
    }
    decIndent() {
        if (this.indentText.length > this.indentPart.length)
            this.indentText = this.indentText.substr(0, this.indentText.length - this.indentPart.length);
        else
            this.indentText = "";
    }
    setIndent(value) {
        let text = " ";
        this.indentText = text.repeat(value);
    }
    writeLine(line) {
        this.content += (this.indentText + line + "\n");
    }
    writeStartBlock() {
        this.writeLine("{");
        this.incIndent();
    }
    writeEndBlock() {
        this.decIndent();
        this.writeLine("}");
    }
    writeStartNamedBlock(name) {
        this.writeLine(name);
        this.writeStartBlock();
    }
    writeStartNameSourceBlock(blockName, propertyName, propertySource) {
        this.writeLine(blockName + "(" + propertyName + "; " + propertySource + ")");
        this.writeStartBlock();
    }
    writeNameSourceBlock(blockName, propertyName, propertySource) {
        this.writeStartNameSourceBlock(blockName, propertyName, propertySource);
        this.writeEndBlock();
    }
    writeStartObject(type, id, name) {
        var objectIdText;
        if ((id == '') || (id == '0'))
            objectIdText = 'id';
        else
            objectIdText = id.toString();
        name = alSyntaxHelper_1.ALSyntaxHelper.toNameText(name);
        this.writeLine(type + " " + objectIdText + " " + name);
        this.writeStartBlock();
    }
    writeStartExtensionObject(type, id, extname, targetName) {
        var objectIdText;
        if ((id == '') || (id == '0'))
            objectIdText = 'id';
        else
            objectIdText = id.toString();
        extname = alSyntaxHelper_1.ALSyntaxHelper.toNameText(extname);
        targetName = alSyntaxHelper_1.ALSyntaxHelper.toNameText(targetName);
        this.writeLine(type + " " + objectIdText + " " + extname + " extends " + targetName);
        this.writeStartBlock();
    }
    writeEndObject() {
        this.writeEndBlock();
    }
    writeStartLayout() {
        this.writeLine("layout");
        this.writeStartBlock();
    }
    writeEndLayout() {
        this.writeEndBlock();
    }
    writeStartActions() {
        this.writeLine("actions");
        this.writeStartBlock();
    }
    writeEndActions() {
        this.writeEndBlock();
    }
    writeStartFields() {
        this.writeLine("fields");
        this.writeStartBlock();
    }
    writeEndFields() {
        this.writeEndBlock();
    }
    writeStartGroup(type, name) {
        this.writeLine(type + "(" + name + ")");
        this.writeStartBlock();
    }
    writeProperty(name, value) {
        this.writeLine(name + " = " + value + ";");
    }
    writeTableField(fieldId, fieldName, fieldDataType, fieldLength, dataClassification) {
        let dataType = fieldDataType.toLowerCase();
        if ((fieldLength) && ((dataType == 'text') || (dataType == 'code')))
            fieldDataType = fieldDataType + '[' + fieldLength + ']';
        this.writeLine("field(" + fieldId + "; " + alSyntaxHelper_1.ALSyntaxHelper.toNameText(fieldName) + "; " + fieldDataType + ")");
        this.writeStartBlock();
        this.writeProperty('Caption', alSyntaxHelper_1.ALSyntaxHelper.toStringText(fieldName));
        if (dataClassification)
            this.writeProperty("DataClassification", dataClassification);
        else
            this.writeProperty("DataClassification", "ToBeClassified");
        this.writeEndBlock();
    }
    writePageField(fieldName) {
        this.writeStartNameSourceBlock("field", this.encodeName(fieldName), this.encodeName(fieldName));
        this.writeApplicationArea();
        this.writeEndBlock();
    }
    writeApiPageField(fieldName) {
        let name = this.createApiName(fieldName);
        this.writeStartNameSourceBlock("field", this.encodeName(name), this.encodeName(fieldName));
        this.writeProperty("Caption", this.encodeString(name));
        this.writeApplicationArea();
        this.writeEndBlock();
    }
    writeApplicationArea() {
        if ((this.applicationArea) && (this.applicationArea !== ""))
            this.writeProperty("ApplicationArea", this.applicationArea);
    }
    encodeString(text) {
        return alSyntaxHelper_1.ALSyntaxHelper.toStringText(text);
    }
    encodeName(name) {
        return alSyntaxHelper_1.ALSyntaxHelper.toNameText(name);
    }
    createName(source) {
        return source.replace(/\W/g, '');
    }
    createApiName(source) {
        return source.replace(/[^A-Za-z]/g, '');
    }
}
exports.ALSyntaxWriter = ALSyntaxWriter;
//# sourceMappingURL=alSyntaxWriter.js.map