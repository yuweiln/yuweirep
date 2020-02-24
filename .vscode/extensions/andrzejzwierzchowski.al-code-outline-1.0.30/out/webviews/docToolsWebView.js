"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const baseWebViewEditor_1 = require("./baseWebViewEditor");
class DocToolsWebView extends baseWebViewEditor_1.BaseWebViewEditor {
    constructor(devToolsContext, documentName, documentUri) {
        if ((!documentName) && (documentUri))
            documentName = path.parse(documentUri.path).base;
        super(devToolsContext.vscodeExtensionContext, documentName);
        this._documentUri = documentUri;
        this._devToolsContext = devToolsContext;
        this._loaded = false;
        this._viewColumn = vscode.ViewColumn.Beside;
    }
}
exports.DocToolsWebView = DocToolsWebView;
//# sourceMappingURL=docToolsWebView.js.map