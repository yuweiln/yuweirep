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
const azDocumentSymbolsLibrary_1 = require("../symbollibraries/azDocumentSymbolsLibrary");
class ALSymbolsService {
    constructor(context) {
        this._context = context;
    }
    loadDocumentSymbols(docUri) {
        return __awaiter(this, void 0, void 0, function* () {
            let symbolsLibrary = new azDocumentSymbolsLibrary_1.AZDocumentSymbolsLibrary(this._context, docUri);
            yield symbolsLibrary.loadAsync(false);
            return symbolsLibrary;
        });
    }
}
exports.ALSymbolsService = ALSymbolsService;
//# sourceMappingURL=alSymbolsService.js.map