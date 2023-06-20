import { sourceInfo } from "./sourceInfo"
export var defaultBrowserStartPage = "index.html"
export var serviceTokenFileName = "serviceToken.json"
export var serviceDefFileName = "serviceDef.json"

export class serviceJoinRequest {
    wsAddress: string = ""
    sessionID: string = ""
}

export enum wsJoinType {
    service = "service",
    dash = "dash"
}

export class serviceJoinInfo {
    sessionID: string = ""
    userID: string = ""
    srv: sourceInfo | undefined = undefined
    wsAddr: string = ""
    type: wsJoinType = wsJoinType.dash
}

export class playgroundInfo {
    sessionID = ""
    wsAddr = ""
    userID = ""
    restAddr = ""
}

export class joinRequest {
    sessionID: string = ""
    srv: sourceInfo | undefined = undefined
}

export class queryConst {
    static wsKey = "wsKey"
}
