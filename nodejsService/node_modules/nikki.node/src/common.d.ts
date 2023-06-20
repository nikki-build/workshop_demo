import { sourceInfo } from "./sourceInfo";
export declare var defaultBrowserStartPage: string;
export declare var serviceTokenFileName: string;
export declare var serviceDefFileName: string;
export declare class serviceJoinRequest {
    wsAddress: string;
    sessionID: string;
}
export declare enum wsJoinType {
    service = "service",
    dash = "dash"
}
export declare class serviceJoinInfo {
    sessionID: string;
    userID: string;
    srv: sourceInfo | undefined;
    wsAddr: string;
    type: wsJoinType;
}
export declare class playgroundInfo {
    sessionID: string;
    wsAddr: string;
    userID: string;
    restAddr: string;
}
export declare class joinRequest {
    sessionID: string;
    srv: sourceInfo | undefined;
}
export declare class queryConst {
    static wsKey: string;
}
