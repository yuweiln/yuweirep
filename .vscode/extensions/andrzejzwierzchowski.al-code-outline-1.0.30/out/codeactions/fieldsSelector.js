"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fieldQuickPickItem_1 = require("./fieldQuickPickItem");
class FieldsSelector {
    selectFields(placeholder, fieldsList) {
        let items = [];
        for (let i = 0; i < fieldsList.length; i++) {
            items.push(new fieldQuickPickItem_1.FieldQuickPickItem(fieldsList[i]));
        }
        let selectionOrder = this.isInSelectionOrderMode();
        let quickPick = vscode.window.createQuickPick();
        quickPick.placeholder = placeholder;
        quickPick.canSelectMany = true;
        quickPick.items = items;
        let selectedItems = [];
        return new Promise((resolve, reject) => {
            try {
                quickPick.show();
                quickPick.onDidChangeSelection((itemList) => {
                    if ((selectionOrder) && (!this.fieldsListsEquals(itemList, selectedItems))) {
                        //collect not selected items
                        let notSelItems = [];
                        for (let i = 0; i < quickPick.items.length; i++) {
                            if (itemList.indexOf(quickPick.items[i]) < 0) {
                                notSelItems.push(quickPick.items[i]);
                            }
                        }
                        notSelItems.sort((a, b) => {
                            if (a.label > b.label)
                                return 1;
                            if (a.label < b.label)
                                return -1;
                            return 0;
                        });
                        let newItems = itemList.concat(notSelItems);
                        selectedItems = itemList;
                        quickPick.items = newItems;
                        quickPick.selectedItems = selectedItems;
                    }
                });
                quickPick.onDidAccept(() => {
                    let data = [];
                    for (let i = 0; i < quickPick.selectedItems.length; i++) {
                        data.push(quickPick.selectedItems[i].label);
                    }
                    resolve(data);
                    quickPick.hide();
                });
                quickPick.onDidHide(() => {
                    resolve(undefined);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    fieldsListsEquals(fieldList1, fieldList2) {
        if (fieldList1.length != fieldList2.length)
            return false;
        for (let i = 0; i < fieldList1.length; i++) {
            if (fieldList1[i].label != fieldList2[i].label)
                return false;
        }
        return true;
    }
    isInSelectionOrderMode() {
        let resource = undefined;
        if ((vscode.window.activeTextEditor) && (vscode.window.activeTextEditor.document))
            resource = vscode.window.activeTextEditor.document.uri;
        let selectionMode = vscode.workspace.getConfiguration('alOutline', resource).get('fieldsSelectionOrder');
        return ((selectionMode) && (selectionMode.toLowerCase() == 'selection order'));
    }
}
exports.FieldsSelector = FieldsSelector;
//# sourceMappingURL=fieldsSelector.js.map