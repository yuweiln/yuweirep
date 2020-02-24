"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const xmlHelper_1 = require("../tools/xmlHelper");
class ALDocCommentsProvider {
    constructor(context) {
        this._context = context;
    }
    provideCompletionItems(document, position, token, context) {
        let completionItems = [];
        let docCommentsType = vscode.workspace.getConfiguration('alOutline', document.uri).get('docCommentsType');
        if (docCommentsType == 'xml') {
            //documentation completion
            let lineStart = document.getText(new vscode.Range(position.line, 0, position.line, position.character));
            if ((lineStart.trim() == '///') && (!this.hasXmlComments(document, position.line - 1)) && (!this.hasXmlComments(document, position.line + 1))) {
                let symbol = this._context.activeDocumentSymbols.findNextSymbol(position.line + 1);
                if (symbol) {
                    let documentationText = ' <summary>\n/// $1\n/// </summary>';
                    let snippetParamIdx = 1;
                    if ((symbol.kind == azSymbolKind_1.AZSymbolKind.MethodDeclaration) ||
                        (symbol.kind == azSymbolKind_1.AZSymbolKind.LocalMethodDeclaration) ||
                        (symbol.kind == azSymbolKind_1.AZSymbolKind.IntegrationEventDeclaration) ||
                        (symbol.kind == azSymbolKind_1.AZSymbolKind.BusinessEventDeclaration)) {
                        //function parameters
                        let parameters = [];
                        symbol.collectChildSymbols(azSymbolKind_1.AZSymbolKind.Parameter, parameters);
                        for (let idx = 0; idx < parameters.length; idx++) {
                            snippetParamIdx++;
                            documentationText = documentationText + '\n/// <param name="' +
                                xmlHelper_1.XmlHelper.EncodeXmlAttributeValue(parameters[idx].name) +
                                '">$' + snippetParamIdx.toString() +
                                '</param>';
                        }
                        //function return value
                        let valPos = symbol.fullName.lastIndexOf(")");
                        if (valPos >= 0) {
                            let retTypeText = symbol.fullName.substr(valPos);
                            if (retTypeText.startsWith(') :')) {
                                snippetParamIdx++;
                                documentationText = documentationText + '\n/// <returns>$' + snippetParamIdx.toString() + '</returns>';
                            }
                        }
                    }
                    let item = new vscode.CompletionItem('Xml Documentation Comments', vscode.CompletionItemKind.Text);
                    item.insertText = new vscode.SnippetString(documentationText);
                    completionItems.push(item);
                }
            }
        }
        return completionItems;
    }
    hasXmlComments(document, line) {
        if (line < 0)
            return false;
        let text = document.getText(new vscode.Range(line, 0, line + 1, 0)).trim();
        return text.startsWith('///');
    }
}
exports.ALDocCommentsProvider = ALDocCommentsProvider;
//# sourceMappingURL=alDocCommentsProvider.js.map