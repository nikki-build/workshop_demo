"use strict";
exports.__esModule = true;
exports.queryConst = exports.joinRequest = exports.playgroundInfo = exports.serviceJoinInfo = exports.wsJoinType = exports.serviceJoinRequest = exports.serviceDefFileName = exports.serviceTokenFileName = exports.defaultBrowserStartPage = void 0;
exports.defaultBrowserStartPage = "index.html";
exports.serviceTokenFileName = "serviceToken.json";
exports.serviceDefFileName = "serviceDef.json";
var serviceJoinRequest = /** @class */ (function () {
    function serviceJoinRequest() {
        this.wsAddress = "";
        this.sessionID = "";
    }
    return serviceJoinRequest;
}());
exports.serviceJoinRequest = serviceJoinRequest;
var wsJoinType;
(function (wsJoinType) {
    wsJoinType["service"] = "service";
    wsJoinType["dash"] = "dash";
})(wsJoinType = exports.wsJoinType || (exports.wsJoinType = {}));
var serviceJoinInfo = /** @class */ (function () {
    function serviceJoinInfo() {
        this.sessionID = "";
        this.userID = "";
        this.srv = undefined;
        this.wsAddr = "";
        this.type = wsJoinType.dash;
    }
    return serviceJoinInfo;
}());
exports.serviceJoinInfo = serviceJoinInfo;
var playgroundInfo = /** @class */ (function () {
    function playgroundInfo() {
        this.sessionID = "";
        this.wsAddr = "";
        this.userID = "";
        this.restAddr = "";
    }
    return playgroundInfo;
}());
exports.playgroundInfo = playgroundInfo;
var joinRequest = /** @class */ (function () {
    function joinRequest() {
        this.sessionID = "";
        this.srv = undefined;
    }
    return joinRequest;
}());
exports.joinRequest = joinRequest;
var queryConst = /** @class */ (function () {
    function queryConst() {
    }
    queryConst.wsKey = "wsKey";
    return queryConst;
}());
exports.queryConst = queryConst;
