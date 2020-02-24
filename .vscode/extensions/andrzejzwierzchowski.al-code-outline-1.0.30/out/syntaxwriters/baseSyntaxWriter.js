"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseSyntaxWriter {
    constructor() {
        this._content = '';
        this._indentText = '';
        this._indentPart = '    ';
    }
    toString() {
        return this._content;
    }
    incIndent() {
        this._indentText += this._indentPart;
    }
    decIndent() {
        if (this._indentText.length > this._indentPart.length)
            this._indentText = this._indentText.substr(0, this._indentText.length - this._indentPart.length);
        else
            this._indentText = "";
    }
    setIndent(value) {
        let text = " ";
        this._indentText = text.repeat(value);
    }
    getIndentString() {
        return this._indentText;
    }
    writeLine(line) {
        this._content += (this._indentText + line + "\n");
    }
}
exports.BaseSyntaxWriter = BaseSyntaxWriter;
//# sourceMappingURL=baseSyntaxWriter.js.map