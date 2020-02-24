"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextPosition {
    constructor() {
        this.line = 0;
        this.character = 0;
    }
    static fromAny(source) {
        let val = new TextPosition();
        if (source.line)
            val.line = source.line;
        if (source.character)
            val.character = source.character;
        return val;
    }
    compareVsPosition(position) {
        if (position.line == this.line)
            return (this.character - position.character);
        else
            return (this.line - position.line);
    }
}
exports.TextPosition = TextPosition;
//# sourceMappingURL=textPosition.js.map