"use strict";
exports.__esModule = true;
exports.redData = exports.dataBundle = exports.ioParamsType = exports.redataInfoEnum = void 0;
var redataInfoEnum;
(function (redataInfoEnum) {
    redataInfoEnum[redataInfoEnum["OK"] = 0] = "OK";
    redataInfoEnum[redataInfoEnum["ERROR"] = 1] = "ERROR";
})(redataInfoEnum = exports.redataInfoEnum || (exports.redataInfoEnum = {}));
var ioParamsType;
(function (ioParamsType) {
    ioParamsType["userDefined"] = "userDefined";
    ioParamsType["voidType"] = "voidType";
})(ioParamsType = exports.ioParamsType || (exports.ioParamsType = {}));
var dataBundle = /** @class */ (function () {
    function dataBundle() {
        this.ioType = ioParamsType.voidType;
        this.name = ""; // primary key
        this.data = {};
        this.desc = ""; // tells how the data format looks like with comment
        // ex ;
        // {
        //   a : 2 , // info about the field a
        // }
    }
    return dataBundle;
}());
exports.dataBundle = dataBundle;
var redData = /** @class */ (function () {
    function redData(sessionID, srvID, instID) {
        this.sessionID = sessionID;
        this.srvID = srvID;
        this.instID = instID;
        // tm = Date.now()
        this.data = new dataBundle;
        this.msg = "";
        this.status = redataInfoEnum.OK;
    }
    redData.toJsonString = function (data) {
        var strData = undefined;
        try {
            strData = JSON.stringify(data);
        }
        catch (e) {
            console.error("failed to stringify data", e.message);
        }
        return strData;
    };
    redData.fromString = function (strData) {
        var rData = undefined;
        try {
            rData = JSON.parse(strData);
        }
        catch (e) {
            console.error("failed to parse the string red data ", e.message);
        }
        return rData;
    };
    redData.clone = function (srcData) {
        var rData = undefined;
        try {
            rData = new redData(srcData.sessionID, srcData.srvID, srcData.instID);
            rData.sessionID = srcData.sessionID;
            rData.srvID = srcData.srvID;
            rData.instID = srcData.instID;
            rData.data = srcData.data;
            rData.msg = "";
            rData.status = redataInfoEnum.OK;
        }
        catch (e) {
            console.error("failed to parse the string red data ", e.message);
        }
        return rData;
    };
    return redData;
}());
exports.redData = redData;
