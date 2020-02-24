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
const alSyntaxHelper_1 = require("./alSyntaxHelper");
const version_1 = require("../tools/version");
const textEditorHelper_1 = require("../tools/textEditorHelper");
class ALLangServerProxy {
    constructor() {
        this.version = new version_1.Version();
        this.langClient = undefined;
        this.alEditorService = undefined;
        this.checkExtensionProperties();
    }
    getALExtension() {
        let alStoreExtension = vscode.extensions.getExtension("ms-dynamics-smb.al");
        let alFileExtension = vscode.extensions.getExtension("Microsoft.al");
        if ((alStoreExtension) && (alFileExtension)) {
            if (alStoreExtension.isActive)
                return alStoreExtension;
            if (alFileExtension.isActive)
                return alFileExtension;
            return alStoreExtension;
        }
        if (alStoreExtension)
            return alStoreExtension;
        return alFileExtension;
    }
    checkExtensionProperties() {
        let alExtension = this.getALExtension();
        if (alExtension) {
            this.extensionPath = alExtension.extensionPath;
            if (alExtension.packageJSON)
                this.version.parse(alExtension.packageJSON.version);
        }
    }
    checkLanguageClient() {
        if (!this.langClient) {
            let alExtension = this.getALExtension();
            if ((!alExtension) || (!alExtension.isActive))
                return false;
            if (alExtension.exports) {
                //find language client
                if (alExtension.exports.languageServerClient) {
                    if (alExtension.exports.languageServerClient.languageClient)
                        this.langClient = alExtension.exports.languageServerClient.languageClient;
                    else
                        this.langClient = alExtension.exports.languageServerClient;
                }
                else if (alExtension.exports.services) {
                    let services = alExtension.exports.services;
                    let langClientFound = false;
                    for (let sidx = 0; ((sidx < services.length) && (!langClientFound)); sidx++) {
                        if (services[sidx].languageServerClient) {
                            this.langClient = services[sidx].languageServerClient;
                            langClientFound = true;
                        }
                    }
                }
                //find editor service
                if (alExtension.exports.services) {
                    let alServices = alExtension.exports.services;
                    for (let sidx = 0; (sidx < alServices.length) && (!this.alEditorService); sidx++) {
                        if (alServices[sidx].setActiveWorkspace)
                            this.alEditorService = alServices[sidx];
                    }
                }
            }
        }
        return true;
    }
    getWorkspaceSettings(resourceUri, workspacePath) {
        if (!resourceUri)
            resourceUri = vscode.Uri.file(workspacePath);
        let alConfig = vscode.workspace.getConfiguration('al', resourceUri);
        return {
            workspacePath: workspacePath,
            alResourceConfigurationSettings: {
                assemblyProbingPaths: alConfig.get("assemblyProbingPaths"),
                codeAnalyzers: alConfig.get("codeAnalyzers"),
                enableCodeAnalysis: alConfig.get("enableCodeAnalysis"),
                backgroundCodeAnalysis: alConfig.get("backgroundCodeAnalysis"),
                packageCachePath: alConfig.get("packageCachePath"),
                ruleSetPath: alConfig.get("ruleSetPath"),
                enableCodeActions: alConfig.get("enableCodeActions"),
                incrementalBuild: alConfig.get("incrementalBuild"),
            },
            setActiveWorkspace: true,
            dependencyParentWorkspacePath: undefined
        };
    }
    switchWorkspace(resourceUri, workspacePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((!this.langClient) ||
                (!this.alEditorService) ||
                (this.alEditorService.lastActiveWorkspacePath === workspacePath) ||
                (!vscode.workspace.workspaceFolders) ||
                (vscode.workspace.workspaceFolders.length <= 1))
                return;
            //switch workspace
            let result = yield this.langClient.sendRequest('al/setActiveWorkspace', {
                currentWorkspaceFolderPath: workspacePath,
                settings: this.getWorkspaceSettings(resourceUri, workspacePath)
            });
            this.alEditorService.lastActiveWorkspacePath = undefined;
        });
    }
    getCurrentWorkspaceFolderPath() {
        if ((!vscode.workspace.workspaceFolders) || (vscode.workspace.workspaceFolders.length == 0))
            return undefined;
        if (vscode.workspace.workspaceFolders.length > 1) {
            this.checkLanguageClient();
            if (this.alEditorService) {
                if (this.alEditorService.lastActiveWorkspacePath)
                    return this.alEditorService.lastActiveWorkspacePath;
            }
        }
        return vscode.workspace.workspaceFolders[0].uri.fsPath;
    }
    getCompletionForSourceCode(resourceUri, progressMessage, sourceCode, posLine, posColumn, lastSourceLine, lastSourceColumn) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: progressMessage
            }, (progress) => __awaiter(this, void 0, void 0, function* () {
                if ((!vscode.workspace.workspaceFolders) || (vscode.workspace.workspaceFolders.length == 0))
                    return undefined;
                //find workspace folder for resource
                let rootFsPath;
                if (!resourceUri) {
                    //resource not defined, find workspace folder for active document
                    let editor = vscode.window.activeTextEditor;
                    if ((editor) && (editor.document))
                        resourceUri = editor.document.uri;
                }
                if (!resourceUri) {
                    rootFsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
                }
                else {
                    let rootFolder = vscode.workspace.getWorkspaceFolder(resourceUri);
                    if ((rootFolder) && (rootFolder.uri))
                        rootFsPath = rootFolder.uri.fsPath;
                    else {
                        let rootUri = textEditorHelper_1.TextEditorHelper.getActiveWorkspaceFolderUri();
                        if (rootUri)
                            rootFsPath = rootUri.fsPath;
                        else
                            rootFsPath = resourceUri.fsPath;
                    }
                }
                try {
                    this.checkLanguageClient();
                    if (!this.langClient)
                        return undefined;
                    yield this.switchWorkspace(resourceUri, rootFsPath);
                    let docPath = path.join(rootFsPath, '.vscode\\temp-al-proxy.al');
                    let docUri = vscode.Uri.file(docPath);
                    //let fs = require('fs');
                    //if (!fs.existsSync(docPath)) {
                    //    fs.writeFileSync(docPath, '', 'utf8');
                    //}
                    //open virtual document
                    this.langClient.sendNotification('textDocument/didOpen', { textDocument: {
                            uri: docUri.toString(),
                            languageId: 'al',
                            version: 1,
                            text: sourceCode
                        } });
                    //run intellisense on virtual document
                    let tokenSource = new vscode.CancellationTokenSource();
                    let token = tokenSource.token;
                    let list = yield this.langClient.sendRequest('textDocument/completion', {
                        textDocument: {
                            uri: docUri.toString()
                        },
                        position: {
                            line: posLine,
                            character: posColumn
                        },
                        context: undefined
                    }, token);
                    //clear document content
                    this.langClient.sendNotification('textDocument/didChange', {
                        textDocument: {
                            uri: docUri.toString()
                        },
                        contentChanges: [
                            {
                                range: {
                                    start: {
                                        line: 0,
                                        character: 0
                                    },
                                    end: {
                                        line: lastSourceLine,
                                        character: lastSourceColumn
                                    }
                                },
                                rangeLength: sourceCode.length,
                                text: ''
                            }
                        ]
                    });
                    //close document
                    this.langClient.sendNotification('textDocument/didClose', { textDocument: {
                            uri: docUri.toString()
                        } });
                    if (!list)
                        return undefined;
                    let complList;
                    if (list instanceof vscode.CompletionList)
                        complList = list;
                    else {
                        let items = list;
                        complList = new vscode.CompletionList(items);
                    }
                    //fix type kind
                    if (complList.items) {
                        for (let i = 0; i < complList.items.length; i++) {
                            let complItem = complList.items[i];
                            if (complItem.kind)
                                complItem.kind = complItem.kind - 1;
                        }
                    }
                    return complList;
                }
                catch (e) {
                    return undefined;
                }
            }));
        });
    }
    getNextObjectId(resourceUri, objectType) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileContent = objectType + " 0 _symbolcache\n{\n}";
            let list = yield this.getCompletionForSourceCode(resourceUri, "Finding next free object id.", fileContent, 0, objectType.length + 1, 2, 1);
            //process results        
            if (list && list.items) {
                for (let i = 0; i < list.items.length; i++) {
                    let item = list.items[i];
                    if (item.kind == vscode.CompletionItemKind.Reference)
                        return item.label;
                }
            }
            return "";
        });
    }
    getTableList(resourceUri) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileContent = "codeunit 0 _symbolcache\n{\nprocedure t()\nvar\nf:record ;\nbegin\nend;\n}";
            let list = yield this.getCompletionForSourceCode(resourceUri, "Loading list of tables.", fileContent, 4, 9, 7, 1);
            //process results
            let out = [];
            if (list && list.items) {
                for (let i = 0; i < list.items.length; i++) {
                    let item = list.items[i];
                    if (item.kind == vscode.CompletionItemKind.Class) {
                        out.push(alSyntaxHelper_1.ALSyntaxHelper.fromNameText(item.label));
                    }
                }
            }
            return out;
        });
    }
    getAvailablePageFieldList(resourceUri, pageName) {
        return __awaiter(this, void 0, void 0, function* () {
            pageName = alSyntaxHelper_1.ALSyntaxHelper.toNameText(pageName);
            let fileContent = "pageextension 0 _symbolcache extends " + pageName + "\n{\nlayout\n{\naddfirst(undefined)\n{\nfield()\n}\n}\n}";
            let list = yield this.getCompletionForSourceCode(resourceUri, "Loading list of table fields.", fileContent, 6, 6, 9, 1);
            //process results
            let out = [];
            if (list && list.items) {
                for (let i = 0; i < list.items.length; i++) {
                    let item = list.items[i];
                    if (item.kind == vscode.CompletionItemKind.Field) {
                        out.push(alSyntaxHelper_1.ALSyntaxHelper.fromNameText(item.label));
                    }
                }
            }
            return out;
        });
    }
    getFieldList(resourceUri, tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            tableName = alSyntaxHelper_1.ALSyntaxHelper.toNameText(tableName);
            let fileContent = "codeunit 0 _symbolcache\n{\nprocedure t()\nvar\nf:record " + tableName + ";\nbegin\nf.;\nend;\n}";
            let list = yield this.getCompletionForSourceCode(resourceUri, "Loading list of table fields.", fileContent, 6, 2, 8, 1);
            //process results
            let out = [];
            if (list && list.items) {
                for (let i = 0; i < list.items.length; i++) {
                    let item = list.items[i];
                    if (item.kind == vscode.CompletionItemKind.Field) {
                        out.push(alSyntaxHelper_1.ALSyntaxHelper.fromNameText(item.label));
                    }
                }
            }
            return out;
        });
    }
    getEnumList(resourceUri) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileContent = "codeunit 0 _symbolcache\n{\nprocedure t()\nvar\nf:enum ;\nbegin\nend;\n}";
            let list = yield this.getCompletionForSourceCode(resourceUri, "Loading list of enums.", fileContent, 4, 7, 7, 1);
            //process results
            let out = [];
            if (list && list.items) {
                for (let i = 0; i < list.items.length; i++) {
                    let item = list.items[i];
                    if (item.kind == vscode.CompletionItemKind.Reference) {
                        out.push(alSyntaxHelper_1.ALSyntaxHelper.fromNameText(item.label));
                    }
                }
            }
            return out;
        });
    }
    getWorkspaceSymbol(objectType, objectName) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield vscode.commands.executeCommand('vscode.executeWorkspaceSymbolProvider', objectName);
            if ((!list) || (list.length == 0))
                return undefined;
            let fullName = objectType + ' ' + objectName;
            fullName = fullName.toLowerCase();
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                if (((item.kind == vscode.SymbolKind.Class) || (item.kind == vscode.SymbolKind.Object)) && (item.name.toLowerCase() == fullName) && (item.location)) {
                    return item.location;
                }
            }
            return undefined;
        });
    }
    getDefinitionLocation(objectType, objectName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: 'Loading object definition'
            }, (progress) => __awaiter(this, void 0, void 0, function* () {
                let sourceCode = 'codeunit 0 _symbolcache\n{\nprocedure t()\nvar\nf: ' +
                    objectType + ' ' +
                    alSyntaxHelper_1.ALSyntaxHelper.toNameText(objectName) +
                    ';\nbegin\nend;\n}';
                if ((!vscode.workspace.workspaceFolders) || (vscode.workspace.workspaceFolders.length == 0))
                    return undefined;
                try {
                    this.checkLanguageClient();
                    if (!this.langClient)
                        return undefined;
                    let docPath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '.al-lang-proxy\\tempalfile.al');
                    let docUri = vscode.Uri.file(docPath);
                    //open virtual document
                    this.langClient.sendNotification('textDocument/didOpen', { textDocument: {
                            uri: docUri.toString(),
                            languageId: 'al',
                            version: 1,
                            text: sourceCode
                        } });
                    let srcPos = new vscode.Position(4, 5 + objectType.length);
                    let docPos = yield this.getDefinitionLocationFromDocument(docUri.toString(), srcPos);
                    /*
                    //run goToDefinition on virtual document
                    let tokenSource : vscode.CancellationTokenSource = new vscode.CancellationTokenSource();
                    let token : vscode.CancellationToken = tokenSource.token;
                    let posLine = 4;
                    let posColumn = 5 + objectType.length;
    
                    let docPos : vscode.Location | undefined;
    
                    let launchConfiguration = await this.getLaunchConfiguration();
                    //let launchFilePath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '.vscode/launch.json');
                    //let config = vscode.workspace.getConfiguration("launch", vscode.Uri.file(launchFilePath));
                    //let allConfigList : any[] | undefined = config.get("configurations");
                    //if (!allConfigList)
                    //    return undefined;
                    //let configList = allConfigList.filter(p => p.type === 'al');
                    //if ((configList) && (configList.length > 0)) {
                    if (launchConfiguration) {
    
                        let docPosTemp : any = await this.langClient.sendRequest<any>('al/gotodefinition', {
                            launchConfiguration : launchConfiguration,
                            textDocumentPositionParams : {
                                textDocument : {
                                    uri : docUri.toString()
                                },
                                position : {
                                    line : posLine,
                                    character : posColumn
                                }
                            },
                            context : undefined
                        }, token);
    
                        if (docPosTemp) {
                            docPos = new vscode.Location(
                                vscode.Uri.parse(docPosTemp.uri),
                                new vscode.Range(docPosTemp.range.start.line, docPosTemp.range.start.character,
                                    docPosTemp.range.end.line, docPosTemp.range.end.character));
                        }
    
                    }
                    */
                    //close document
                    this.langClient.sendNotification('textDocument/didClose', { textDocument: {
                            uri: docUri.toString()
                        } });
                    return docPos;
                }
                catch (e) {
                    return undefined;
                }
            }));
        });
    }
    getDefinitionLocationFromDocument(docUri, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            let docPos = undefined;
            try {
                this.checkLanguageClient();
                if (!this.langClient)
                    return undefined;
                let tokenSource = new vscode.CancellationTokenSource();
                let token = tokenSource.token;
                let launchConfiguration = yield this.getLaunchConfiguration();
                if (launchConfiguration) {
                    let docPosTemp = yield this.langClient.sendRequest('al/gotodefinition', {
                        launchConfiguration: launchConfiguration,
                        textDocumentPositionParams: {
                            textDocument: {
                                uri: docUri.toString()
                            },
                            position: {
                                line: pos.line,
                                character: pos.character
                            }
                        },
                        context: undefined
                    }, token);
                    if (docPosTemp) {
                        docPos = new vscode.Location(vscode.Uri.parse(docPosTemp.uri), new vscode.Range(docPosTemp.range.start.line, docPosTemp.range.start.character, docPosTemp.range.end.line, docPosTemp.range.end.character));
                    }
                }
            }
            catch (e) {
                return undefined;
            }
            return docPos;
        });
    }
    getLaunchConfiguration() {
        return __awaiter(this, void 0, void 0, function* () {
            let launchFilePath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '.vscode/launch.json');
            let config = vscode.workspace.getConfiguration("launch", vscode.Uri.file(launchFilePath));
            let allConfigList = config.get("configurations");
            if (!allConfigList)
                return undefined;
            let configList = allConfigList.filter(p => p.type === 'al');
            if ((!configList) || (configList.length == 0))
                return undefined;
            if (configList.length == 1)
                return configList[0];
            //select configuration from drop down list
            let configItems = [];
            for (let i = 0; i < configList.length; i++) {
                if (configList[i].name)
                    configItems.push(configList[i].name);
            }
            let selectedItem = yield vscode.window.showQuickPick(configItems, {
                placeHolder: 'Please select launch configuration'
            });
            if (selectedItem) {
                for (let i = 0; i < configList.length; i++) {
                    if (configList[i].name == selectedItem)
                        return configList[i];
                }
            }
            return undefined;
        });
    }
}
exports.ALLangServerProxy = ALLangServerProxy;
//# sourceMappingURL=alLangServerProxy.js.map