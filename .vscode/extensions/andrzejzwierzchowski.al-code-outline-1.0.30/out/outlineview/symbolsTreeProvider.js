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
const path = require("path");
const azSymbolKind_1 = require("../symbolLibraries/azSymbolKind");
class SymbolsTreeProvider {
    constructor(context) {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this._toolsExtensionContext = context;
        this._toolsExtensionContext.activeDocumentSymbols.onSymbolsChanged(symbolsLib => this.onSymbolsChanged(symbolsLib));
    }
    onSymbolsChanged(library) {
        this._treeRoot = library.rootSymbol;
        if (this._onDidChangeTreeData)
            this._onDidChangeTreeData.fire();
    }
    refresh() {
        this._toolsExtensionContext.activeDocumentSymbols.loadAsync(true);
    }
    getSymbolIcon(symbol) {
        let icon = "tree-" + symbol.icon + ".svg";
        return {
            light: this._toolsExtensionContext.vscodeExtensionContext.asAbsolutePath(path.join("resources", "images", "light", icon)),
            dark: this._toolsExtensionContext.vscodeExtensionContext.asAbsolutePath(path.join("resources", "images", "dark", icon))
        };
    }
    getNodeCollapsibleState(element) {
        if ((element.childSymbols) && (element.childSymbols.length > 0)) {
            switch (element.kind) {
                //AL Symbols
                case azSymbolKind_1.AZSymbolKind.MethodDeclaration:
                case azSymbolKind_1.AZSymbolKind.ParameterList:
                case azSymbolKind_1.AZSymbolKind.TriggerDeclaration:
                case azSymbolKind_1.AZSymbolKind.LocalMethodDeclaration:
                case azSymbolKind_1.AZSymbolKind.EventDeclaration:
                case azSymbolKind_1.AZSymbolKind.EventTriggerDeclaration:
                case azSymbolKind_1.AZSymbolKind.PageHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.ReportHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.ConfirmHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.MessageHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.StrMenuHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.HyperlinkHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.ModalPageHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.FilterPageHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.RequestPageHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.SessionSettingsHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.SendNotificationHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.TestDeclaration:
                case azSymbolKind_1.AZSymbolKind.Field:
                case azSymbolKind_1.AZSymbolKind.PageField:
                case azSymbolKind_1.AZSymbolKind.PageAction:
                //Other Symbols
                case azSymbolKind_1.AZSymbolKind.Class:
                case azSymbolKind_1.AZSymbolKind.Field:
                    return vscode.TreeItemCollapsibleState.Collapsed;
                default:
                    return vscode.TreeItemCollapsibleState.Expanded;
            }
        }
        else
            return vscode.TreeItemCollapsibleState.None;
    }
    //#region TreeDataProvider implementation
    getTreeItem(element) {
        let treeItem = new vscode.TreeItem(element.fullName);
        treeItem.iconPath = this.getSymbolIcon(element);
        treeItem.collapsibleState = this.getNodeCollapsibleState(element);
        //node command
        if (element.selectionRange)
            treeItem.command = {
                command: 'azALDevTools.selectDocumentText',
                title: '',
                arguments: [
                    element.selectionRange
                ]
            };
        //node context
        treeItem.contextValue = azSymbolKind_1.AZSymbolKind[element.kind];
        return treeItem;
    }
    getChildren(element) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((element) && (element.childSymbols))
                return element.childSymbols;
            if ((!element) && (this._treeRoot) && (this._treeRoot.childSymbols))
                return this._treeRoot.childSymbols;
            return [];
        });
    }
}
exports.SymbolsTreeProvider = SymbolsTreeProvider;
//# sourceMappingURL=symbolsTreeProvider.js.map