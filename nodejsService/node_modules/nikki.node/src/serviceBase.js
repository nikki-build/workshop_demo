"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.__esModule = true;
exports.nodeServiceBase = void 0;
var nodeWsUtil_1 = require("./nodeWsUtil");
var pathUtil_1 = require("./pathUtil");
var redData_1 = require("./redData");
var nodeServiceBase = /** @class */ (function (_super) {
    __extends(nodeServiceBase, _super);
    function nodeServiceBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tokenInst = undefined;
        _this.srvInfo = undefined;
        return _this;
        // async saveData() {
        // }
        // async getData() {
        // }
    }
    nodeServiceBase.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stat, bPath, token, srv, msg, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stat = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        bPath = process.cwd();
                        return [4 /*yield*/, pathUtil_1.pathUtil.getTokenFromFile(bPath)];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, pathUtil_1.pathUtil.getServiceInfoFile(bPath)];
                    case 3:
                        srv = _a.sent();
                        if (token && srv) {
                            this.srvInfo = srv;
                            this.tokenInst = token;
                            this.afterInit();
                            // console.info("successfully init...")
                            stat = true;
                        }
                        else {
                            msg = "failed to start, not a valid url.";
                            console.error(msg);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error('exception while, init ', e_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, stat];
                }
            });
        });
    };
    nodeServiceBase.prototype.afterInit = function () {
        // console.info("after init is called.")
    };
    nodeServiceBase.prototype.getSessionID = function () {
        var sID = "";
        if (this.tokenInst && this.srvInfo) {
            sID = this.tokenInst.sessionID;
        }
        return sID;
    };
    nodeServiceBase.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stat, wsPath, comStat, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stat = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.init()];
                    case 2:
                        stat = _a.sent();
                        if (stat && (this.connectStateFalg == false) && this.srvInfo && this.tokenInst) {
                            wsPath = pathUtil_1.pathUtil.getConnectConnectPath(this.tokenInst, this.srvInfo);
                            if (wsPath) {
                                comStat = this.initWsChannels(wsPath);
                                if (comStat) {
                                    console.info("everything looks good... ");
                                    stat = true;
                                }
                                else {
                                    console.error("failed to start.");
                                }
                            }
                        }
                        else {
                            console.error("invalid start address received");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error('exception while, start ', e_2.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, Promise.resolve(stat)];
                }
            });
        });
    };
    nodeServiceBase.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.closeConnection();
                    console.info("closed successfully.");
                }
                catch (e) {
                    console.error('exception while, closing service ', e.message);
                }
                return [2 /*return*/];
            });
        });
    };
    nodeServiceBase.prototype.getNodedata = function (data) {
        var _a;
        var nData = undefined;
        try {
            if (this.srvInfo && this.tokenInst && this.tokenInst.sessionID) {
                var srvID = this.srvInfo.srvID;
                var instID = this.srvInfo.instID;
                nData = new redData_1.redData(this.tokenInst.sessionID, srvID, instID);
                if (nData) {
                    nData.data = (_a = this.srvInfo) === null || _a === void 0 ? void 0 : _a.oDf;
                    nData.data.data = data;
                }
            }
            else {
                console.error("not initialized yet...");
            }
        }
        catch (e) {
            console.error('exception while, node data  ', e.message);
        }
        return nData;
    };
    nodeServiceBase.prototype.sendData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var stat, rdata;
            return __generator(this, function (_a) {
                stat = nodeWsUtil_1.checkErrorMap.not_init;
                try {
                    rdata = this.getNodedata(data);
                    if (rdata && this.connectStateFalg) {
                        stat = this.nextData(rdata);
                    }
                    else {
                        if (this.connectStateFalg) {
                            stat = nodeWsUtil_1.checkErrorMap.srvInitFailed;
                            console.info(nodeWsUtil_1.checkErrorMap.srvInitFailed);
                        }
                        else {
                            console.info(nodeWsUtil_1.checkErrorMap.notConnected);
                        }
                    }
                }
                catch (e) {
                    console.error('exception while, sending data ', e.message);
                }
                return [2 /*return*/, stat];
            });
        });
    };
    nodeServiceBase.prototype.onData = function (data) {
        console.info("got input ", data);
    };
    nodeServiceBase.prototype.onError = function () {
    };
    nodeServiceBase.prototype.onConnected = function () {
        console.info("on onConnected ");
    };
    nodeServiceBase.prototype.onDisconnected = function () {
        console.info("on onDisconnected ");
    };
    return nodeServiceBase;
}(nodeWsUtil_1.wsComWrapper));
exports.nodeServiceBase = nodeServiceBase;
