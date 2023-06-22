//Dataconvertor code for object detection service to audio player service
(objectDetectorData) => {

    let audioPlayerData =
    {
        //No input parameters.
    };

    /*  YOUR conversion code 
        map your inputData to outputData.  */
    if (objectDetectorData.lables && objectDetectorData.lables.includes("person")) {
        audioPlayerData.state = "on"
    }
    else {
        audioPlayerData.state = 'off'
    }
    return audioPlayerData;
}