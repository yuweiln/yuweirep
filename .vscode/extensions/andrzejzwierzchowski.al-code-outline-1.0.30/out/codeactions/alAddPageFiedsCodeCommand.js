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
class ALAddPageFieldsCodeCommand extends alBaseAddFieldsCodeCommand_1.ALBaseAddFieldsCodeCommand {
    constructor(context) {
        super(context, 'AZDevTools.ALAddPageFieldsCodeCommand');
    }
    runAsync(range) {
        return __awaiter(this, void 0, void 0, function* () {
            //get required details from document source code
            let symbol = this._toolsExtensionContext.activeDocumentSymbols.findSymbolInRange(range);
            if (!symbol)
                return;
            let parentKind = [azSymbolKind_1.AZSymbolKind.PageObject, azSymbolKind_1.AZSymbolKind.PageExtensionObject];
            let pageSymbol = symbol.findParentByKindList(parentKind);
            let isFieldSymbol = ((symbol.kind == azSymbolKind_1.AZSymbolKind.PageField) || (symbol.kind == azSymbolKind_1.AZSymbolKind.PageUserControl));
            if ((!pageSymbol) ||
                ((!isFieldSymbol) && (!symbol.contentRange)) ||
                ((isFieldSymbol) && (!symbol.range)) ||
                ((!pageSymbol.source) && (!pageSymbol.extends)))
                return;
            //collect existing page fields
            let existingFields = [];
            pageSymbol.collectChildSymbols(azSymbolKind_1.AZSymbolKind.PageField, existingFields);
            //load list of table fields
            let fieldNames;
            if (pageSymbol.kind == azSymbolKind_1.AZSymbolKind.PageObject)
                fieldNames = yield this._toolsExtensionContext.alLangProxy.getFieldList(this.getDocumentUri(), pageSymbol.source);
            else if (pageSymbol.extends)
                fieldNames = yield this._toolsExtensionContext.alLangProxy.getAvailablePageFieldList(this.getDocumentUri(), pageSymbol.extends);
            else
                return;
            //remove existing fields from the list
            fieldNames = this.removeExistingFields(fieldNames, existingFields, azSymbolKind_1.AZSymbolKind.PageField, 'All available table fields have already been added to the page.');
            if (!fieldNames)
                return;
            //ask for fields
            let fieldsSelector = new fieldsSelector_1.FieldsSelector();
            let selectedFields = yield fieldsSelector.selectFields('Select table fields', fieldNames);
            if (!selectedFields)
                return;
            let indent = 0;
            let fieldsContainer = symbol;
            if (isFieldSymbol)
                fieldsContainer = symbol.parent;
            if ((fieldsContainer) && (fieldsContainer.contentRange))
                indent = fieldsContainer.contentRange.start.character + 3;
            else
                indent = symbol.range.start.character + 3;
            //insert fields
            let writer = new alSyntaxWriter_1.ALSyntaxWriter();
            writer.setIndent(indent);
            for (let i = 0; i < selectedFields.length; i++) {
                writer.writePageField(selectedFields[i]);
            }
            let source = writer.toString();
            yield this.insertSymbolContentAsync(symbol, source);
        });
    }
}
exports.ALAddPageFieldsCodeCommand = ALAddPageFieldsCodeCommand;
//# sourceMappingURL=alAddPageFiedsCodeCommand.js.map