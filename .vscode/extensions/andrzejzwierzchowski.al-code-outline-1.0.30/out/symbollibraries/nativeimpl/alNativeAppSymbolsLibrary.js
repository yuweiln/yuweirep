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
const path = require("path");
const vscode = require("vscode");
const asyncFileManager_1 = require("../../tools/asyncFileManager");
const azSymbolsLibrary_1 = require("../azSymbolsLibrary");
const azSymbolInformation_1 = require("../azSymbolInformation");
const azSymbolKind_1 = require("../azSymbolKind");
const alActionKind_1 = require("./alActionKind");
const alControlKind_1 = require("./alControlKind");
const alSyntaxHelper_1 = require("../../allanguage/alSyntaxHelper");
/** Native, simple implementation of App symbols reader */
class ALNativeAppSymbolsLibrary extends azSymbolsLibrary_1.AZSymbolsLibrary {
    constructor(context, sourceFilePath) {
        super();
        this._allSymbols = undefined;
        this._context = context;
        this.filePath = sourceFilePath;
        this.applicationId = '';
        this.displayName = path.parse(sourceFilePath).base;
        this.name = '';
        this.publisher = '';
        this.version = '';
        this._fileSize = -1;
        this._fileModified = -1;
    }
    loadInternalAsync(forceReload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileManager = new asyncFileManager_1.AsyncFileManager();
                let AdmZip = require('adm-zip');
                //load zip file into memory
                let offset = 40;
                let stats = yield fileManager.statAsync(this.filePath);
                //check if file should be reloaded
                if ((!forceReload) && (stats.size === this._fileSize) && (stats.mtimeMs === this._fileModified))
                    return false;
                this._fileSize = stats.size;
                this._fileModified = stats.mtimeMs;
                let fileSizeInBytes = stats.size - offset;
                let buffer = Buffer.alloc(fileSizeInBytes);
                let fileDesc = yield fileManager.openAsync(this.filePath, 'r', 0o666);
                yield fileManager.readAsync(fileDesc, buffer, 0, fileSizeInBytes, offset);
                yield fileManager.closeAsync(fileDesc);
                //load symbol references json from zip file
                let zip = new AdmZip(buffer);
                let zipEntry = zip.getEntry('SymbolReference.json');
                let jsonObjectList = zip.readAsText(zipEntry).trim();
                //parse symbol references
                this.loadSymbols(JSON.parse(jsonObjectList));
            }
            catch (e) {
                let msg = 'Loading symbols from file "' + this.filePath + '" failed.';
                if (e.message)
                    msg = msg + ' (' + e.message + ')';
                else
                    msg = msg + ' (UNDEFINED ERROR)';
                vscode.window.showErrorMessage(msg);
                return false;
            }
            return true;
        });
    }
    loadSymbols(symbolReferences) {
        //load app file header information    
        this.applicationId = symbolReferences.AppId ? symbolReferences.AppId : '';
        this.name = symbolReferences.Name ? symbolReferences.Name : '';
        this.publisher = symbolReferences.Publisher ? symbolReferences.Publisher : '';
        this.version = symbolReferences.Version ? symbolReferences.Version : '';
        let fullName = this.publisher + ' ' + this.name + ' ' + this.version;
        fullName = fullName.trim();
        //load root symbol
        this._allSymbols = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.Package, fullName);
        //load symbol references
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Tables', 'Table', azSymbolKind_1.AZSymbolKind.TableObjectList, azSymbolKind_1.AZSymbolKind.TableObject, symbolReferences.Tables));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Pages', 'Page', azSymbolKind_1.AZSymbolKind.PageObjectList, azSymbolKind_1.AZSymbolKind.PageObject, symbolReferences.Pages));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Reports', 'Report', azSymbolKind_1.AZSymbolKind.ReportObjectList, azSymbolKind_1.AZSymbolKind.ReportObject, symbolReferences.Reports));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Xml Ports', 'XmlPort', azSymbolKind_1.AZSymbolKind.XmlPortObjectList, azSymbolKind_1.AZSymbolKind.XmlPortObject, symbolReferences.XmlPorts));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Queries', 'Query', azSymbolKind_1.AZSymbolKind.QueryObjectList, azSymbolKind_1.AZSymbolKind.QueryObject, symbolReferences.Queries));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Codeunits', 'Codeunit', azSymbolKind_1.AZSymbolKind.CodeunitObjectList, azSymbolKind_1.AZSymbolKind.CodeunitObject, symbolReferences.Codeunits));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Control Add-ins', 'ControlAddIn', azSymbolKind_1.AZSymbolKind.ControlAddInObjectList, azSymbolKind_1.AZSymbolKind.ControlAddInObject, symbolReferences.ControlAddIns));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Page Extensions', 'PageExtension', azSymbolKind_1.AZSymbolKind.PageExtensionObjectList, azSymbolKind_1.AZSymbolKind.PageExtensionObject, symbolReferences.PageExtensions));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Table Extensions', 'TableExtension', azSymbolKind_1.AZSymbolKind.TableExtensionObjectList, azSymbolKind_1.AZSymbolKind.TableExtensionObject, symbolReferences.TableExtensions));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Profiles', 'Profile', azSymbolKind_1.AZSymbolKind.ProfileObjectList, azSymbolKind_1.AZSymbolKind.ProfileObject, symbolReferences.Profiles));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Page Customizations', 'PageCustomization', azSymbolKind_1.AZSymbolKind.PageCustomizationObjectList, azSymbolKind_1.AZSymbolKind.PageCustomizationObject, symbolReferences.PageCustomizations));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('DotNet Packages', 'DotNetPackage', azSymbolKind_1.AZSymbolKind.DotNetPackageList, azSymbolKind_1.AZSymbolKind.DotNetPackage, symbolReferences.DotNetPackages));
        this._allSymbols.addChildItem(this.loadObjectSymbolList('Enums', 'Enum', azSymbolKind_1.AZSymbolKind.EnumTypeList, azSymbolKind_1.AZSymbolKind.EnumType, symbolReferences.EnumTypes));
    }
    updateObjectList() {
        if (this._allSymbols) {
            this._allSymbols.updateTree(true, this._twoWayTree);
            this.rootSymbol = this._allSymbols.toObjectTree();
        }
        else
            this.rootSymbol = undefined;
    }
    getSymbolByPath(path) {
        return this.getSymbolByPathWithRoot(this._allSymbols, path);
    }
    loadObjectSymbolList(name, symbolPrefix, groupKind, symbolKind, data) {
        //load object symbols
        if ((data) && (data.length > 0)) {
            let groupSymbol = azSymbolInformation_1.AZSymbolInformation.create(groupKind, name);
            for (let i = 0; i < data.length; i++) {
                groupSymbol.addChildItem(this.loadObjectSymbol(symbolKind, symbolPrefix, data[i]));
            }
            return groupSymbol;
        }
        return undefined;
    }
    loadObjectSymbol(symbolKind, namePrefix, data) {
        let symbol = this.loadSymbolFromReference(symbolKind, namePrefix, data, true);
        //init child items
        if (data.Fields)
            this.loadBasicSymbolReferences('fields', symbol, azSymbolKind_1.AZSymbolKind.FieldList, azSymbolKind_1.AZSymbolKind.Field, data.Fields, (symbolKind == azSymbolKind_1.AZSymbolKind.TableObject));
        if (data.Keys)
            this.loadBasicSymbolReferences('keys', symbol, azSymbolKind_1.AZSymbolKind.KeyList, azSymbolKind_1.AZSymbolKind.Key, data.Keys, false);
        if (data.Controls)
            this.loadControlSymbolReferences(symbol, data.Controls);
        if (data.Actions)
            this.loadActionSymbolReferences(symbol, data.Actions);
        //this.loadBasicSymbolReferences(ALSymbolKind.Field, symbolReference.DataItems);
        if (data.DataItems)
            this.loadDataItemSymbolReferences(symbol, data.DataItems);
        if (data.Elements)
            this.loadDataItemSymbolReferences(symbol, data.Elements);
        if (data.ActionChanges)
            this.loadChangesSymbolReferences(symbol, 'Action Changes', data.ActionChanges);
        if (data.ControlChanges)
            this.loadChangesSymbolReferences(symbol, 'Control Changes', data.ControlChanges);
        if (data.Variables)
            this.loadBasicSymbolReferences('var', symbol, azSymbolKind_1.AZSymbolKind.VarSection, azSymbolKind_1.AZSymbolKind.VariableDeclaration, data.Variables, false);
        if (data.Methods)
            this.loadMethodSymbolReferences('procedures', symbol, azSymbolKind_1.AZSymbolKind.MethodDeclaration, azSymbolKind_1.AZSymbolKind.LocalMethodDeclaration, data.Methods);
        //control Add-In triggers
        if (data.Events)
            this.loadMethodSymbolReferences('Ttriggers', symbol, azSymbolKind_1.AZSymbolKind.TriggerDeclaration, azSymbolKind_1.AZSymbolKind.TriggerDeclaration, data.Events);
        //enum values
        if (data.Values)
            this.loadEnumValues(symbol, data.Values);
        //.net assemblies
        if (data.AssemblyDeclarations)
            this.loadAssemblyDeclarations(symbol, data.AssemblyDeclarations);
        return symbol;
    }
    loadFromDotNetTypeReference(symbolReference) {
        let name = (symbolReference.TypeName) ? symbolReference.TypeName : '';
        let alSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.DotNetTypeDeclaration, name);
        if (symbolReference.AliasName)
            alSymbol.fullName = symbolReference.AliasName + " (" + alSymbol.name + ")";
        else
            alSymbol.fullName = alSymbol.name;
        return alSymbol;
    }
    loadDotNetTypeDeclarations(parent, symbolReferenceList) {
        if (symbolReferenceList) {
            for (let i = 0; i < symbolReferenceList.length; i++) {
                let alSymbol = this.loadFromDotNetTypeReference(symbolReferenceList[i]);
                parent.addChildItem(alSymbol);
            }
        }
    }
    loadAssemblyDeclarations(parent, symbolReferenceList) {
        if (symbolReferenceList) {
            for (let i = 0; i < symbolReferenceList.length; i++) {
                let symbolRef = symbolReferenceList[i];
                let alSymbol = this.loadSymbolFromReference(azSymbolKind_1.AZSymbolKind.DotNetAssembly, '', symbolRef, false);
                parent.addChildItem(alSymbol);
                //load type definitions
                if (symbolRef.TypeDeclarations)
                    this.loadDotNetTypeDeclarations(alSymbol, symbolRef.TypeDeclarations);
            }
        }
    }
    loadFromEnumValueReference(symbolIndex, symbolReference) {
        let alSymbol = this.loadSymbolFromReference(azSymbolKind_1.AZSymbolKind.EnumType, '', symbolReference, true);
        let idx = symbolIndex.toString();
        if (symbolReference.Ordinal)
            idx = symbolReference.Ordinal;
        alSymbol.fullName = alSymbol.name + " (" + idx + ")";
        return alSymbol;
    }
    loadEnumValues(parent, symbolReferenceList) {
        if (symbolReferenceList) {
            for (let i = 0; i < symbolReferenceList.length; i++) {
                let alSymbol = this.loadFromEnumValueReference(i, symbolReferenceList[i]);
                parent.addChildItem(alSymbol);
            }
        }
    }
    loadMethodSymbolReferences(groupName, parent, symbolKind, privateSymbolKind, symbolReferenceList) {
        if (symbolReferenceList) {
            let listParent;
            if (groupName != '') {
                listParent = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.SymbolGroup, groupName);
                parent.addChildItem(listParent);
            }
            else
                listParent = parent;
            for (let i = 0; i < symbolReferenceList.length; i++) {
                let kind;
                if (symbolReferenceList[i].IsLocal)
                    kind = privateSymbolKind;
                else
                    kind = symbolKind;
                let alSymbol = this.loadSymbolFromReference(kind, '', symbolReferenceList[i], false);
                //build procedure name
                let parameters = symbolReferenceList[i].Parameters;
                let paramText = '';
                if (parameters) {
                    for (let p = 0; p < parameters.length; p++) {
                        if (p > 0)
                            paramText = paramText + ', ';
                        paramText = paramText + parameters[p].Name;
                    }
                }
                alSymbol.fullName = alSymbol.name + '(' + paramText + ')';
                listParent.addChildItem(alSymbol);
            }
        }
    }
    loadChangesSymbolReferences(parent, changesName, symbolReferenceList) {
        if (symbolReferenceList) {
            for (let i = 0; i < symbolReferenceList.length; i++) {
                let symbolRef = symbolReferenceList[i];
                let alSymbol = this.loadSymbolFromReference(azSymbolKind_1.AZSymbolKind.Undefined, changesName, symbolRef, false);
                parent.addChildItem(alSymbol);
                //load symbol actions
                if (symbolRef.Actions)
                    this.loadActionSymbolReferences(alSymbol, symbolRef.Actions);
                if (symbolRef.Controls)
                    this.loadControlSymbolReferences(alSymbol, symbolRef.Controls);
            }
        }
    }
    loadDataItemSymbolReferences(parent, symbolReferenceList) {
        if (symbolReferenceList) {
            for (let i = 0; i < symbolReferenceList.length; i++) {
                let symbolRef = symbolReferenceList[i];
                let alSymbol = this.loadSymbolFromReference(azSymbolKind_1.AZSymbolKind.ReportDataItem, 'DataItem', symbolRef, false);
                parent.addChildItem(alSymbol);
                //load symbol items
                if (symbolRef.Columns)
                    this.loadBasicSymbolReferences('', alSymbol, azSymbolKind_1.AZSymbolKind.SymbolGroup, azSymbolKind_1.AZSymbolKind.ReportColumn, symbolRef.Columns, false);
                if (symbolRef.DataItems)
                    this.loadDataItemSymbolReferences(alSymbol, symbolRef.DataItems);
            }
        }
    }
    loadActionSymbolReferences(parent, symbolReferenceList) {
        if (symbolReferenceList) {
            //page layout
            if ((parent.kind == azSymbolKind_1.AZSymbolKind.PageObject) ||
                (parent.kind == azSymbolKind_1.AZSymbolKind.PageExtensionObject) ||
                (parent.kind == azSymbolKind_1.AZSymbolKind.RequestPage)) {
                let actions = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.PageActionList, 'actions');
                parent.addChildItem(actions);
                parent = actions;
            }
            for (let i = 0; i < symbolReferenceList.length; i++) {
                let symbolRef = symbolReferenceList[i];
                let actionKind = symbolRef.Kind;
                let alSymbol = this.loadSymbolFromReference(this.alActionKindToSymbolKind(actionKind), alActionKind_1.ALActionKind[actionKind], symbolRef, false);
                parent.addChildItem(alSymbol);
                //load symbol actions
                if (symbolRef.Actions)
                    this.loadActionSymbolReferences(alSymbol, symbolRef.Actions);
            }
        }
    }
    loadControlSymbolReferences(parent, symbolReferenceList) {
        if (symbolReferenceList) {
            //page layout
            if ((parent.kind == azSymbolKind_1.AZSymbolKind.PageObject) ||
                (parent.kind == azSymbolKind_1.AZSymbolKind.PageExtensionObject) ||
                (parent.kind == azSymbolKind_1.AZSymbolKind.RequestPage)) {
                let layout = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.PageLayout, 'layout');
                parent.addChildItem(layout);
                parent = layout;
            }
            for (let i = 0; i < symbolReferenceList.length; i++) {
                let symbolRef = symbolReferenceList[i];
                let controlKind = symbolRef.Kind;
                let alSymbol = this.loadSymbolFromReference(this.alControlKindToSymbolKind(controlKind), alControlKind_1.ALControlKind[controlKind], symbolRef, false);
                parent.addChildItem(alSymbol);
                //load symbol controls
                if (symbolRef.Controls)
                    this.loadControlSymbolReferences(alSymbol, symbolRef.Controls);
            }
        }
    }
    loadBasicSymbolReferences(groupName, parent, groupKind, symbolKind, symbolReferenceList, loadIds) {
        if (symbolReferenceList) {
            let listParent;
            if (groupName != '') {
                listParent = azSymbolInformation_1.AZSymbolInformation.create(groupKind, groupName);
                parent.addChildItem(listParent);
            }
            else
                listParent = parent;
            for (var i = 0; i < symbolReferenceList.length; i++) {
                let importSymbolKind = symbolKind;
                if ((i == 0) && (symbolKind == azSymbolKind_1.AZSymbolKind.Key))
                    importSymbolKind = azSymbolKind_1.AZSymbolKind.PrimaryKey;
                listParent.addChildItem(this.loadSymbolFromReference(importSymbolKind, '', symbolReferenceList[i], loadIds));
            }
        }
    }
    loadSymbolFromReference(symbolKind, namePrefix, data, loadIds) {
        let name = (data.Name) ? data.Name : '';
        let fullName = alSyntaxHelper_1.ALSyntaxHelper.toNameText(name);
        if (namePrefix !== '')
            fullName = namePrefix + ' ' + fullName;
        let symbol = azSymbolInformation_1.AZSymbolInformation.create(symbolKind, name);
        symbol.fullName = fullName.trim();
        if ((data.TypeDefinition) && (data.TypeDefinition.Name))
            symbol.fullName = symbol.fullName + ": " + data.TypeDefinition.Name;
        if ((data.FieldNames) && (data.FieldNames.length > 0)) {
            let fieldList = '';
            for (let i = 0; i < data.FieldNames.length; i++) {
                if (i > 0)
                    fieldList = fieldList + ", ";
                fieldList = fieldList + alSyntaxHelper_1.ALSyntaxHelper.toNameText(data.FieldNames[i]);
            }
            symbol.fullName = symbol.fullName + ": " + fieldList;
        }
        if ((data.Id) && (loadIds))
            symbol.id = data.Id;
        return symbol;
    }
    alControlKindToSymbolKind(controlKind) {
        switch (controlKind) {
            case alControlKind_1.ALControlKind.Area:
                return azSymbolKind_1.AZSymbolKind.PageArea;
            case alControlKind_1.ALControlKind.Group:
                return azSymbolKind_1.AZSymbolKind.PageGroup;
            case alControlKind_1.ALControlKind.CueGroup:
                return azSymbolKind_1.AZSymbolKind.PageGroup;
            case alControlKind_1.ALControlKind.Repeater:
                return azSymbolKind_1.AZSymbolKind.PageGroup;
            case alControlKind_1.ALControlKind.Fixed:
            case alControlKind_1.ALControlKind.Grid:
                return azSymbolKind_1.AZSymbolKind.PageGroup;
            case alControlKind_1.ALControlKind.Part:
                return azSymbolKind_1.AZSymbolKind.PagePart;
            case alControlKind_1.ALControlKind.SystemPart:
                return azSymbolKind_1.AZSymbolKind.PageSystemPart;
            case alControlKind_1.ALControlKind.Field:
                return azSymbolKind_1.AZSymbolKind.PageField;
            case alControlKind_1.ALControlKind.Label:
                return azSymbolKind_1.AZSymbolKind.PageLabel;
            case alControlKind_1.ALControlKind.UserControl:
                return azSymbolKind_1.AZSymbolKind.PageUserControl;
            case alControlKind_1.ALControlKind.Chart:
                return azSymbolKind_1.AZSymbolKind.PageChartPart;
        }
        return azSymbolKind_1.AZSymbolKind.Undefined;
    }
    alActionKindToSymbolKind(actionKind) {
        switch (actionKind) {
            case alActionKind_1.ALActionKind.Group:
                return azSymbolKind_1.AZSymbolKind.PageActionGroup;
            case alActionKind_1.ALActionKind.Area:
                return azSymbolKind_1.AZSymbolKind.PageActionArea;
            case alActionKind_1.ALActionKind.Action:
                return azSymbolKind_1.AZSymbolKind.PageAction;
            case alActionKind_1.ALActionKind.Separator:
                return azSymbolKind_1.AZSymbolKind.PageActionSeparator;
        }
        return azSymbolKind_1.AZSymbolKind.Undefined;
    }
}
exports.ALNativeAppSymbolsLibrary = ALNativeAppSymbolsLibrary;
//# sourceMappingURL=alNativeAppSymbolsLibrary.js.map