export declare enum redataInfoEnum {
    OK = 0,
    ERROR = 1
}
export declare enum ioParamsType {
    userDefined = "userDefined",
    voidType = "voidType"
}
export declare class dataBundle {
    ioType: ioParamsType;
    name: string;
    data: any;
    desc: string;
}
export declare class redData {
    sessionID: string;
    srvID: string;
    instID: string;
    data: dataBundle;
    msg: string;
    status: redataInfoEnum;
    constructor(sessionID: string, srvID: string, instID: string);
    static toJsonString(data: redData): string;
    static fromString(strData: string): redData;
    static clone(srcData: redData): redData;
}
