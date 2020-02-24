"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseSyntaxWriter_1 = require("./baseSyntaxWriter");
class CARulesWriter extends baseSyntaxWriter_1.BaseSyntaxWriter {
    constructor() {
        super();
        this._arraySize = [];
    }
    writeComment(line) {
        this.writeLine('// ' + line);
    }
    writeStartBlock() {
        this.writeLine('{');
        this.incIndent();
    }
    writeEndBlock() {
        this.decIndent();
        this.writeLine('}');
    }
    writeStartArray(name) {
        if (name)
            this.writeLine('"' + name + '": [');
        else
            this.writeLine('[');
        this.incIndent();
        this._arraySize.push(0);
    }
    writeEndArray() {
        this.decIndent();
        this.decIndent();
        this._arraySize.pop();
    }
    writeJson(obj) {
        this.writeLine(JSON.stringify(obj, undefined, this.getIndentString()));
    }
    writeStartRuleset() {
        this.writeStartBlock();
        this.writeStartArray('rules');
    }
    writeEndRuleset() {
        this.writeEndArray();
        this.writeEndBlock();
    }
}
exports.CARulesWriter = CARulesWriter;
//# sourceMappingURL=caruleswriter.js.map