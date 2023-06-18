//Dataconvertor code for voice service to arduino LCD service
(speechToTextData) => {

    let roboticsData =
    {
        print: speechToTextData.said,

    };

    /*  YOUR conversion code 
        map your inputData to outputData.  */

    return roboticsData;
}