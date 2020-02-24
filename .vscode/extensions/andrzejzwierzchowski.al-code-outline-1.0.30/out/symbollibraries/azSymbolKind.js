'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var AZSymbolKind;
(function (AZSymbolKind) {
    AZSymbolKind[AZSymbolKind["Undefined"] = 0] = "Undefined";
    //Library = 1,            //change number
    AZSymbolKind[AZSymbolKind["CompilationUnit"] = 227] = "CompilationUnit";
    //PropertyList = 228,
    //OptionValues = 229,
    //ObjectReference = 230,
    //ObjectId = 231,
    //ObjectNameReference = 232,
    AZSymbolKind[AZSymbolKind["ParameterList"] = 233] = "ParameterList";
    //MethodBody = 234,
    AZSymbolKind[AZSymbolKind["VarSection"] = 235] = "VarSection";
    AZSymbolKind[AZSymbolKind["TriggerDeclaration"] = 236] = "TriggerDeclaration";
    AZSymbolKind[AZSymbolKind["EventTriggerDeclaration"] = 237] = "EventTriggerDeclaration";
    AZSymbolKind[AZSymbolKind["MethodDeclaration"] = 238] = "MethodDeclaration";
    AZSymbolKind[AZSymbolKind["EventDeclaration"] = 239] = "EventDeclaration";
    AZSymbolKind[AZSymbolKind["Parameter"] = 240] = "Parameter";
    AZSymbolKind[AZSymbolKind["VariableDeclaration"] = 241] = "VariableDeclaration";
    //ReturnValue = 242,
    //SimpleTypeReference = 243,
    //RecordTypeReference = 244,
    //DotNetTypeReference = 245,
    //DataType = 246,
    //GenericDataType = 247,
    //OptionDataType = 248,
    //TextConstDataType = 249,
    //LabelDataType = 250,
    //DotNetDataType = 251,
    //LengthDataType = 252,
    //SubtypedDataType = 253,
    //EnumDataType = 254,
    //Array = 255,
    //BracketedDimensionList = 256,
    //Dimension = 257,
    //MemberAttribute = 258,
    AZSymbolKind[AZSymbolKind["FieldList"] = 259] = "FieldList";
    AZSymbolKind[AZSymbolKind["Field"] = 260] = "Field";
    AZSymbolKind[AZSymbolKind["DotNetAssembly"] = 261] = "DotNetAssembly";
    AZSymbolKind[AZSymbolKind["DotNetTypeDeclaration"] = 262] = "DotNetTypeDeclaration";
    AZSymbolKind[AZSymbolKind["FieldExtensionList"] = 263] = "FieldExtensionList";
    AZSymbolKind[AZSymbolKind["FieldModification"] = 264] = "FieldModification";
    AZSymbolKind[AZSymbolKind["KeyList"] = 265] = "KeyList";
    AZSymbolKind[AZSymbolKind["Key"] = 266] = "Key";
    AZSymbolKind[AZSymbolKind["FieldGroupList"] = 267] = "FieldGroupList";
    AZSymbolKind[AZSymbolKind["FieldGroup"] = 268] = "FieldGroup";
    AZSymbolKind[AZSymbolKind["PageLayout"] = 269] = "PageLayout";
    AZSymbolKind[AZSymbolKind["PageActionList"] = 270] = "PageActionList";
    AZSymbolKind[AZSymbolKind["GroupActionList"] = 271] = "GroupActionList";
    AZSymbolKind[AZSymbolKind["PageArea"] = 272] = "PageArea";
    AZSymbolKind[AZSymbolKind["PageGroup"] = 273] = "PageGroup";
    AZSymbolKind[AZSymbolKind["PageField"] = 274] = "PageField";
    AZSymbolKind[AZSymbolKind["PageLabel"] = 275] = "PageLabel";
    AZSymbolKind[AZSymbolKind["PagePart"] = 276] = "PagePart";
    AZSymbolKind[AZSymbolKind["PageSystemPart"] = 277] = "PageSystemPart";
    AZSymbolKind[AZSymbolKind["PageChartPart"] = 278] = "PageChartPart";
    AZSymbolKind[AZSymbolKind["PageUserControl"] = 279] = "PageUserControl";
    AZSymbolKind[AZSymbolKind["PageAction"] = 280] = "PageAction";
    AZSymbolKind[AZSymbolKind["PageActionGroup"] = 281] = "PageActionGroup";
    AZSymbolKind[AZSymbolKind["PageActionArea"] = 282] = "PageActionArea";
    AZSymbolKind[AZSymbolKind["PageActionSeparator"] = 283] = "PageActionSeparator";
    AZSymbolKind[AZSymbolKind["PageExtensionActionList"] = 284] = "PageExtensionActionList";
    AZSymbolKind[AZSymbolKind["ActionAddChange"] = 285] = "ActionAddChange";
    AZSymbolKind[AZSymbolKind["ActionMoveChange"] = 286] = "ActionMoveChange";
    AZSymbolKind[AZSymbolKind["ActionModifyChange"] = 287] = "ActionModifyChange";
    AZSymbolKind[AZSymbolKind["PageExtensionLayout"] = 288] = "PageExtensionLayout";
    AZSymbolKind[AZSymbolKind["ControlAddChange"] = 289] = "ControlAddChange";
    AZSymbolKind[AZSymbolKind["ControlMoveChange"] = 290] = "ControlMoveChange";
    AZSymbolKind[AZSymbolKind["ControlModifyChange"] = 291] = "ControlModifyChange";
    AZSymbolKind[AZSymbolKind["PageExtensionViewList"] = 292] = "PageExtensionViewList";
    AZSymbolKind[AZSymbolKind["ViewAddChange"] = 293] = "ViewAddChange";
    AZSymbolKind[AZSymbolKind["ViewMoveChange"] = 294] = "ViewMoveChange";
    AZSymbolKind[AZSymbolKind["ViewModifyChange"] = 295] = "ViewModifyChange";
    AZSymbolKind[AZSymbolKind["ReportDataSetSection"] = 296] = "ReportDataSetSection";
    AZSymbolKind[AZSymbolKind["ReportLabelsSection"] = 297] = "ReportLabelsSection";
    AZSymbolKind[AZSymbolKind["ReportDataItem"] = 298] = "ReportDataItem";
    AZSymbolKind[AZSymbolKind["ReportColumn"] = 299] = "ReportColumn";
    AZSymbolKind[AZSymbolKind["ReportLabel"] = 300] = "ReportLabel";
    AZSymbolKind[AZSymbolKind["ReportLabelMultilanguage"] = 301] = "ReportLabelMultilanguage";
    AZSymbolKind[AZSymbolKind["XmlPortSchema"] = 302] = "XmlPortSchema";
    AZSymbolKind[AZSymbolKind["XmlPortTableElement"] = 303] = "XmlPortTableElement";
    AZSymbolKind[AZSymbolKind["XmlPortFieldElement"] = 304] = "XmlPortFieldElement";
    AZSymbolKind[AZSymbolKind["XmlPortTextElement"] = 305] = "XmlPortTextElement";
    AZSymbolKind[AZSymbolKind["XmlPortFieldAttribute"] = 306] = "XmlPortFieldAttribute";
    AZSymbolKind[AZSymbolKind["XmlPortTextAttribute"] = 307] = "XmlPortTextAttribute";
    AZSymbolKind[AZSymbolKind["RequestPage"] = 308] = "RequestPage";
    AZSymbolKind[AZSymbolKind["QueryElements"] = 309] = "QueryElements";
    AZSymbolKind[AZSymbolKind["QueryDataItem"] = 310] = "QueryDataItem";
    AZSymbolKind[AZSymbolKind["QueryColumn"] = 311] = "QueryColumn";
    AZSymbolKind[AZSymbolKind["QueryFilter"] = 312] = "QueryFilter";
    //Label = 313,
    AZSymbolKind[AZSymbolKind["EnumType"] = 314] = "EnumType";
    AZSymbolKind[AZSymbolKind["EnumValue"] = 315] = "EnumValue";
    AZSymbolKind[AZSymbolKind["EnumExtensionType"] = 316] = "EnumExtensionType";
    //FieldGroupExtensionList = 317,
    //FieldGroupAddChange = 318,
    AZSymbolKind[AZSymbolKind["PageViewList"] = 319] = "PageViewList";
    AZSymbolKind[AZSymbolKind["PageView"] = 320] = "PageView";
    AZSymbolKind[AZSymbolKind["CodeunitObject"] = 411] = "CodeunitObject";
    AZSymbolKind[AZSymbolKind["TableObject"] = 412] = "TableObject";
    AZSymbolKind[AZSymbolKind["TableExtensionObject"] = 413] = "TableExtensionObject";
    AZSymbolKind[AZSymbolKind["PageObject"] = 414] = "PageObject";
    AZSymbolKind[AZSymbolKind["PageExtensionObject"] = 415] = "PageExtensionObject";
    AZSymbolKind[AZSymbolKind["ReportObject"] = 416] = "ReportObject";
    AZSymbolKind[AZSymbolKind["XmlPortObject"] = 417] = "XmlPortObject";
    AZSymbolKind[AZSymbolKind["QueryObject"] = 418] = "QueryObject";
    AZSymbolKind[AZSymbolKind["ControlAddInObject"] = 419] = "ControlAddInObject";
    AZSymbolKind[AZSymbolKind["ProfileObject"] = 420] = "ProfileObject";
    AZSymbolKind[AZSymbolKind["PageCustomizationObject"] = 421] = "PageCustomizationObject";
    AZSymbolKind[AZSymbolKind["DotNetPackage"] = 422] = "DotNetPackage";
    AZSymbolKind[AZSymbolKind["GlobalVarSection"] = 428] = "GlobalVarSection";
    AZSymbolKind[AZSymbolKind["LocalMethodDeclaration"] = 50001] = "LocalMethodDeclaration";
    AZSymbolKind[AZSymbolKind["PrimaryKey"] = 50002] = "PrimaryKey";
    AZSymbolKind[AZSymbolKind["Module"] = 50003] = "Module";
    AZSymbolKind[AZSymbolKind["TableObjectList"] = 50004] = "TableObjectList";
    AZSymbolKind[AZSymbolKind["PageObjectList"] = 50005] = "PageObjectList";
    AZSymbolKind[AZSymbolKind["ReportObjectList"] = 50006] = "ReportObjectList";
    AZSymbolKind[AZSymbolKind["XmlPortObjectList"] = 50007] = "XmlPortObjectList";
    AZSymbolKind[AZSymbolKind["QueryObjectList"] = 50008] = "QueryObjectList";
    AZSymbolKind[AZSymbolKind["CodeunitObjectList"] = 50009] = "CodeunitObjectList";
    AZSymbolKind[AZSymbolKind["ControlAddInObjectList"] = 50010] = "ControlAddInObjectList";
    AZSymbolKind[AZSymbolKind["PageExtensionObjectList"] = 50011] = "PageExtensionObjectList";
    AZSymbolKind[AZSymbolKind["TableExtensionObjectList"] = 50012] = "TableExtensionObjectList";
    AZSymbolKind[AZSymbolKind["ProfileObjectList"] = 50013] = "ProfileObjectList";
    AZSymbolKind[AZSymbolKind["PageCustomizationObjectList"] = 50014] = "PageCustomizationObjectList";
    AZSymbolKind[AZSymbolKind["EnumObjectList"] = 50015] = "EnumObjectList";
    AZSymbolKind[AZSymbolKind["DotNetPackageList"] = 50016] = "DotNetPackageList";
    AZSymbolKind[AZSymbolKind["EnumTypeList"] = 50017] = "EnumTypeList";
    AZSymbolKind[AZSymbolKind["EnumExtensionTypeList"] = 50018] = "EnumExtensionTypeList";
    AZSymbolKind[AZSymbolKind["Namespace"] = 50019] = "Namespace";
    AZSymbolKind[AZSymbolKind["Package"] = 50020] = "Package";
    AZSymbolKind[AZSymbolKind["Class"] = 50021] = "Class";
    AZSymbolKind[AZSymbolKind["Property"] = 50022] = "Property";
    AZSymbolKind[AZSymbolKind["Constructor"] = 50023] = "Constructor";
    AZSymbolKind[AZSymbolKind["Interface"] = 50024] = "Interface";
    AZSymbolKind[AZSymbolKind["Constant"] = 50025] = "Constant";
    AZSymbolKind[AZSymbolKind["String"] = 50026] = "String";
    AZSymbolKind[AZSymbolKind["Number"] = 50027] = "Number";
    AZSymbolKind[AZSymbolKind["Boolean"] = 50028] = "Boolean";
    AZSymbolKind[AZSymbolKind["Array"] = 50029] = "Array";
    AZSymbolKind[AZSymbolKind["Null"] = 50030] = "Null";
    AZSymbolKind[AZSymbolKind["Object"] = 50031] = "Object";
    AZSymbolKind[AZSymbolKind["Struct"] = 50032] = "Struct";
    AZSymbolKind[AZSymbolKind["Operator"] = 50033] = "Operator";
    AZSymbolKind[AZSymbolKind["PageRepeater"] = 50034] = "PageRepeater";
    //events
    AZSymbolKind[AZSymbolKind["IntegrationEventDeclaration"] = 50035] = "IntegrationEventDeclaration";
    AZSymbolKind[AZSymbolKind["BusinessEventDeclaration"] = 50036] = "BusinessEventDeclaration";
    AZSymbolKind[AZSymbolKind["EventSubscriberDeclaration"] = 50037] = "EventSubscriberDeclaration";
    //tests
    AZSymbolKind[AZSymbolKind["TestDeclaration"] = 50038] = "TestDeclaration";
    AZSymbolKind[AZSymbolKind["ConfirmHandlerDeclaration"] = 50039] = "ConfirmHandlerDeclaration";
    AZSymbolKind[AZSymbolKind["FilterPageHandlerDeclaration"] = 50040] = "FilterPageHandlerDeclaration";
    AZSymbolKind[AZSymbolKind["HyperlinkHandlerDeclaration"] = 50041] = "HyperlinkHandlerDeclaration";
    AZSymbolKind[AZSymbolKind["MessageHandlerDeclaration"] = 50042] = "MessageHandlerDeclaration";
    AZSymbolKind[AZSymbolKind["ModalPageHandlerDeclaration"] = 50043] = "ModalPageHandlerDeclaration";
    AZSymbolKind[AZSymbolKind["PageHandlerDeclaration"] = 50044] = "PageHandlerDeclaration";
    AZSymbolKind[AZSymbolKind["ReportHandlerDeclaration"] = 50045] = "ReportHandlerDeclaration";
    AZSymbolKind[AZSymbolKind["RequestPageHandlerDeclaration"] = 50046] = "RequestPageHandlerDeclaration";
    AZSymbolKind[AZSymbolKind["SendNotificationHandlerDeclaration"] = 50047] = "SendNotificationHandlerDeclaration";
    AZSymbolKind[AZSymbolKind["SessionSettingsHandlerDeclaration"] = 50048] = "SessionSettingsHandlerDeclaration";
    AZSymbolKind[AZSymbolKind["StrMenuHandlerDeclaration"] = 50049] = "StrMenuHandlerDeclaration";
    AZSymbolKind[AZSymbolKind["ProjectDefinition"] = 50050] = "ProjectDefinition";
    AZSymbolKind[AZSymbolKind["PackagesList"] = 50051] = "PackagesList";
    AZSymbolKind[AZSymbolKind["Dependencies"] = 50052] = "Dependencies";
    AZSymbolKind[AZSymbolKind["Document"] = 50053] = "Document";
    AZSymbolKind[AZSymbolKind["SymbolGroup"] = 50054] = "SymbolGroup";
    AZSymbolKind[AZSymbolKind["AnyALObject"] = 50055] = "AnyALObject"; //any symbol, used in requests to specify kind of objects
})(AZSymbolKind = exports.AZSymbolKind || (exports.AZSymbolKind = {}));
//# sourceMappingURL=azSymbolKind.js.map