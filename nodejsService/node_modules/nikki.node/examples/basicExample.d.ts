import { nodeServiceBase } from "../src/serviceBase";
export declare class MyDerivedClass extends nodeServiceBase {
    onConnected(): void;
    onDisconnected(): void;
    onData(data: any): void;
}
