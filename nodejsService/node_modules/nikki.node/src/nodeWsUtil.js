"use strict";
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
exports.__esModule = true;
exports.wsComWrapper = exports.wsMsgBase = exports.wsMsgType = exports.wsStatusType = exports.checkErrorMap = exports.ping = exports.routeServMsg = void 0;
var rxjs_1 = require("rxjs");
var webSocket_1 = require("rxjs/webSocket");
exports.routeServMsg = "srvMsg";
exports.ping = "ping";
global.WebSocket = require('ws');
var MAX_DATA_SIZE = 510;
var DATA_RATE = 250;
var pingInterval = 26000;
// let pingInterval = 3000
var pingStartDelay = 1000;
var checkErrorMap;
(function (checkErrorMap) {
    checkErrorMap["size_exceed"] = "data packet size exceeded";
    checkErrorMap["not_init"] = "not connected to server";
    checkErrorMap["ok"] = "ok";
    checkErrorMap["srvInitFailed"] = "service is not initialized properly";
    checkErrorMap["notConnected"] = " not connected to server.";
    checkErrorMap["invalidData"] = "data type should be JSON.stringify compatible";
    checkErrorMap["rate_exceed"] = "please slow down. You have sent MORE than 2 msgs/second.";
})(checkErrorMap = exports.checkErrorMap || (exports.checkErrorMap = {}));
var wsStatusType;
(function (wsStatusType) {
    wsStatusType["connected"] = "connected";
    wsStatusType["disconnected"] = "disconnected";
    wsStatusType["data"] = "data";
})(wsStatusType = exports.wsStatusType || (exports.wsStatusType = {}));
var wsMsgType;
(function (wsMsgType) {
    wsMsgType["statusChange"] = "statusChange";
    wsMsgType["data"] = "data";
})(wsMsgType = exports.wsMsgType || (exports.wsMsgType = {}));
var wsMsgBase = /** @class */ (function () {
    function wsMsgBase() {
        this.status = wsMsgType.statusChange;
        this.data = undefined;
    }
    return wsMsgBase;
}());
exports.wsMsgBase = wsMsgBase;
var wsComWrapper = /** @class */ (function () {
    function wsComWrapper() {
        this.wsSubject = undefined;
        this.wsSubscription = undefined;
        this.lastMsgSent = 0;
        this.connectStateFalg = false;
        this.pingHndl = rxjs_1.timer(pingStartDelay, pingInterval);
        this.pingSubscription = undefined;
    }
    wsComWrapper.prototype.closeConnection = function () {
        try {
            console.info("closing connection.");
            if (this.pingSubscription) {
                this.pingSubscription.unsubscribe();
            }
            if (this.wsSubscription) {
                this.wsSubscription.unsubscribe();
            }
            if (this.connectStateFalg == true) {
                this.wsSubject.complete();
                this.connectStateFalg = false;
            }
        }
        catch (e) {
            console.error('exception while, closing ws  ', e.message);
        }
    };
    wsComWrapper.prototype.isConnected = function () {
        return this.connectStateFalg;
    };
    wsComWrapper.prototype.initWsChannels = function (wsConnectpath) {
        var _this = this;
        var stat = false;
        try {
            console.info("connecting to server...");
            this.wsSubject = webSocket_1.webSocket({
                url: wsConnectpath,
                openObserver: {
                    next: this.wsOnConnect.bind(this),
                    error: this.onsocketError.bind(this),
                    complete: this.onCompleted.bind(this)
                },
                closeObserver: {
                    next: this.wsOnClose.bind(this),
                    error: this.onsocketError.bind(this),
                    complete: this.onCompleted.bind(this)
                },
                deserializer: function (_a) {
                    var data = _a.data;
                    return data;
                },
                serializer: function (msg) {
                    var pMsg = "";
                    try {
                        _this.lastMsgSent = Date.now();
                        pMsg = JSON.stringify(msg);
                    }
                    catch (e) {
                        console.error('exception while, ws serializer ', e.message);
                    }
                    return pMsg;
                }
            });
            // this.wsSubscription = this.wsSubject.subscribe()
            this.wsSubscription = this.wsSubject.subscribe({
                next: this.wsGotMsg.bind(this),
                error: this.onsocketError.bind(this),
                complete: this.onCompleted.bind(this)
            });
            this.startPing();
            stat = true;
        }
        catch (e) {
            console.error('exception while, initWsChannels ', e.message);
        }
        return stat;
    };
    wsComWrapper.prototype.onsocketError = function (err) {
        try {
            this.connectStateFalg = false;
            console.info("ERROR :", err.message);
        }
        catch (e) {
            console.error('exception while, onsocketError ', e.message);
        }
    };
    wsComWrapper.prototype.onCompleted = function () {
        try {
            this.connectStateFalg = false;
        }
        catch (e) {
            console.error('exception while,onCompleted  ', e.message);
        }
    };
    wsComWrapper.prototype.startPing = function () {
        this.pingSubscription = this.pingHndl.subscribe({ next: this.pingSrv.bind(this) });
    };
    wsComWrapper.prototype.stopPing = function () {
        if (this.pingSubscription) {
            this.pingSubscription.unsubscribe();
        }
    };
    wsComWrapper.prototype.checks = function (data) {
        var status = checkErrorMap.ok;
        try {
            if (DATA_RATE > (Date.now() - this.lastMsgSent)) {
                status = checkErrorMap.rate_exceed;
                //console.error(status)
                return status;
            }
            var str = JSON.stringify(data);
            if (str.length > MAX_DATA_SIZE) {
                console.error(status);
                status = checkErrorMap.size_exceed;
                console.info("current data length is " + str.length + " , it should be with in " + MAX_DATA_SIZE);
                return status;
            }
        }
        catch (e) {
            console.error('exception while, checks ', e.message);
            status = checkErrorMap.invalidData;
        }
        return status;
    };
    wsComWrapper.prototype.pingSrv = function () {
        try {
            if (this.connectStateFalg == true) {
                var pingMsg = { action: exports.ping, sessionID: this.getSessionID() };
                // console.info('ping...............', pingMsg)
                this.wsSubject.next(pingMsg);
            }
        }
        catch (e) {
            console.error('exception while, pingSrv ', e.message);
        }
    };
    wsComWrapper.prototype.nextData = function (data) {
        var cStatus = checkErrorMap.not_init;
        if (this.connectStateFalg == true) {
            try {
                cStatus = this.checks(data);
                if (cStatus == checkErrorMap.ok) {
                    this.wsSubject.next(__assign({ action: exports.routeServMsg }, data));
                    // console.info("sent data =>", { ...data })
                }
                else {
                    console.error("can't send the data because " + cStatus);
                }
                this.lastMsgSent = Date.now();
            }
            catch (e) {
                console.error('exception while, sending ws msg ', e.message);
            }
        }
        return cStatus;
    };
    wsComWrapper.prototype.wsOnConnect = function () {
        try {
            console.info("connected... ");
            this.onConnected();
            this.connectStateFalg = true;
        }
        catch (e) {
            console.error('exception while,  ', e.message);
        }
    };
    wsComWrapper.prototype.wsOnClose = function (msg) {
        this.connectStateFalg = false;
        try {
            console.info("connection closed... ");
            this.onDisconnected();
        }
        catch (e) {
            console.error('exception while,  ', e.message);
        }
    };
    wsComWrapper.prototype.wsGotMsg = function (msg) {
        try {
            var pDta = JSON.parse(msg);
            if (pDta && pDta.data && pDta.data.data) {
                var mData = pDta.data.data;
                // console.info(" INPUT data : ", pDta)
                this.onData(mData);
            }
            else {
                //  console.info(" received invalid data ", msg)
            }
        }
        catch (e) {
            console.error('exception while, working with inputdata ', e.message);
        }
    };
    return wsComWrapper;
}());
exports.wsComWrapper = wsComWrapper;
