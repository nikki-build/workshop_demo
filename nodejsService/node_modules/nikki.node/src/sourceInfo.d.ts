import { dataBundle, redData } from "./redData";
export declare enum progLang {
    nodejs = "nodejs",
    js = "js",
    python = "python",
    cpp = "cpp",
    java = "java",
    kotlin = "kotlin",
    mobile = "mobile"
}
export declare enum serviceStartType {
    auto = "auto",
    manual = "manual"
}
export declare class sourceInfo {
    srvID: string;
    instID: string;
    proglang: progLang;
    sysDef: boolean;
    iconName: string | undefined;
    iDf: dataBundle;
    oDf: dataBundle;
    name: string;
    dispName: string;
    desc: string;
    startType: serviceStartType;
    isExtern: boolean;
    constructor();
    static getRedOutputData(sessionID: string, data: sourceInfo): redData;
    static getRedInputData(sessionID: string, data: sourceInfo): redData;
    static toJsonString(src: sourceInfo): string;
}
