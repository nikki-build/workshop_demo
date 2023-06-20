import { playgroundInfo } from './common';
import { checkErrorMap, wsComWrapper } from './nodeWsUtil';
import { redData } from './redData';
import { sourceInfo } from './sourceInfo';
export declare abstract class nodeServiceBase extends wsComWrapper {
    protected tokenInst: playgroundInfo | undefined;
    protected srvInfo: sourceInfo | undefined;
    protected init(): Promise<boolean>;
    afterInit(): void;
    getSessionID(): string;
    start(): Promise<boolean>;
    stop(): Promise<void>;
    getNodedata(data: any): redData;
    sendData(data: any): Promise<checkErrorMap.size_exceed | checkErrorMap.not_init | checkErrorMap.ok | checkErrorMap.srvInitFailed | checkErrorMap.invalidData | checkErrorMap.rate_exceed>;
    onData(data: any): void;
    onError(): void;
    onConnected(): void;
    onDisconnected(): void;
}
