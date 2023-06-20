export declare var routeServMsg: string;
export declare var ping: string;
export declare enum checkErrorMap {
    size_exceed = "data packet size exceeded",
    not_init = "not connected to server",
    ok = "ok",
    srvInitFailed = "service is not initialized properly",
    notConnected = " not connected to server.",
    invalidData = "data type should be JSON.stringify compatible",
    rate_exceed = "please slow down. You have sent MORE than 2 msgs/second."
}
export declare enum wsStatusType {
    connected = "connected",
    disconnected = "disconnected",
    data = "data"
}
export declare enum wsMsgType {
    statusChange = "statusChange",
    data = "data"
}
export declare class wsMsgBase {
    status: wsMsgType;
    data: wsStatusType | any;
}
export declare abstract class wsComWrapper {
    protected wsSubject: any;
    protected wsSubscription: any;
    protected lastMsgSent: number;
    protected connectStateFalg: boolean;
    protected pingHndl: import("rxjs").Observable<number>;
    protected pingSubscription: any;
    abstract getSessionID(): string;
    closeConnection(): void;
    isConnected(): boolean;
    initWsChannels(wsConnectpath: string): boolean;
    onsocketError(err: any): void;
    onCompleted(): void;
    protected startPing(): void;
    protected stopPing(): void;
    protected checks(data: any): checkErrorMap.size_exceed | checkErrorMap.ok | checkErrorMap.invalidData | checkErrorMap.rate_exceed;
    protected pingSrv(): void;
    nextData(data: any): checkErrorMap.size_exceed | checkErrorMap.not_init | checkErrorMap.ok | checkErrorMap.invalidData | checkErrorMap.rate_exceed;
    protected wsOnConnect(): void;
    protected wsOnClose(msg: any): void;
    protected wsGotMsg(msg: any): void;
    abstract onData(data: any): void;
    abstract onError(): void;
    abstract onConnected(): void;
    abstract onDisconnected(): void;
}
