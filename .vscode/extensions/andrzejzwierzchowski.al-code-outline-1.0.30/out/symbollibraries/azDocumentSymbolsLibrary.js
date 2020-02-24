'use strict';
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
const path = require("path");
const azSymbolsLibrary_1 = require("./azSymbolsLibrary");
const azSymbolKind_1 = require("./azSymbolKind");
const toolsDocumentSymbolsRequest_1 = require("../langserver/toolsDocumentSymbolsRequest");
const textRange_1 = require("./textRange");
const azSymbolInformation_1 = require("./azSymbolInformation");
const textEditorHelper_1 = require("../tools/textEditorHelper");
class AZDocumentSymbolsLibrary extends azSymbolsLibrary_1.AZSymbolsLibrary {
    constructor(context, docUri) {
        super();
        this._twoWayTree = true;
        this._context = context;
        this._docUri = docUri;
        this._reloadRequired = true;
        if (this._docUri) {
            this.name = this._docUri.fsPath;
            this.displayName = path.basename(this._docUri.fsPath);
        }
    }
    setDocUri(newUri) {
        this._docUri = newUri;
        this._reloadRequired = true;
    }
    getDocUri() {
        return this._docUri;
    }
    loadInternalAsync(forceReload) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((!forceReload) && (!this._reloadRequired))
                return false;
            let newRootSymbol = undefined;
            //get document symbols
            let document = undefined;
            let editor = textEditorHelper_1.TextEditorHelper.findDocumentEditor(this._docUri);
            if (editor)
                document = editor.document;
            else if (this._docUri)
                document = yield vscode.workspace.openTextDocument(this._docUri);
            if (document) {
                if (document.uri)
                    this._docUri = document.uri;
                let symbolsLoad = vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider', this._docUri);
                if (document.languageId == "al") {
                    //al language - use our special language server to parse source code
                    let source = document.getText();
                    let documentPath = "";
                    if ((this._docUri) && (this._docUri.fsPath))
                        documentPath = this._docUri.fsPath;
                    let request = new toolsDocumentSymbolsRequest_1.ToolsDocumentSymbolsRequest(source, documentPath);
                    let response = yield this._context.toolsLangServerClient.getALDocumentSymbols(request);
                    if ((response) && (response.root)) {
                        newRootSymbol = azSymbolInformation_1.AZSymbolInformation.fromAny(response.root);
                        //merge symbols with symbols returned from Microsoft AL Language Extension
                        let symbols = yield symbolsLoad;
                        if (symbols) {
                            let fieldSymbols = this.collectVsCodeFieldSymbols(symbols);
                            if ((fieldSymbols) && (fieldSymbols.length > 0))
                                this.mergeFieldSymbolNames(this.rootSymbol, fieldSymbols);
                        }
                    }
                    else
                        newRootSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.Document, this.displayName);
                }
                else {
                    //use standard visual studio code symbols functionality to load symbols
                    newRootSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.Document, this.displayName);
                    let symbols = yield symbolsLoad;
                    //vscode.commands.executeCommand<vscode.SymbolInformation[] | vscode.DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', this._docUri);
                    if ((symbols) && (symbols.length > 0)) {
                        if (this.isDocumentSymbolsList(symbols))
                            this.loadDocumentSymbols(newRootSymbol, symbols);
                        else
                            this.loadSymbolsInformation(newRootSymbol, symbols);
                    }
                }
                this.rootSymbol = newRootSymbol;
            }
            return true;
        });
    }
    //#region update field names from our language server with values returned by Microsoft AL Language Extension 
    mergeFieldSymbolNames(azSymbol, vsFieldSymbols) {
        if (!azSymbol)
            return;
        if ((azSymbol.kind == azSymbolKind_1.AZSymbolKind.PageField) ||
            (azSymbol.kind == azSymbolKind_1.AZSymbolKind.QueryColumn) ||
            (azSymbol.kind == azSymbolKind_1.AZSymbolKind.QueryFilter)) {
            let vsSymbol = this.findVsCodeSymbolByRange(vsFieldSymbols, azSymbol.range);
            if (vsSymbol)
                azSymbol.fullName = vsSymbol.name;
        }
        else if (azSymbol.childSymbols) {
            for (let i = 0; i < azSymbol.childSymbols.length; i++) {
                this.mergeFieldSymbolNames(azSymbol.childSymbols[i], vsFieldSymbols);
            }
        }
    }
    findVsCodeSymbolByRange(symbols, range) {
        for (let i = 0; i < symbols.length; i++) {
            if (range.intersectVsRange(symbols[i].range))
                return symbols[i];
        }
        return undefined;
    }
    collectVsCodeFieldSymbols(symbols) {
        if (!symbols)
            return undefined;
        let fieldList = [];
        if (this.isDocumentSymbolsList(symbols))
            this.collectVSCodeFieldDocSymbols(symbols, fieldList);
        else
            this.collectVSCodeFieldSymbolInf(symbols, fieldList);
        fieldList.sort(function (v1, v2) {
            if (v1.range.start.line == v2.range.start.line) {
                if (v1.range.start.character == v2.range.start.character) {
                    if (v1.range.end.line == v2.range.end.line)
                        return v2.range.end.character - v1.range.end.character;
                    else
                        return v2.range.end.line - v1.range.end.line;
                }
                else
                    return v2.range.start.character - v1.range.start.character;
            }
            else
                return v2.range.start.line - v1.range.start.line;
        });
        return fieldList;
    }
    collectVSCodeFieldDocSymbols(symbols, collected) {
        for (let i = 0; i < symbols.length; i++) {
            //if (symbols[i].kind == vscode.SymbolKind.Field)
            //    collected.push(symbols[i]);
            if ((!symbols[i].children) || (symbols[i].children.length == 0))
                collected.push(symbols[i]);
            else
                this.collectVSCodeFieldDocSymbols(symbols[i].children, collected);
        }
    }
    collectVSCodeFieldSymbolInf(symbols, collected) {
        for (let i = 0; i < symbols.length; i++) {
            //if (symbols[i].kind == vscode.SymbolKind.Field)
            collected.push(new vscode.DocumentSymbol(symbols[i].name, '', symbols[i].kind, symbols[i].location.range, symbols[i].location.range));
        }
    }
    //#endregion
    //#region standard vscode symbols processing
    isDocumentSymbolsList(symbols) {
        for (let i = 0; i < symbols.length; i++) {
            if (symbols[i].children)
                return true;
        }
        return false;
    }
    loadDocumentSymbols(parent, vsSymbols) {
        for (let i = 0; i < vsSymbols.length; i++) {
            let vsSymbol = vsSymbols[i];
            let symbol = azSymbolInformation_1.AZSymbolInformation.create(this.vsSymbolKindToazSymbolKind(vsSymbol.kind), vsSymbol.name);
            symbol.range = textRange_1.TextRange.fromAny(vsSymbol.range);
            symbol.selectionRange = textRange_1.TextRange.fromAny(vsSymbol.selectionRange);
            if ((vsSymbol.children) && (vsSymbol.children.length > 0))
                this.loadDocumentSymbols(symbol, vsSymbol.children);
            parent.addChildItem(symbol);
        }
    }
    loadSymbolsInformation(parent, vsSymbols) {
        for (let i = 0; i < vsSymbols.length; i++) {
            let symbol = azSymbolInformation_1.AZSymbolInformation.create(this.vsSymbolKindToazSymbolKind(vsSymbols[i].kind), vsSymbols[i].name);
            if ((vsSymbols[i].location) && (vsSymbols[i].location.range)) {
                symbol.range = textRange_1.TextRange.fromAny(vsSymbols[i].location.range);
                symbol.selectionRange = symbol.range;
            }
            parent.addChildItem(symbol);
        }
    }
    vsSymbolKindToazSymbolKind(kind) {
        switch (kind) {
            case vscode.SymbolKind.File: return azSymbolKind_1.AZSymbolKind.Document;
            case vscode.SymbolKind.Module: return azSymbolKind_1.AZSymbolKind.CodeunitObject;
            case vscode.SymbolKind.Namespace: return azSymbolKind_1.AZSymbolKind.Namespace;
            case vscode.SymbolKind.Package: return azSymbolKind_1.AZSymbolKind.Package;
            case vscode.SymbolKind.Class: return azSymbolKind_1.AZSymbolKind.Class;
            case vscode.SymbolKind.Method: return azSymbolKind_1.AZSymbolKind.MethodDeclaration;
            case vscode.SymbolKind.Property: return azSymbolKind_1.AZSymbolKind.Property;
            case vscode.SymbolKind.Field: return azSymbolKind_1.AZSymbolKind.Field;
            case vscode.SymbolKind.Constructor: return azSymbolKind_1.AZSymbolKind.Constructor;
            case vscode.SymbolKind.Enum: return azSymbolKind_1.AZSymbolKind.EnumType;
            case vscode.SymbolKind.Interface: return azSymbolKind_1.AZSymbolKind.Interface;
            case vscode.SymbolKind.Function: return azSymbolKind_1.AZSymbolKind.LocalMethodDeclaration;
            case vscode.SymbolKind.Variable: return azSymbolKind_1.AZSymbolKind.VariableDeclaration;
            case vscode.SymbolKind.Constant: return azSymbolKind_1.AZSymbolKind.Constant;
            case vscode.SymbolKind.String: return azSymbolKind_1.AZSymbolKind.String;
            case vscode.SymbolKind.Number: return azSymbolKind_1.AZSymbolKind.Number;
            case vscode.SymbolKind.Boolean: return azSymbolKind_1.AZSymbolKind.Boolean;
            case vscode.SymbolKind.Array: return azSymbolKind_1.AZSymbolKind.Array;
            case vscode.SymbolKind.Object: return azSymbolKind_1.AZSymbolKind.Object;
            case vscode.SymbolKind.Key: return azSymbolKind_1.AZSymbolKind.Key;
            case vscode.SymbolKind.Null: return azSymbolKind_1.AZSymbolKind.Null;
            case vscode.SymbolKind.EnumMember: return azSymbolKind_1.AZSymbolKind.EnumValue;
            case vscode.SymbolKind.Struct: return azSymbolKind_1.AZSymbolKind.Struct;
            case vscode.SymbolKind.Event: return azSymbolKind_1.AZSymbolKind.EventDeclaration;
            case vscode.SymbolKind.Operator: return azSymbolKind_1.AZSymbolKind.Operator;
            case vscode.SymbolKind.TypeParameter: return azSymbolKind_1.AZSymbolKind.Parameter;
        }
        return azSymbolKind_1.AZSymbolKind.Undefined;
    }
}
exports.AZDocumentSymbolsLibrary = AZDocumentSymbolsLibrary;
//# sourceMappingURL=azDocumentSymbolsLibrary.js.map