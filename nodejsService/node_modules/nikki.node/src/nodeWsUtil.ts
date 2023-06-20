import {
    timer
} from "rxjs";
import { webSocket } from "rxjs/webSocket";

export var routeServMsg = "srvMsg"
export var ping = "ping"

declare var global: any

(global as any).WebSocket = require('ws');

var MAX_DATA_SIZE = 510
var DATA_RATE = 250
let pingInterval = 26000
// let pingInterval = 3000
let pingStartDelay = 1000

export enum checkErrorMap {
    size_exceed = "data packet size exceeded",
    not_init = "not connected to server",
    ok = "ok",
    srvInitFailed = "service is not initialized properly",
    notConnected = " not connected to server.",
    invalidData = "data type should be JSON.stringify compatible",
    rate_exceed = "please slow down. You have sent MORE than 2 msgs/second.",
}

export enum wsStatusType {
    connected = "connected",
    disconnected = "disconnected",
    data = "data"
}

export enum wsMsgType {
    statusChange = "statusChange",
    data = "data"
}

export class wsMsgBase {
    status = wsMsgType.statusChange
    data: wsStatusType | any = undefined
}

export abstract class wsComWrapper {
    protected wsSubject: any = undefined
    protected wsSubscription: any = undefined
    protected lastMsgSent = 0

    protected connectStateFalg = false
    protected pingHndl = timer(pingStartDelay, pingInterval)
    protected pingSubscription: any = undefined

    abstract getSessionID(): string

    closeConnection() {
        try {
            console.info("closing connection.")
            if (this.pingSubscription) {
                this.pingSubscription.unsubscribe()
            }
            if (this.wsSubscription) {
                this.wsSubscription.unsubscribe()
            }
            if (this.connectStateFalg == true) {
                this.wsSubject.complete()
                this.connectStateFalg = false
            }
        }
        catch (e: any) {
            console.error('exception while, closing ws  ', e.message)
        }
    }

    isConnected() {
        return this.connectStateFalg
    }

    initWsChannels(wsConnectpath: string) {
        let stat = false
        try {
            console.info("connecting to server...")
            this.wsSubject = webSocket({
                url: wsConnectpath,
                openObserver: {
                    next: this.wsOnConnect.bind(this),
                    error: this.onsocketError.bind(this),
                    complete: this.onCompleted.bind(this)
                },
                closeObserver: {
                    next: this.wsOnClose.bind(this),
                    error: this.onsocketError.bind(this),
                    complete: this.onCompleted.bind(this)
                },
                deserializer: ({ data }) => data,
                serializer: (msg) => {
                    let pMsg = ""
                    try {
                        this.lastMsgSent = Date.now()
                        pMsg = JSON.stringify(msg)
                    }
                    catch (e: any) {
                        console.error('exception while, ws serializer ', e.message)
                    }
                    return pMsg
                }
            });

            // this.wsSubscription = this.wsSubject.subscribe()
            this.wsSubscription = this.wsSubject.subscribe({
                next: this.wsGotMsg.bind(this),
                error: this.onsocketError.bind(this),
                complete: this.onCompleted.bind(this)
            })
            this.startPing()
            stat = true
        }
        catch (e: any) {
            console.error('exception while, initWsChannels ', e.message)
        }
        return stat
    }

    onsocketError(err: any) {
        try {
            this.connectStateFalg = false
            console.info("ERROR :", err.message)
        }
        catch (e: any) {
            console.error('exception while, onsocketError ', e.message)
        }
    }

    onCompleted() {
        try {
            this.connectStateFalg = false
        }
        catch (e: any) {
            console.error('exception while,onCompleted  ', e.message)
        }
    }

    protected startPing() {
        this.pingSubscription = this.pingHndl.subscribe({ next: this.pingSrv.bind(this) })
    }

    protected stopPing() {
        if (this.pingSubscription) {
            this.pingSubscription.unsubscribe()
        }
    }

    protected checks(data: any) {
        let status = checkErrorMap.ok
        try {

            if (DATA_RATE > (Date.now() - this.lastMsgSent)) {
                status = checkErrorMap.rate_exceed
                //console.error(status)
                return status
            }

            let str = JSON.stringify(data)
            if (str.length > MAX_DATA_SIZE) {
                console.error(status)
                status = checkErrorMap.size_exceed
                console.info(`current data length is ${str.length} , it should be with in ${MAX_DATA_SIZE}`)
                return status
            }

        }
        catch (e: any) {
            console.error('exception while, checks ', e.message)
            status = checkErrorMap.invalidData
        }
        return status
    }

    protected pingSrv() {
        try {
            if (this.connectStateFalg == true) {

                let pingMsg = { action: ping, sessionID: this.getSessionID() }
                // console.info('ping...............', pingMsg)
                this.wsSubject.next(pingMsg)
            }
        }
        catch (e: any) {
            console.error('exception while, pingSrv ', e.message)
        }
    }

    nextData(data: any) {

        let cStatus = checkErrorMap.not_init
        if (this.connectStateFalg == true) {
            try {
                cStatus = this.checks(data);
                if (cStatus == checkErrorMap.ok) {

                    this.wsSubject.next({ action: routeServMsg, ...data })
                    // console.info("sent data =>", { ...data })
                }
                else {
                    console.error("can't send the data because " + cStatus)
                }
                this.lastMsgSent = Date.now()
            }
            catch (e: any) {
                console.error('exception while, sending ws msg ', e.message)
            }
        }
        return cStatus
    }

    protected wsOnConnect() {

        try {
            console.info("connected... ")
            this.onConnected()
            this.connectStateFalg = true
        }
        catch (e: any) {
            console.error('exception while,  ', e.message)
        }
    }

    protected wsOnClose(msg: any) {
        this.connectStateFalg = false
        try {
            console.info("connection closed... ")
            this.onDisconnected()
        }
        catch (e: any) {
            console.error('exception while,  ', e.message)
        }
    }

    protected wsGotMsg(msg: any) {
        try {

            let pDta = JSON.parse(msg)
            if (pDta && pDta.data && pDta.data.data) {
                let mData = pDta.data.data
                // console.info(" INPUT data : ", pDta)
                this.onData(mData)
            }
            else {
                //  console.info(" received invalid data ", msg)
            }
        }
        catch (e: any) {
            console.error('exception while, working with inputdata ', e.message)
        }
    }

    abstract onData(data: any): void

    abstract onError(): void

    abstract onConnected(): void

    abstract onDisconnected(): void
}

