import { playgroundInfo, serviceJoinInfo } from "./common";
import { sourceInfo } from "./sourceInfo";
export declare class pathUtil {
    protected static getServiceAppendParamSegment(srvinfo: serviceJoinInfo): string;
    static getConnectConnectPath(plinfo: playgroundInfo, srv: sourceInfo): string;
    static getTokenFromFile(bPath: string): playgroundInfo;
    static getServiceInfoFile(bPath: string): sourceInfo;
}
