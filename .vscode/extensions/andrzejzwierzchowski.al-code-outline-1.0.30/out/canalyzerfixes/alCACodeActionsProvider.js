"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alCodeCopFIxAA0005_1 = require("./alCodeCopFIxAA0005");
const alCodeCopFixAA0008_1 = require("./alCodeCopFixAA0008");
const alCodeCopFixAA0137_1 = require("./alCodeCopFixAA0137");
const alCodeCopFixAA0139_1 = require("./alCodeCopFixAA0139");
class ALCACodeActionsProvider {
    constructor() {
        this.codeFixes = [
            new alCodeCopFIxAA0005_1.ALCodeCopFixAA0005(),
            new alCodeCopFixAA0008_1.ALCodeCopFixAA0008(),
            new alCodeCopFixAA0137_1.ALCodeCopFixAA0137(),
            new alCodeCopFixAA0139_1.ALCodeCopFixAA0139()
        ];
    }
    provideCodeActions(document, range, context, token) {
        // for each diagnostic entry that has the matching `code`, create a code action command
        let Actions = [];
        for (let i = 0; i < this.codeFixes.length; i++) {
            Actions = Actions.concat(context.diagnostics
                .filter(diagnostic => diagnostic.code === this.codeFixes[i].diagnosticCode)
                .map((d, i, arr) => this.codeFixes[i].createFix(document, d)));
        }
        return Actions;
    }
}
ALCACodeActionsProvider.providedCodeActionKinds = [
    vscode.CodeActionKind.SourceFixAll,
    vscode.CodeActionKind.QuickFix
];
exports.ALCACodeActionsProvider = ALCACodeActionsProvider;
//# sourceMappingURL=alCACodeActionsProvider.js.map