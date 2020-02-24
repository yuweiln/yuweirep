"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alCodeCopFixAA0008_1 = require("./alCodeCopFixAA0008");
const alCodeCopFixAA0137_1 = require("./alCodeCopFixAA0137");
const alCodeCopFixAA0139_1 = require("./alCodeCopFixAA0139");
class ALCAFixesCodeActionsProvider {
    constructor() {
        this.codeFixes = [
            //AA0005 fix disabled, needs some fixes before going live
            //new ALCodeCopFixAA0005(),
            new alCodeCopFixAA0008_1.ALCodeCopFixAA0008(),
            new alCodeCopFixAA0137_1.ALCodeCopFixAA0137(),
            new alCodeCopFixAA0139_1.ALCodeCopFixAA0139()
        ];
    }
    provideCodeActions(document, range, context, token) {
        // for each diagnostic entry that has the matching `code`, create a code action command
        let actions = [];
        for (let idx = 0; idx < this.codeFixes.length; idx++) {
            actions = actions.concat(context.diagnostics
                .filter(diagnostic => diagnostic.code === this.codeFixes[idx].diagnosticCode)
                .map((d, i, arr) => this.codeFixes[idx].createFix(document, d)));
        }
        return actions;
    }
}
ALCAFixesCodeActionsProvider.providedCodeActionKinds = [
    vscode.CodeActionKind.SourceFixAll,
    vscode.CodeActionKind.QuickFix
];
exports.ALCAFixesCodeActionsProvider = ALCAFixesCodeActionsProvider;
//# sourceMappingURL=alCAFixesCodeActionsProvider.js.map