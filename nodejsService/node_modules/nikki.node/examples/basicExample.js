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
exports.__esModule = true;
exports.MyDerivedClass = void 0;
var serviceBase_1 = require("../src/serviceBase");
// #  serviceBase is the base class , you can over ride its functionalities like
// #  
// #  onConnected ()       // called when connection is successfully established to nikki.build
// #  onDisconnected ()    // called on disconnect from nikki.build  
// #  onError (errMsg)     // called whenever there is any error.
// #  onData  (jsonData)   // is called whenever any node sends data to your service.
// #  
// #  sendData (jsonData)  // send to data to other connected nodes.
// #                       // data should be JSON object. 
// #  start ()             // start connection to nikki.build.
// #  stop ()              // to disconnect  from nikki.build.                      
// #  your subscriptions will have MAX messages allowed to send limit!!!.
// #  you CAN NOT send more than 2 messages per second.
var MyDerivedClass = /** @class */ (function (_super) {
    __extends(MyDerivedClass, _super);
    function MyDerivedClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyDerivedClass.prototype.onConnected = function () {
        console.info("we got connected : ");
    };
    MyDerivedClass.prototype.onDisconnected = function () {
        console.info("closed connection  ");
    };
    MyDerivedClass.prototype.onData = function (data) {
        console.info("we got data : ", data);
    };
    return MyDerivedClass;
}(serviceBase_1.nodeServiceBase));
exports.MyDerivedClass = MyDerivedClass;
var srvInst = new MyDerivedClass;
// to connect to nikki.build.
srvInst.start();
var count = 0;
var interInst = setInterval(function () {
    count++;
    // send data to nikkibuild
    srvInst.sendData({ count: count });
    console.info("sending data ", count);
}, 3000);
//  sends messages every 6 seconds . after sending 20 service will stop..
// #  BE CARE FULL , while changin these paramters,
// #  your subscriptions will have MAX messages allowed to send limit.
// #  you CAN NOT send more than 2 messages per second.
