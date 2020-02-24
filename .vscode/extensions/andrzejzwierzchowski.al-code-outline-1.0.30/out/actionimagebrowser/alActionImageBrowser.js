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
const baseWebViewEditor_1 = require("../webviews/baseWebViewEditor");
const alActionImageInfo_1 = require("./alActionImageInfo");
class ALActionImageBrowser extends baseWebViewEditor_1.BaseWebViewEditor {
    constructor(devToolsContext) {
        super(devToolsContext.vscodeExtensionContext, "Action Images");
        this._devToolsContext = devToolsContext;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'actionimagebrowser', 'imagebrowser.html');
    }
    getViewType() {
        return 'azALDevTools.ALActionImageBrowser';
    }
    onDocumentLoaded() {
        this.loadData();
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.getImageList();
            this.sendMessage({
                command: 'setData',
                data: data
            });
        });
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        switch (message.command) {
            case 'copyname':
                this.copyName(message.name, message.withui);
                break;
            case 'copyaction':
                this.copyAction(message.name, message.withui);
                return true;
            case 'copypromotedaction':
                this.copyPromotedAction(message.name, message.withui);
                return true;
        }
        return false;
    }
    copyName(name, withUI) {
        return __awaiter(this, void 0, void 0, function* () {
            yield vscode.env.clipboard.writeText(name);
            if (withUI)
                vscode.window.showInformationMessage('Image name has been copied to the clipboard');
        });
    }
    copyAction(name, withUI) {
        return __awaiter(this, void 0, void 0, function* () {
            yield vscode.env.clipboard.writeText('action(' + name + 'Action)\n' +
                '{\n' +
                '    ApplicationArea = All;\n' +
                '    Image = ' + name + ';\n' +
                '\n' +
                '    trigger OnAction()\n' +
                '    begin\n' +
                '\n' +
                '    end;\n' +
                '}\n');
            if (withUI)
                vscode.window.showInformationMessage('Action code has been copied to the clipboard');
        });
    }
    copyPromotedAction(name, withUI) {
        return __awaiter(this, void 0, void 0, function* () {
            yield vscode.env.clipboard.writeText('action(' + name + 'Action)\n' +
                '{\n' +
                '    ApplicationArea = All;\n' +
                '    Image = ' + name + ';\n' +
                '    Promoted = true;\n' +
                '    PromotedCategory = Process;\n' +
                '\n' +
                '    trigger OnAction()\n' +
                '    begin\n' +
                '\n' +
                '    end;\n' +
                '}\n');
            if (withUI)
                vscode.window.showInformationMessage('Promoted action code has been copied to the clipboard');
        });
    }
    getImageList() {
        return __awaiter(this, void 0, void 0, function* () {
            let fileContent = 'page 0 MyPage9999\n{\nactions\n{\narea(Processing)\n{\naction(ActionName)\n{\nImage=;\n}\n}\n}\n}';
            let list = yield this._devToolsContext.alLangProxy.getCompletionForSourceCode(undefined, 'Loading list of action images.', fileContent, 8, 6, 12, 1);
            //process results
            let out = [];
            if (list && list.items) {
                for (let i = 0; i < list.items.length; i++) {
                    let item = list.items[i];
                    if (item.kind == vscode.CompletionItemKind.Property) {
                        if (item.documentation) {
                            let docContent = item.documentation;
                            let imageString = docContent.value;
                            //decode image
                            let pos = imageString.indexOf('(data');
                            if (pos >= 0)
                                imageString = imageString.substr(pos + 1);
                            pos = imageString.indexOf(')');
                            if (pos >= 0)
                                imageString = imageString.substr(0, pos);
                            let imageInfo = new alActionImageInfo_1.ALActionImageInfo();
                            imageInfo.name = item.label;
                            imageInfo.content = imageString;
                            out.push(imageInfo);
                        }
                        //    out.push(ALSyntaxHelper.fromNameText(item.label));
                    }
                }
            }
            return out;
        });
    }
}
exports.ALActionImageBrowser = ALActionImageBrowser;
//# sourceMappingURL=alActionImageBrowser.js.map