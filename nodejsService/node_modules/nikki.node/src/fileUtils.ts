const fs = require('fs');

export class fileUtils {

    static getLatestFile(folderPath: string, fileName: string, extName: string) {
        let fileInst: string | undefined = undefined
        try {

            let folderContents = fs.readdirSync(folderPath);
            folderContents.forEach(file => {
                console.info("file", file);
            });
        }
        catch (e: any) {
            console.error('exception while, getLatestFile ', e.message)
        }
        return fileInst
    }
}


//fileUtils.getLatestFile(".", "","")