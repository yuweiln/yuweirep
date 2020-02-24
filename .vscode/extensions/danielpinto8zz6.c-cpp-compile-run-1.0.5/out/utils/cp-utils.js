"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cp = __importStar(require("child_process"));
const vscode = __importStar(require("vscode"));
const output_channel_1 = require("../output-channel");
function executeCommand(command, args, options = { shell: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            output_channel_1.outputChannel.appendLine(`${command}, [${args.join(',')}]`);
            let result = '';
            const childProc = cp.spawn(command, args, options);
            childProc.stdout.on('data', (data) => {
                data = data.toString();
                result = result.concat(data);
            });
            childProc.on('error', reject);
            childProc.on('close', (code) => {
                if (code !== 0 || result.indexOf('ERROR') > -1) {
                    reject(new Error(`Command "${command} ${args.toString()}" failed with exit code "${code}".`));
                }
                else {
                    resolve(result);
                }
            });
        });
    });
}
exports.executeCommand = executeCommand;
function executeCommandWithProgress(message, command, args, options = { shell: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = '';
        yield vscode.window.withProgress({ location: vscode.ProgressLocation.Window }, (p) => __awaiter(this, void 0, void 0, function* () {
            output_channel_1.outputChannel.appendLine(`${command}, [${args.join(',')}]`);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                p.report({ message });
                try {
                    result = yield executeCommand(command, args, options);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            }));
        }));
        return result;
    });
}
exports.executeCommandWithProgress = executeCommandWithProgress;
//# sourceMappingURL=cp-utils.js.map