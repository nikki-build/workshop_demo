"use strict";
exports.__esModule = true;
exports.pathUtil = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var common_1 = require("./common");
var nanoid_1 = require("nanoid");
var pathUtil = /** @class */ (function () {
    function pathUtil() {
    }
    pathUtil.getServiceAppendParamSegment = function (srvinfo) {
        var path = "";
        try {
            var strJson = JSON.stringify(srvinfo);
            var basevalue = Buffer.from(strJson);
            path = basevalue.toString("base64");
        }
        catch (e) {
            console.error('exception while, getServiceAppendParamSegment ', e.message);
        }
        return path;
    };
    pathUtil.getConnectConnectPath = function (plinfo, srv) {
        var strPath = "";
        try {
            var srvinfo = new common_1.serviceJoinInfo;
            srvinfo.userID = plinfo.userID;
            srvinfo.sessionID = plinfo.sessionID;
            srvinfo.srv = srv;
            srvinfo.srv.instID = nanoid_1.nanoid();
            srvinfo.wsAddr = plinfo.wsAddr;
            srvinfo.type = common_1.wsJoinType.service;
            var appendPath = pathUtil.getServiceAppendParamSegment(srvinfo);
            strPath = plinfo.wsAddr + "?" + common_1.queryConst.wsKey + "=" + appendPath;
            // console.info("share path ", strPath)
        }
        catch (e) {
            console.error('exception while, getServiceJoiningPath ', e.message);
        }
        return strPath;
    };
    pathUtil.getTokenFromFile = function (bPath) {
        var info = undefined;
        try {
            var strpath = path_1.join(bPath, common_1.serviceTokenFileName);
            var infoStr = fs_1.readFileSync(strpath).toString();
            info = JSON.parse(infoStr);
        }
        catch (e) {
            console.error('exception while, getTokenFromFile  ', e.message);
        }
        return info;
    };
    pathUtil.getServiceInfoFile = function (bPath) {
        var info = undefined;
        try {
            var strpath = path_1.join(bPath, common_1.serviceDefFileName);
            var infoStr = fs_1.readFileSync(strpath).toString();
            info = JSON.parse(infoStr);
            if (info) {
                info.instID = nanoid_1.nanoid();
            }
        }
        catch (e) {
            console.error('exception while, getServiceInfoFile  ', e.message);
        }
        return info;
    };
    return pathUtil;
}());
exports.pathUtil = pathUtil;
