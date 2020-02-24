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
const alSyntaxWriter_1 = require("../allanguage/alSyntaxWriter");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const alBaseAddFieldsCodeCommand_1 = require("./alBaseAddFieldsCodeCommand");
const fieldsSelector_1 = require("./fieldsSelector");
class ALAddReportFieldsCodeCommand extends alBaseAddFieldsCodeCommand_1.ALBaseAddFieldsCodeCommand {
    constructor(context) {
        super(context, 'AZDevTools.ALAddReportFieldsCodeCommand');
    }
    runAsync(range) {
        return __awaiter(this, void 0, void 0, function* () {
            //get required details from document source code
            let symbol = this._toolsExtensionContext.activeDocumentSymbols.findSymbolInRange(range);
            let isFieldSymbol = (symbol.kind == azSymbolKind_1.AZSymbolKind.ReportColumn);
            let dataItemSymbol = symbol;
            if (isFieldSymbol)
                dataItemSymbol = symbol.findParentByKind(azSymbolKind_1.AZSymbolKind.ReportDataItem);
            if ((!symbol) ||
                (!dataItemSymbol) ||
                (!dataItemSymbol.source) ||
                (!dataItemSymbol.contentRange) ||
                ((isFieldSymbol) && (!symbol.range)))
                return;
            //get list of fields
            let fieldNames = yield this._toolsExtensionContext.alLangProxy.getFieldList(this.getDocumentUri(), dataItemSymbol.source);
            //remove existing fields from the list
            fieldNames = this.removeExistingFields(fieldNames, dataItemSymbol.childSymbols, azSymbolKind_1.AZSymbolKind.ReportColumn, 'All available table fields have already been added to the report.');
            if (!fieldNames)
                return;
            //ask for fields
            let fieldsSelector = new fieldsSelector_1.FieldsSelector();
            let selectedFields = yield fieldsSelector.selectFields('Select table fields', fieldNames);
            if (!selectedFields)
                return;
            let indent = dataItemSymbol.contentRange.start.character + 3;
            //insert fields
            let writer = new alSyntaxWriter_1.ALSyntaxWriter();
            writer.setIndent(indent);
            for (let i = 0; i < selectedFields.length; i++) {
                writer.writeNameSourceBlock("column", writer.createName(selectedFields[i]), writer.encodeName(selectedFields[i]));
            }
            let source = writer.toString();
            yield this.insertSymbolContentAsync(symbol, source);
        });
    }
}
exports.ALAddReportFieldsCodeCommand = ALAddReportFieldsCodeCommand;
//# sourceMappingURL=alAddReportFieldsCodeCommand.js.map