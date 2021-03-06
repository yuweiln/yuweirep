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
class CRSALLangExtHelper {
    static GetCrsAlLangExt() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._crsALLangExtApi) {
                let crsExtension = vscode.extensions.getExtension('waldo.crs-al-language-extension');
                if (crsExtension) {
                    if (crsExtension.isActive)
                        this._crsALLangExtApi = crsExtension.exports;
                    else
                        this._crsALLangExtApi = yield crsExtension.activate();
                }
                //else
                //throw exception here
            }
            return this._crsALLangExtApi;
        });
    }
}
CRSALLangExtHelper._crsALLangExtApi = undefined;
exports.CRSALLangExtHelper = CRSALLangExtHelper;
//# sourceMappingURL=crsAlLangExtHelper.js.map