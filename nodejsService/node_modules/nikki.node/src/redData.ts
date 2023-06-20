export enum redataInfoEnum {
    OK, ERROR
}

export enum ioParamsType {
    userDefined = "userDefined",
    voidType = "voidType"
}


export class dataBundle {
    ioType = ioParamsType.voidType
    name: string = ""// primary key
    data: any = {}
    desc: string = "" // tells how the data format looks like with comment
    // ex ;
    // {
    //   a : 2 , // info about the field a
    // }
}

export class redData {

    // tm = Date.now()
    data: dataBundle = new dataBundle
    msg = ""
    status: redataInfoEnum = redataInfoEnum.OK

    constructor(public sessionID: string, public srvID: string, public instID: string) {
    }

    static toJsonString(data: redData) {
        let strData: string | undefined = undefined
        try {

            strData = JSON.stringify(data)
        }
        catch (e: any) {
            console.error("failed to stringify data", e.message);
        }
        return strData
    }

    static fromString(strData: string) {
        let rData: redData | undefined = undefined
        try {
            rData = JSON.parse(strData) as redData
        }
        catch (e:any) {
            console.error("failed to parse the string red data ", e.message);
        }
        return rData
    }

    static clone(srcData: redData) {
        let rData: redData | undefined = undefined
        try {
            rData = new redData(srcData.sessionID, srcData.srvID, srcData.instID)
            rData.sessionID = srcData.sessionID
            rData.srvID = srcData.srvID
            rData.instID = srcData.instID
            rData.data = srcData.data
            rData.msg = ""
            rData.status = redataInfoEnum.OK

        }
        catch (e:any) {
            console.error("failed to parse the string red data ", e.message);
        }
        return rData
    }

}
