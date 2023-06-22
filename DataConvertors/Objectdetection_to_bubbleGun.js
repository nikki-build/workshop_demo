//Dataconvertor code for object detection service to audio player service
(objectDetectorData) => {

    let audioPlayerData =
    {
        //No input parameters.
    };

    /*  YOUR conversion code 
        map your inputData to outputData.  */
    if (objectDetectorData.lables && objectDetectorData.lables.includes("person")) {
        audioPlayerData.play = true
    }
    else {
        audioPlayerData.play = false
    }
    return audioPlayerData;
}