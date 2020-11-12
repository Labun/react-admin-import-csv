var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React from "react";
import { Button as RAButton, useRefresh, useNotify, useDataProvider, useTranslate, } from "react-admin";
import { Button, List, ListItem, Tooltip, Dialog, CircularProgress, DialogContent, DialogTitle, } from "@material-ui/core";
import { Done, FileCopy, Undo, Clear, Add } from "@material-ui/icons";
import GetAppIcon from "@material-ui/icons/GetApp";
import { SimpleLogger } from "./SimpleLogger";
import { CheckCSVValidation, GetCSVItems, GetIdsColliding, } from "./import-controller";
import { create, update } from "./uploader";
export var BtnOption = function (props) {
    return (React.createElement(ListItem, { disableGutters: true },
        React.createElement(Button, { style: { width: "100%", backgroundColor: "#efefef", padding: "13px" }, onClick: props.onClick },
            props.icon,
            React.createElement("span", { style: { width: "100%", textAlign: "left", marginLeft: "8px" } }, props.label))));
};
export var ImportButton = function (props) {
    var refresh = useRefresh();
    var translate = useTranslate();
    var dataProvider = useDataProvider();
    var _a = props, logging = _a.logging, parseConfig = _a.parseConfig, preCommitCallback = _a.preCommitCallback, postCommitCallback = _a.postCommitCallback, validateRow = _a.validateRow;
    var variant = props.variant, label = props.label, resource = props.resource, resourceName = props.resourceName;
    var logger = new SimpleLogger("import-csv-button", true);
    logger.setEnabled(logging);
    if (!resource) {
        throw new Error(translate("csv.buttonMain.emptyResource"));
    }
    if (!label) {
        label = translate("csv.buttonMain.label");
    }
    if (!variant) {
        variant = "text";
    }
    if (!resourceName) {
        resourceName = resource;
    }
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    var _c = React.useState(false), openAskDecide = _c[0], setOpenAskDecide = _c[1];
    var _d = React.useState(null), values = _d[0], setValues = _d[1];
    var _e = React.useState(null), idsConflicting = _e[0], setIdsConflicting = _e[1];
    var _f = React.useState(null), isLoading = _f[0], setIsLoading = _f[1];
    var _g = React.useState(null), currentValue = _g[0], setCurrentValue = _g[1];
    var _h = React.useState(null), fileName = _h[0], setFileName = _h[1];
    var refInput;
    function resetVars() {
        setOpen(false);
        setOpenAskDecide(false);
        setValues(null);
        setIdsConflicting(null);
        setIsLoading(null);
        setFileName(null);
    }
    function createRows(vals) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, create(logging, dataProvider, resourceName, vals, preCommitCallback, postCommitCallback)];
            });
        });
    }
    function updateRows(vals) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, update(logging, dataProvider, resourceName, vals, preCommitCallback, postCommitCallback)];
            });
        });
    }
    function clickImportButton() {
        resetVars();
        refInput.value = "";
        refInput.click();
    }
    var onFileAdded = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var file, csvItems, collidingIds, hasCollidingIds, collindingIdsSet_1, csvItemsNotColliding, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = e.target.files && e.target.files[0];
                    setFileName(file.name);
                    setOpen(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    // Is valid csv
                    logger.log("Parsing CSV file");
                    return [4 /*yield*/, GetCSVItems(logging, translate, file, parseConfig)];
                case 2:
                    csvItems = _a.sent();
                    setValues(csvItems);
                    // Does CSV pass user validation
                    logger.log("Validating CSV file");
                    return [4 /*yield*/, CheckCSVValidation(logging, translate, csvItems, validateRow)];
                case 3:
                    _a.sent();
                    // Are there any import overwrites?
                    logger.log("Checking rows to import");
                    return [4 /*yield*/, GetIdsColliding(logging, translate, dataProvider, csvItems, resourceName)];
                case 4:
                    collidingIds = _a.sent();
                    setIdsConflicting(collidingIds);
                    hasCollidingIds = !!collidingIds.length;
                    logger.log("Is has colliding ids?", { hasCollidingIds: hasCollidingIds, collidingIds: collidingIds });
                    if (!hasCollidingIds) return [3 /*break*/, 6];
                    collindingIdsSet_1 = new Set(collidingIds.map(function (id) { return id; }));
                    csvItemsNotColliding = csvItems.filter(function (item) { return !collindingIdsSet_1.has(item.id); });
                    logger.log("Importing items which arent colliding", {
                        csvItemsNotColliding: csvItemsNotColliding,
                    });
                    return [4 /*yield*/, createRows(csvItemsNotColliding)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, createRows(csvItems)];
                case 7:
                    _a.sent();
                    handleClose();
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    resetVars();
                    logger.error(error_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    var notify = useNotify();
    var handleClose = function () {
        resetVars();
        notify(translate("csv.dialogImport.alertClose", { fname: fileName }));
        refresh();
    };
    var handleReplace = function () { return __awaiter(void 0, void 0, void 0, function () {
        var collindingIdsSet_2, valuesColliding, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.log("handleReplace");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    setIsLoading(true);
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 1000); })];
                case 2:
                    _a.sent();
                    collindingIdsSet_2 = new Set(idsConflicting.map(function (id) { return id; }));
                    valuesColliding = values.filter(function (item) {
                        return collindingIdsSet_2.has(item.id);
                    });
                    return [4 /*yield*/, updateRows(valuesColliding)];
                case 3:
                    _a.sent();
                    handleClose();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    setIsLoading(false);
                    logger.error("handleReplace", error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSkip = function () {
        logger.log("handleSkip");
        handleClose();
    };
    var handleAskDecide = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            logger.log("handleAskDecide");
            setOpen(false);
            nextConflicting();
            setOpenAskDecide(true);
            return [2 /*return*/];
        });
    }); };
    var nextConflicting = function () {
        var currentId = Array.isArray(idsConflicting) && idsConflicting.pop();
        setIdsConflicting(idsConflicting);
        var foundValue = Array.isArray(values) && values.filter(function (v) { return v.id === currentId; }).pop();
        logger.log("nextConflicting", { foundValue: foundValue, currentId: currentId });
        var isLast = !foundValue;
        if (!isLast) {
            setCurrentValue(foundValue);
        }
        return foundValue && __assign({}, foundValue);
    };
    var handleAskDecideReplace = function () { return __awaiter(void 0, void 0, void 0, function () {
        var val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.log("handleAskDecideReplace");
                    val = nextConflicting();
                    if (!val) {
                        return [2 /*return*/, handleClose()];
                    }
                    return [4 /*yield*/, updateRows([val])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleAskDecideAddAsNew = function () { return __awaiter(void 0, void 0, void 0, function () {
        var val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.log("handleAskDecideAddAsNew");
                    val = nextConflicting();
                    if (!val) {
                        return [2 /*return*/, handleClose()];
                    }
                    delete val.id;
                    return [4 /*yield*/, createRows([val])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleAskDecideSkip = function () { return __awaiter(void 0, void 0, void 0, function () {
        var val;
        return __generator(this, function (_a) {
            logger.log("handleAskDecideSkip");
            val = nextConflicting();
            if (!val) {
                return [2 /*return*/, handleClose()];
            }
            createRows([val]);
            return [2 /*return*/];
        });
    }); };
    var handleAskDecideSkipAll = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            logger.log("handleAskDecideSkipAll");
            handleClose();
            return [2 /*return*/];
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: translate("csv.buttonMain.tooltip") },
            React.createElement("div", null,
                React.createElement(RAButton, { color: "primary", component: "span", variant: variant, label: label, onClick: clickImportButton },
                    React.createElement(GetAppIcon, { style: { transform: "rotate(180deg)", fontSize: "20" } })),
                React.createElement("input", { ref: function (ref) { return (refInput = ref); }, type: "file", style: { display: "none" }, onChange: onFileAdded, accept: ".csv,.tsv" }))),
        React.createElement(MyDialog, { title: translate("csv.dialogImport.title", {
                resource: resourceName,
            }), subTitle: translate("csv.dialogCommon.subtitle", {
                count: values && values.length,
                fileName: fileName,
                resource: resourceName,
            }), open: open, resourceName: resourceName, handleClose: handleClose },
            isLoading && React.createElement(MyLoader, null),
            idsConflicting && idsConflicting.length > 0 && !isLoading && (React.createElement("div", null,
                React.createElement("p", { style: { fontFamily: "sans-serif", margin: "0" }, dangerouslySetInnerHTML: {
                        __html: translate("csv.dialogCommon.conflictCount", {
                            resource: resourceName,
                            conflictingCount: idsConflicting && idsConflicting.length + 1,
                        }),
                    } }),
                React.createElement(List, null,
                    React.createElement(BtnOption, { onClick: handleReplace, icon: React.createElement(Done, { htmlColor: "#29c130" }), label: translate("csv.dialogImport.buttons.replaceAllConflicts") }),
                    React.createElement(BtnOption, { onClick: handleSkip, icon: React.createElement(FileCopy, { htmlColor: "#3a88ca" }), label: translate("csv.dialogImport.buttons.skipAllConflicts") }),
                    React.createElement(BtnOption, { onClick: handleAskDecide, icon: React.createElement(Undo, { htmlColor: "black" }), label: translate("csv.dialogImport.buttons.letmeDecide") }))))),
        React.createElement(MyDialog, { title: translate("csv.dialogDecide.title", {
                id: currentValue && currentValue.id,
                resource: resourceName,
            }), subTitle: translate("csv.dialogCommon.subtitle", {
                count: values && values.length,
                fileName: fileName,
                resource: resourceName,
            }), open: openAskDecide, resourceName: resourceName, handleClose: handleClose },
            isLoading && React.createElement(MyLoader, null),
            !isLoading && (React.createElement("div", null,
                React.createElement("p", { style: { fontFamily: "sans-serif", margin: "0" }, dangerouslySetInnerHTML: {
                        __html: translate("csv.dialogCommon.conflictCount", {
                            resource: resourceName,
                            conflictingCount: idsConflicting && idsConflicting.length + 1,
                        }),
                    } }),
                React.createElement(List, null,
                    React.createElement(BtnOption, { onClick: handleAskDecideReplace, icon: React.createElement(Done, { htmlColor: "#29c130" }), label: translate("csv.dialogDecide.buttons.replaceRow", {
                            id: currentValue && currentValue.id,
                        }) }),
                    React.createElement(BtnOption, { onClick: handleAskDecideAddAsNew, icon: React.createElement(Add, { htmlColor: "#3a88ca" }), label: translate("csv.dialogDecide.buttons.addAsNewRow") }),
                    React.createElement(BtnOption, { onClick: handleAskDecideSkip, icon: React.createElement(Undo, { htmlColor: "black" }), label: translate("csv.dialogDecide.buttons.skipDontReplace") }),
                    React.createElement(BtnOption, { onClick: handleAskDecideSkipAll, icon: React.createElement(Clear, { htmlColor: "#3a88ca" }), label: translate("csv.dialogCommon.buttons.cancel") })))))));
};
function MyDialog(props) {
    return (React.createElement(Dialog, { open: props.open, onClose: props.handleClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
        React.createElement(DialogTitle, { id: "alert-dialog-title" }, props.title),
        React.createElement(DialogContent, null,
            React.createElement("div", { style: { width: "400px", maxWidth: "100%" } },
                React.createElement("p", { style: {
                        fontFamily: "sans-serif",
                        margin: "0",
                        fontSize: "0.9em",
                        marginBottom: "10px",
                        marginTop: "-7px",
                        color: "#555",
                    } }, props.subTitle),
                props.children))));
}
function MyLoader() {
    var translate = useTranslate();
    return (React.createElement("div", { style: {
            textAlign: "center",
            paddingTop: "10px",
            paddingBottom: "10px",
        } },
        React.createElement(CircularProgress, { variant: "indeterminate" }),
        React.createElement("p", { style: {
                fontFamily: "sans-serif",
            } }, translate("csv.loading"))));
}
//# sourceMappingURL=import-csv-button.js.map