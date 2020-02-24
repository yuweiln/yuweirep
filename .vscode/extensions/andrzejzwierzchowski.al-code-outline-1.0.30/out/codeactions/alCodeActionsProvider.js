"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const alAddPageFiedsCodeCommand_1 = require("./alAddPageFiedsCodeCommand");
const alAddQueryFieldsCodeCommand_1 = require("./alAddQueryFieldsCodeCommand");
const alAddReportFieldsCodeCommand_1 = require("./alAddReportFieldsCodeCommand");
const addXmlPortFieldsCodeCommand_1 = require("./addXmlPortFieldsCodeCommand");
class ALCodeActionsProvider {
    constructor(context) {
        this._toolsExtensionContext = context;
        this._addPageFieldsCommand = new alAddPageFiedsCodeCommand_1.ALAddPageFieldsCodeCommand(this._toolsExtensionContext);
        this._addQueryFieldsCommand = new alAddQueryFieldsCodeCommand_1.ALAddQueryFieldsCodeCommand(this._toolsExtensionContext);
        this._addReportFieldsCommand = new alAddReportFieldsCodeCommand_1.ALAddReportFieldsCodeCommand(this._toolsExtensionContext);
        this._addXmlPortElementsCommand = new addXmlPortFieldsCodeCommand_1.ALAddXmlPortFieldsCodeCommand(this._toolsExtensionContext, 'fieldelement');
        this._addXmlPortAttributesCommand = new addXmlPortFieldsCodeCommand_1.ALAddXmlPortFieldsCodeCommand(this._toolsExtensionContext, 'fieldattribute');
    }
    provideCodeActions(document, range, context, token) {
        if (this._toolsExtensionContext.alLangProxy.version.major < 1)
            return [];
        let actions = [];
        let symbol = this._toolsExtensionContext.activeDocumentSymbols.findSymbolInRange(range);
        if (symbol) {
            //add multiple fields to a page
            if ((symbol.kind == azSymbolKind_1.AZSymbolKind.PageGroup) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.PageRepeater) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.PageArea) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.ControlAddChange) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.PageField) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.PageUserControl)) {
                let action = new vscode.CodeAction("Add multiple fields", vscode.CodeActionKind.QuickFix);
                action.command = { command: this._addPageFieldsCommand.name, title: 'Add multiple fields...' };
                actions.push(action);
            }
            //add multiple fields to a query
            if ((symbol.kind == azSymbolKind_1.AZSymbolKind.QueryDataItem) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.QueryColumn)) {
                let action = new vscode.CodeAction("Add multiple fields", vscode.CodeActionKind.QuickFix);
                action.command = { command: this._addQueryFieldsCommand.name, title: 'Add multiple fields...' };
                actions.push(action);
            }
            //add multiple fields to a report
            if ((symbol.kind == azSymbolKind_1.AZSymbolKind.ReportDataItem) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.ReportColumn)) {
                let action = new vscode.CodeAction("Add multiple fields", vscode.CodeActionKind.QuickFix);
                action.command = { command: this._addReportFieldsCommand.name, title: 'Add multiple fields...' };
                actions.push(action);
            }
            //add miltiple fields to an xmlport
            if ((symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortTableElement) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortFieldElement) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortFieldAttribute)) {
                //elements
                let action = new vscode.CodeAction("Add multiple field elements", vscode.CodeActionKind.QuickFix);
                action.command = { command: this._addXmlPortElementsCommand.name, title: 'Add multiple field elements...' };
                actions.push(action);
                //attributes
                action = new vscode.CodeAction("Add multiple field attributes", vscode.CodeActionKind.QuickFix);
                action.command = { command: this._addXmlPortAttributesCommand.name, title: 'Add multiple field attributes...' };
                actions.push(action);
            }
        }
        return actions;
    }
}
exports.ALCodeActionsProvider = ALCodeActionsProvider;
//# sourceMappingURL=alCodeActionsProvider.js.map