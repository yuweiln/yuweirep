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
const azSymbolKind_1 = require("./symbollibraries/azSymbolKind");
class ALObjectRunner {
    constructor(context) {
        this._context = context;
    }
    runSymbolAsync(alSymbolInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (alSymbolInfo.id > 0) {
                switch (alSymbolInfo.kind) {
                    case azSymbolKind_1.AZSymbolKind.TableObject:
                        yield this.runObjectAsync('Table', alSymbolInfo.id);
                        break;
                    case azSymbolKind_1.AZSymbolKind.PageObject:
                        yield this.runObjectAsync('Page', alSymbolInfo.id);
                        break;
                    case azSymbolKind_1.AZSymbolKind.ReportObject:
                        yield this.runObjectAsync('Report', alSymbolInfo.id);
                        break;
                }
            }
        });
    }
    runObjectAsync(objectType, objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((objectType) && (objectId > 0)) {
                if (this._context.alLangProxy.version.major >= 3)
                    yield this.runObjectWithAL30Async(objectType, objectId);
                else
                    yield this.runObjectInWebClientAsync(objectType, objectId);
            }
        });
    }
    runObjectWithAL30Async(objectType, objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((vscode.workspace.workspaceFolders) && (vscode.workspace.workspaceFolders.length > 0)) {
                let launchConfiguration = yield this._context.alLangProxy.getLaunchConfiguration();
                if (!launchConfiguration)
                    return;
                let workspaceFolder = vscode.workspace.workspaceFolders[0];
                let config = {
                    name: launchConfiguration.name,
                    type: 'al',
                    request: 'launch',
                    noDebug: false,
                    isRad: false,
                    justDebug: true,
                    authentication: launchConfiguration.authentication,
                    port: launchConfiguration.port,
                    schemaUpdateMode: launchConfiguration.schemaUpdateMode,
                    server: launchConfiguration.server,
                    serverinstance: launchConfiguration.serverInstance,
                    startupObjectId: objectId,
                    startupObjectType: objectType,
                    tenant: launchConfiguration.tenant,
                    applicationFamily: launchConfiguration.applicationFamily,
                    breakOnError: launchConfiguration.breakOnError,
                    breakOnRecordWrite: launchConfiguration.breakOnRecordWrite,
                    skipCodeunit1: launchConfiguration.skipCodeunit1,
                    launchBrowser: launchConfiguration.launchBrowser,
                    sandboxName: launchConfiguration.sandboxName
                };
                vscode.debug.startDebugging(workspaceFolder, config);
            }
        });
    }
    runObjectInWebClientAsync(objectType, objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            let launchConfiguration = yield this._context.alLangProxy.getLaunchConfiguration();
            if (!launchConfiguration)
                return;
            let opn = require('opn');
            let webClientPort = vscode.workspace.getConfiguration('alOutline').get('webClientPort');
            //collect settings
            let serverName = launchConfiguration.server;
            let serverInstance = launchConfiguration.serverInstance;
            let tenant = launchConfiguration.tenant;
            //ask for web client port
            var newPortNoText = yield vscode.window.showInputBox({
                value: webClientPort.toString(),
                prompt: 'Please enter Web Client port number, use 0 for default http/https port.'
            });
            if (!newPortNoText)
                return;
            var newPortNo = parseInt(newPortNoText, 10);
            if (!isNaN(newPortNo))
                webClientPort = newPortNo;
            //build url
            if (webClientPort != 0)
                serverName = serverName + ':' + webClientPort.toString();
            var webClientUrl = serverName + '/' + serverInstance + '/WebClient?';
            if ((tenant) && (tenant != ''))
                webClientUrl = webClientUrl + 'tenant=' + tenant + '&';
            webClientUrl = webClientUrl + objectType + '=' + objectId.toString();
            //open url in web client
            opn(webClientUrl);
        });
    }
}
exports.ALObjectRunner = ALObjectRunner;
//# sourceMappingURL=alObjectRunner.js.map