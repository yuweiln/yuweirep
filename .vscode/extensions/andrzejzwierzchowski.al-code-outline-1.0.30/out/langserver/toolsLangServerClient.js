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
const cp = require("child_process");
const rpc = require("vscode-jsonrpc");
class ToolsLangServerClient {
    constructor(context, alExtensionPath) {
        this._context = context;
        this._childProcess = undefined;
        this._connection = undefined;
        this._alExtensionPath = alExtensionPath;
        this.initialize();
    }
    dispose() {
        if (this._connection) {
            this._connection.dispose();
            this._connection = undefined;
        }
    }
    initialize() {
        try {
            //find binaries path
            let langServerPath = this._context.asAbsolutePath("bin/AZALDevToolsServer.exe");
            //start child process
            this._childProcess = cp.spawn(langServerPath, [this._alExtensionPath]);
            if (this._childProcess) {
                this._connection = rpc.createMessageConnection(new rpc.StreamMessageReader(this._childProcess.stdout), new rpc.StreamMessageWriter(this._childProcess.stdin));
                this._connection.listen();
            }
        }
        catch (e) {
        }
    }
    getALDocumentSymbols(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this._connection)
                    return undefined;
                let reqType = new rpc.RequestType('al/documentsymbols');
                let val = yield this._connection.sendRequest(reqType, params);
                return val;
            }
            catch (e) {
                return undefined;
            }
        });
    }
    getAppPackageSymbols(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this._connection)
                    return undefined;
                let reqType = new rpc.RequestType('al/packagesymbols');
                let val = yield this._connection.sendRequest(reqType, params);
                return val;
            }
            catch (e) {
                return undefined;
            }
        });
    }
    getProjectSymbols(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this._connection)
                    return undefined;
                let reqType = new rpc.RequestType('al/projectsymbols');
                let val = yield this._connection.sendRequest(reqType, params);
                return val;
            }
            catch (e) {
                return undefined;
            }
        });
    }
    getLibrarySymbolsDetails(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this._connection)
                    return undefined;
                let reqType = new rpc.RequestType('al/librarysymbolsdetails');
                let val = yield this._connection.sendRequest(reqType, params);
                return val;
            }
            catch (e) {
                return undefined;
            }
        });
    }
    closeSymbolsLibrary(params) {
        try {
            if (!this._connection)
                return undefined;
            let reqType = new rpc.NotificationType('al/closesymbolslibrary');
            ;
            this._connection.sendNotification(reqType, params);
        }
        catch (e) {
        }
    }
    getSyntaxTree(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this._connection)
                    return undefined;
                let reqType = new rpc.RequestType('al/getsyntaxtree');
                let val = yield this._connection.sendRequest(reqType, params);
                return val;
            }
            catch (e) {
                return undefined;
            }
        });
    }
    getSyntaxTreeSymbol(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this._connection)
                    return undefined;
                let reqType = new rpc.RequestType('al/getsyntaxtreesymbol');
                let val = yield this._connection.sendRequest(reqType, params);
                return val;
            }
            catch (e) {
                return undefined;
            }
        });
    }
    closeSyntaxTree(params) {
        try {
            if (!this._connection)
                return undefined;
            let reqType = new rpc.NotificationType('al/closesyntaxtree');
            ;
            this._connection.sendNotification(reqType, params);
        }
        catch (e) {
        }
    }
    getCodeAnalyzersRules(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this._connection)
                    return undefined;
                let reqType = new rpc.RequestType('al/getcodeanalyzersrules');
                let val = yield this._connection.sendRequest(reqType, params);
                return val;
            }
            catch (e) {
                return undefined;
            }
        });
    }
    addAppAreas(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this._connection)
                    return undefined;
                let reqType = new rpc.RequestType('al/addappareas');
                let val = yield this._connection.sendRequest(reqType, params);
                return val;
            }
            catch (e) {
                return undefined;
            }
        });
    }
    isEnabled() {
        if (this._connection)
            return true;
        return false;
    }
}
exports.ToolsLangServerClient = ToolsLangServerClient;
//# sourceMappingURL=toolsLangServerClient.js.map