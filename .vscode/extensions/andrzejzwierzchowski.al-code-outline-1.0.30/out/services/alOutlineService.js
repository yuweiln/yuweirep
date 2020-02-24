"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const symbolsTreeProvider_1 = require("../outlineview/symbolsTreeProvider");
const alSymbolsBasedPageWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedPageWizard");
const alSymbolsBasedReportWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedReportWizard");
const alSymbolsBasedXmlPortWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedXmlPortWizard");
const alSymbolsBasedQueryWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedQueryWizard");
class ALOutlineService {
    constructor(newContext) {
        //initialize
        this.context = newContext;
        //register symbols tree provider
        this.symbolsTreeProvider = new symbolsTreeProvider_1.SymbolsTreeProvider(this.context);
        this.context.vscodeExtensionContext.subscriptions.push(vscode.window.registerTreeDataProvider('azALDevTools_SymbolsTreeProvider', this.symbolsTreeProvider));
        //register commands
        this.registerCommands();
    }
    registerCommands() {
        let that = this;
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.refreshOutlineView', () => that.symbolsTreeProvider.refresh()));
        //al symbols commands
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.createCardPage', offset => {
            let builder = new alSymbolsBasedPageWizard_1.ALSymbolsBasedPageWizard();
            builder.showPageWizard(offset, 'Card');
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.createListPage', offset => {
            let builder = new alSymbolsBasedPageWizard_1.ALSymbolsBasedPageWizard();
            builder.showPageWizard(offset, 'List');
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.createReport', offset => {
            let builder = new alSymbolsBasedReportWizard_1.ALSymbolsBasedReportWizard();
            builder.showReportWizard(offset);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.createXmlPort', offset => {
            let builder = new alSymbolsBasedXmlPortWizard_1.ALSymbolsBasedXmlPortWizard();
            builder.showXmlPortWizard(offset);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.createQuery', offset => {
            let builder = new alSymbolsBasedQueryWizard_1.ALSymbolsBasedQueryWizard();
            builder.showQueryWizard(offset);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.runPage', offset => {
            that.context.objectRunner.runSymbolAsync(offset);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.runTable', offset => {
            that.context.objectRunner.runSymbolAsync(offset);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.runReport', offset => {
            that.context.objectRunner.runSymbolAsync(offset);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.selectDocumentText', (range) => {
            if (vscode.window.activeTextEditor) {
                let vscodeRange = new vscode.Range(range.start.line, range.start.character, range.end.line, range.end.character);
                vscode.window.activeTextEditor.revealRange(vscodeRange, vscode.TextEditorRevealType.Default);
                vscode.window.activeTextEditor.selection = new vscode.Selection(vscodeRange.start, vscodeRange.end);
                vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
            }
        }));
    }
}
exports.ALOutlineService = ALOutlineService;
//# sourceMappingURL=alOutlineService.js.map