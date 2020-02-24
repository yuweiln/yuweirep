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
const path = require("path");
const alBaseSymbolsBrowser_1 = require("./alBaseSymbolsBrowser");
const alObjectsBrowser_1 = require("./alObjectsBrowser");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
/**
 * AL Symbols Browser
 * allows to browse symbols in a tree structure like in the Class Browser in Visual Studio
 */
class ALSymbolsBrowser extends alBaseSymbolsBrowser_1.ALBaseSymbolsBrowser {
    constructor(devToolsContext, library) {
        super(devToolsContext, library);
        this._selectedObject = undefined;
        this._showObjectIds = false;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alsymbolsbrowser', 'symbolsbrowser.html');
    }
    getViewType() {
        return 'azALDevTools.ALSymbolsBrowser';
    }
    onDocumentLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            //load library
            yield this._library.loadAsync(false);
            //send data to the web view
            this.updateObjects();
        });
    }
    updateObjects() {
        this.sendMessage({
            command: 'setData',
            data: this._library.rootSymbol
        });
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        switch (message.command) {
            case 'showlist':
                this.showListView();
                break;
            case 'objselected':
                this.onObjectSelected(message.path);
                return true;
        }
        return false;
    }
    onObjectSelected(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolList = yield this._library.getSymbolsListByPathAsync([path], azSymbolKind_1.AZSymbolKind.AnyALObject);
            if ((symbolList) && (symbolList.length > 0))
                this._selectedObject = symbolList[0];
            else
                this._selectedObject = undefined;
            if (this._selectedObject)
                this.sendMessage({
                    command: 'setSelObjData',
                    data: this._selectedObject
                });
        });
    }
    showListView() {
        this._devToolsContext.setUseSymbolsBrowser(false);
        this._panel.dispose();
        let objectsBrowser = new alObjectsBrowser_1.ALObjectsBrowser(this._devToolsContext, this._library);
        objectsBrowser.show();
    }
}
exports.ALSymbolsBrowser = ALSymbolsBrowser;
//# sourceMappingURL=alSymbolsBrowser.js.map