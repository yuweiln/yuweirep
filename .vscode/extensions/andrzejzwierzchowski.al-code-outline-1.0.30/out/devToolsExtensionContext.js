'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const alLangServerProxy_1 = require("./allanguage/alLangServerProxy");
const toolsLangServerClient_1 = require("./langserver/toolsLangServerClient");
const azActiveDocumentSymbolsLibrary_1 = require("./symbollibraries/azActiveDocumentSymbolsLibrary");
const alObjectRunner_1 = require("./alObjectRunner");
const alSymbolsBrowser_1 = require("./alsymbolsbrowser/alSymbolsBrowser");
const alObjectsBrowser_1 = require("./alsymbolsbrowser/alObjectsBrowser");
const alOutlineService_1 = require("./services/alOutlineService");
const alObjectWizardsService_1 = require("./services/alObjectWizardsService");
const alCompletionService_1 = require("./services/alCompletionService");
const alSymbolsTreeService_1 = require("./services/alSymbolsTreeService");
const codeAnalyzersService_1 = require("./services/codeAnalyzersService");
const alSymbolsService_1 = require("./services/alSymbolsService");
const alCodeTransformationService_1 = require("./services/alCodeTransformationService");
const ALCodeActionsService_1 = require("./services/ALCodeActionsService");
class DevToolsExtensionContext {
    constructor(context) {
        this.alLangProxy = new alLangServerProxy_1.ALLangServerProxy();
        this.vscodeExtensionContext = context;
        let alExtensionPath = "";
        if (this.alLangProxy.extensionPath)
            alExtensionPath = this.alLangProxy.extensionPath;
        this.toolsLangServerClient = new toolsLangServerClient_1.ToolsLangServerClient(context, alExtensionPath);
        this.activeDocumentSymbols = new azActiveDocumentSymbolsLibrary_1.AZActiveDocumentSymbolsLibrary(this);
        this.objectRunner = new alObjectRunner_1.ALObjectRunner(this);
        this.alOutlineService = new alOutlineService_1.ALOutlineService(this);
        this.alSymbolsTreeService = new alSymbolsTreeService_1.ALSymbolsTreeService(this);
        this.alWizardsService = new alObjectWizardsService_1.ALObjectWizardsService(this);
        this.alCompletionService = new alCompletionService_1.ALCompletionService(this);
        this.codeAnalyzersService = new codeAnalyzersService_1.CodeAnalyzersService(this);
        this.symbolsService = new alSymbolsService_1.ALSymbolsService(this);
        this.alCodeTransformationService = new alCodeTransformationService_1.ALCodeTransformationService(this);
        this.alCodeActionsService = new ALCodeActionsService_1.ALCodeActionsService(this);
    }
    getUseSymbolsBrowser() {
        let useSymbolsBrowser = this.vscodeExtensionContext.globalState.get("azALDevTools.useSymbolsBrowser");
        return useSymbolsBrowser;
    }
    setUseSymbolsBrowser(newValue) {
        this.vscodeExtensionContext.globalState.update("azALDevTools.useSymbolsBrowser", newValue);
    }
    showSymbolsBrowser(library) {
        if (this.getUseSymbolsBrowser()) {
            let symbolsBrowser = new alSymbolsBrowser_1.ALSymbolsBrowser(this, library);
            symbolsBrowser.show();
        }
        else {
            let objectsBrowser = new alObjectsBrowser_1.ALObjectsBrowser(this, library);
            objectsBrowser.show();
        }
    }
    dispose() {
    }
}
exports.DevToolsExtensionContext = DevToolsExtensionContext;
//# sourceMappingURL=devToolsExtensionContext.js.map