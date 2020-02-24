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
const baseWebViewEditor_1 = require("../webviews/baseWebViewEditor");
const toolsGetCodeAnalyzersRulesRequest_1 = require("../langserver/toolsGetCodeAnalyzersRulesRequest");
const textEditorHelper_1 = require("../tools/textEditorHelper");
class CARulesViewer extends baseWebViewEditor_1.BaseWebViewEditor {
    constructor(devToolsContext) {
        super(devToolsContext.vscodeExtensionContext, "Code Analyzers");
        this._devToolsContext = devToolsContext;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'carulesviewer', 'carulesviewer.html');
    }
    getViewType() {
        return 'azALDevTools.CARulesViewer';
    }
    onDocumentLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            let analyzers = [
                {
                    label: '${AppSourceCop}',
                    value: '${AppSourceCop}'
                },
                {
                    label: '${CodeCop}',
                    value: '${CodeCop}'
                },
                {
                    label: '${PerTenantExtensionCop}',
                    value: '${PerTenantExtensionCop}'
                },
                {
                    label: '${UICop}',
                    value: '${UICop}'
                }
            ];
            //detect other code analyzers
            let alConfig = vscode.workspace.getConfiguration('al', undefined);
            let codeAnalyzersSetting = alConfig.get("codeAnalyzers");
            if (codeAnalyzersSetting) {
                for (let i = 0; i < codeAnalyzersSetting.length; i++) {
                    if (!codeAnalyzersSetting[i].startsWith('${')) {
                        analyzers.push({
                            label: path.parse(codeAnalyzersSetting[i]).name,
                            value: codeAnalyzersSetting[i]
                        });
                    }
                }
            }
            //send list of analyzers to the webview
            this.sendMessage({
                command: 'setAnalyzers',
                data: analyzers
            });
        });
    }
    onAnalyzerSelected(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = new toolsGetCodeAnalyzersRulesRequest_1.ToolsGetCodeAnalyzersRulesRequest(name);
            let response = yield this._devToolsContext.toolsLangServerClient.getCodeAnalyzersRules(request);
            if (response) {
                this._rules = response.rules;
                this.sendMessage({
                    command: 'setRules',
                    data: response.rules
                });
            }
            else
                this._rules = undefined;
        });
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        if (message) {
            switch (message.command) {
                case 'analyzerselected':
                    if (message.name)
                        this.onAnalyzerSelected(message.name);
                    return true;
                case 'newruleset':
                    this.newRuleSet(message.selrules);
                    return true;
                case 'copyrules':
                    this.copyRules(message.selrules);
                    return true;
                case 'copytable':
                    this.copyTable(message.selrules);
                    return true;
            }
        }
        return false;
    }
    newRuleSet(rulesIndexes) {
        let ruleSetText = '{' +
            '\n    "name": "Name",' +
            '\n    "description": "Description",' +
            '\n    "rules": [' +
            this.getRulesAsString(rulesIndexes, '        ') +
            '\n    ],' +
            '\n}';
        textEditorHelper_1.TextEditorHelper.showNewDocument(ruleSetText, 'json');
    }
    copyRules(rulesIndexes) {
        let rulesText = this.getRulesAsString(rulesIndexes, '');
        vscode.env.clipboard.writeText(rulesText);
    }
    copyTable(rulesIndexes) {
        let rulesText = 'Id\tTitle\tDefault Severity';
        for (let i = 0; i < rulesIndexes.length; i++) {
            let rule = this._rules[rulesIndexes[i]];
            rulesText += ('\n' + rule.id + '\t' + rule.title + '\t' + rule.defaultSeverity);
        }
        vscode.env.clipboard.writeText(rulesText);
    }
    getRulesAsString(rulesIndexes, indentText) {
        let rules = '';
        for (let i = 0; i < rulesIndexes.length; i++) {
            let ruleDef = this._rules[rulesIndexes[i]];
            if (i > 0)
                rules += ',';
            rules += ('\n// Rule: ' + ruleDef.title);
            rules += ('\n//       Default action: ' + ruleDef.defaultSeverity);
            rules += ('\n' + JSON.stringify({
                id: ruleDef.id,
                action: ruleDef.defaultSeverity,
                justification: 'Justification'
            }, undefined, 4));
        }
        if (indentText.length > 0)
            rules = rules.replace(/\n/g, '\n' + indentText);
        return rules;
    }
    onPanelClosed() {
        super.onPanelClosed();
        this._devToolsContext.codeAnalyzersService.onCodeAnalyzersViewerClosed();
    }
}
exports.CARulesViewer = CARulesViewer;
//# sourceMappingURL=caRulesViewer.js.map