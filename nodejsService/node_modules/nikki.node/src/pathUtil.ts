

import { readFileSync } from "fs"
import { join } from "path"
import {
    playgroundInfo,
    queryConst,
    serviceDefFileName,
    serviceJoinInfo,
    serviceTokenFileName,
    wsJoinType
} from "./common"
import { sourceInfo } from "./sourceInfo"
import { nanoid } from 'nanoid'


export class pathUtil {


    protected static getServiceAppendParamSegment(srvinfo: serviceJoinInfo) {
        let path = ""
        try {

            let strJson = JSON.stringify(srvinfo)
            let basevalue = Buffer.from(strJson)
            path = basevalue.toString("base64")

        }
        catch (e: any) {
            console.error('exception while, getServiceAppendParamSegment ', e.message)
        }
        return path
    }

    static getConnectConnectPath(plinfo: playgroundInfo, srv: sourceInfo) {
        let strPath = ""
        try {
            let srvinfo = new serviceJoinInfo
            srvinfo.userID = plinfo.userID
            srvinfo.sessionID = plinfo.sessionID

            srvinfo.srv = srv
            srvinfo.srv.instID = nanoid()
            srvinfo.wsAddr = plinfo.wsAddr
            srvinfo.type = wsJoinType.service

            let appendPath = pathUtil.getServiceAppendParamSegment(srvinfo)
            strPath = plinfo.wsAddr + "?" + queryConst.wsKey + "=" + appendPath
            // console.info("share path ", strPath)
        }
        catch (e: any) {
            console.error('exception while, getServiceJoiningPath ', e.message)
        }
        return strPath
    }

    static getTokenFromFile(bPath: string) {
        let info: playgroundInfo | undefined = undefined
        try {
            let strpath = join(bPath, serviceTokenFileName)
            let infoStr = readFileSync(strpath).toString()
            info = JSON.parse(infoStr)
        }
        catch (e: any) {
            console.error('exception while, getTokenFromFile  ', e.message)
        }
        return info
    }

    static getServiceInfoFile(bPath: string) {
        let info: sourceInfo | undefined = undefined
        try {
            let strpath = join(bPath, serviceDefFileName)
            let infoStr = readFileSync(strpath).toString()
            info = JSON.parse(infoStr)
            if (info) {
                info.instID = nanoid()
            }
        }
        catch (e: any) {
            console.error('exception while, getServiceInfoFile  ', e.message)
        }
        return info
    }

}