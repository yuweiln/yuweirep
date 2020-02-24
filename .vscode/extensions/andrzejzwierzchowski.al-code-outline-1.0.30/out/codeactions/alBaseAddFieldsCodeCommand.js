"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alCodeCommand_1 = require("./alCodeCommand");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
class ALBaseAddFieldsCodeCommand extends alCodeCommand_1.ALCodeCommand {
    constructor(context, commandName) {
        super(context, commandName);
    }
    removeExistingFields(fieldNames, existingFields, existingFieldKind, noFieldsMessage) {
        if (!fieldNames)
            return undefined;
        if (existingFields) {
            for (let i = 0; i < existingFields.length; i++) {
                if ((existingFields[i].kind == existingFieldKind) && (existingFields[i].source)) {
                    let idx = fieldNames.indexOf(existingFields[i].source);
                    if (idx >= 0) {
                        if (idx < (fieldNames.length - 1))
                            fieldNames[idx] = fieldNames[fieldNames.length - 1];
                        fieldNames.pop();
                    }
                }
            }
        }
        if (fieldNames.length == 0) {
            vscode.window.showWarningMessage(noFieldsMessage);
            return undefined;
        }
        return fieldNames.sort();
    }
    insertSymbolContentAsync(symbol, content) {
        return __awaiter(this, void 0, void 0, function* () {
            let line = 0;
            let column = 0;
            if ((symbol.kind == azSymbolKind_1.AZSymbolKind.PageField) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.PageUserControl) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.QueryColumn) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.ReportColumn) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortFieldElement) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortFieldAttribute)) {
                line = symbol.range.end.line;
                column = symbol.range.end.character;
            }
            else {
                line = symbol.contentRange.end.line;
                let nextSymbolColumn = symbol.contentRange.end.character;
                if ((symbol.childSymbols) && (symbol.childSymbols.length > 0)) {
                    for (let i = 0; i < symbol.childSymbols.length; i++) {
                        if ((symbol.childSymbols[i].range) && (symbol.childSymbols[i].range.start.line < line)) {
                            line = symbol.childSymbols[i].range.start.line;
                            nextSymbolColumn = symbol.childSymbols[i].range.start.character;
                        }
                    }
                }
                //is insert in the first content line?
                if (line == symbol.contentRange.start.line) {
                    column = nextSymbolColumn;
                    content = '\n' + content;
                }
                ;
            }
            yield vscode.window.activeTextEditor.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(line, column), content);
            });
        });
    }
}
exports.ALBaseAddFieldsCodeCommand = ALBaseAddFieldsCodeCommand;
//# sourceMappingURL=alBaseAddFieldsCodeCommand.js.map