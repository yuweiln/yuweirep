'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
class ALSyntaxHelper {
    static toNameText(name) {
        if (name.match(/^[a-zA-Z_]\w*$/))
            return name;
        return "\"" + name.replace(new RegExp("\"", "g"), "\"\"") + "\"";
    }
    static toStringText(text) {
        return "'" + text.replace(new RegExp("'", "g"), "''") + "'";
    }
    static fromNameText(name) {
        name = name.trim();
        if ((name.length > 1) && (name.substr(0, 1) == "\"") && (name.substr(name.length - 1, 1) == "\"")) {
            name = name.substr(1, name.length - 2).replace(new RegExp("\"\"", "g"), "\"");
        }
        return name;
    }
    static fromStringText(text) {
        text = text.trim();
        if ((text.length > 1) && (text.substr(0, 1) == "'") && (text.substr(text.length - 1, 1) == "'")) {
            text = text.substr(1, text.length - 2).replace(new RegExp("''", "g"), "'");
        }
        return text;
    }
    static getNameFromString(text, startPos) {
        let endPos = startPos;
        let inName = false;
        //skip invalid characters
        while ((startPos < text.length) && (ALSyntaxHelper.spaceChar(text.charAt(startPos))))
            startPos++;
        //skip name
        inName = false;
        endPos = startPos;
        while ((endPos < text.length) && ((inName) || (ALSyntaxHelper.validNameChar(text.charAt(endPos))))) {
            if (text.charAt(endPos) == '"')
                inName = !inName;
            endPos++;
        }
        if (endPos > startPos)
            return ALSyntaxHelper.fromNameText(text.substr(startPos, endPos - startPos));
        return '';
    }
    static validNameChar(text) {
        return (ALSyntaxHelper.nameCharacters.indexOf(text) >= 0);
    }
    static spaceChar(text) {
        return (text <= ' ');
    }
    static kindToVariableType(kind) {
        switch (kind) {
            case azSymbolKind_1.AZSymbolKind.TableObject:
                return "record";
            case azSymbolKind_1.AZSymbolKind.CodeunitObject:
                return "codeunit";
            case azSymbolKind_1.AZSymbolKind.PageObject:
                return "page";
            case azSymbolKind_1.AZSymbolKind.ReportObject:
                return "report";
            case azSymbolKind_1.AZSymbolKind.QueryObject:
                return "query";
            case azSymbolKind_1.AZSymbolKind.XmlPortObject:
                return "xmlport";
            case azSymbolKind_1.AZSymbolKind.ControlAddInObject:
                return "usercontrol";
            case azSymbolKind_1.AZSymbolKind.EnumType:
                return "enum";
        }
        return undefined;
    }
    static kindToWorkspaceSymbolType(kind) {
        switch (kind) {
            case azSymbolKind_1.AZSymbolKind.TableObject:
                return "Record";
            case azSymbolKind_1.AZSymbolKind.CodeunitObject:
                return "Codeunit";
            case azSymbolKind_1.AZSymbolKind.PageObject:
                return "Page";
            case azSymbolKind_1.AZSymbolKind.ReportObject:
                return "Report";
            case azSymbolKind_1.AZSymbolKind.QueryObject:
                return "Query";
            case azSymbolKind_1.AZSymbolKind.XmlPortObject:
                return "XmlPort";
            case azSymbolKind_1.AZSymbolKind.ControlAddInObject:
                return "UserControl";
            case azSymbolKind_1.AZSymbolKind.EnumType:
                return "Enum";
            case azSymbolKind_1.AZSymbolKind.TableExtensionObject:
                return "TableExtension";
            case azSymbolKind_1.AZSymbolKind.PageExtensionObject:
                return "PageExtension";
            case azSymbolKind_1.AZSymbolKind.PageCustomizationObject:
                return "PageCustomization";
            case azSymbolKind_1.AZSymbolKind.EnumExtensionType:
                return "EnumExtension";
            case azSymbolKind_1.AZSymbolKind.ProfileObject:
                return "Profile";
        }
        return undefined;
    }
}
ALSyntaxHelper.nameCharacters = '0123456789QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm-_"';
exports.ALSyntaxHelper = ALSyntaxHelper;
//# sourceMappingURL=alSyntaxHelper.js.map