'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const devToolsExtensionContext_1 = require("./devToolsExtensionContext");
const alAppSymbolsLibrary_1 = require("./symbollibraries/alAppSymbolsLibrary");
const alActionImageBrowser_1 = require("./actionimagebrowser/alActionImageBrowser");
const alNativeAppSymbolsLibrariesCache_1 = require("./symbollibraries/nativeimpl/alNativeAppSymbolsLibrariesCache");
const alProjectSymbolsLibrary_1 = require("./symbollibraries/alProjectSymbolsLibrary");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const toolsExtensionContext = new devToolsExtensionContext_1.DevToolsExtensionContext(context);
    let nativeAppCache = undefined;
    toolsExtensionContext.activeDocumentSymbols.loadAsync(false);
    context.subscriptions.push(toolsExtensionContext);
    //al app viewer
    context.subscriptions.push(vscode.commands.registerCommand('azALDevTools.viewALApp', (fileUri) => {
        let uri = fileUri;
        let lib;
        if (toolsExtensionContext.toolsLangServerClient.isEnabled())
            lib = new alAppSymbolsLibrary_1.ALAppSymbolsLibrary(toolsExtensionContext, uri.fsPath);
        else {
            //if language server is not available on this platform or with currently active
            //version of Microsoft AL Extension, then we have to use simplified native implementation
            //of app package reader
            if (!nativeAppCache)
                nativeAppCache = new alNativeAppSymbolsLibrariesCache_1.ALNativeAppSymbolsLibrariesCache(toolsExtensionContext);
            lib = nativeAppCache.getOrCreate(uri.fsPath);
        }
        toolsExtensionContext.showSymbolsBrowser(lib);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showAllProjectSymbols', () => {
        let workspacePath = toolsExtensionContext.alLangProxy.getCurrentWorkspaceFolderPath();
        if (workspacePath) {
            let lib = new alProjectSymbolsLibrary_1.ALProjectSymbolsLibrary(toolsExtensionContext, true, workspacePath);
            toolsExtensionContext.showSymbolsBrowser(lib);
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showProjectSymbolsWithoutDep', () => {
        let workspacePath = toolsExtensionContext.alLangProxy.getCurrentWorkspaceFolderPath();
        if (workspacePath) {
            let lib = new alProjectSymbolsLibrary_1.ALProjectSymbolsLibrary(toolsExtensionContext, false, workspacePath);
            toolsExtensionContext.showSymbolsBrowser(lib);
        }
    }));
    //al action images viewer
    context.subscriptions.push(vscode.commands.registerCommand('azALDevTools.viewActionImages', () => {
        let actionImageBrowser = new alActionImageBrowser_1.ALActionImageBrowser(toolsExtensionContext);
        actionImageBrowser.show();
    }));
    return toolsExtensionContext;
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map