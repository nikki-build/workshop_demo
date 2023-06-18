//Dataconvertor code for voice service to audio player service
(speechToTextData) => {

    let audioPlayerData =
    {
        //No input parameters.
    };

    /*  YOUR conversion code 
        map your inputData to outputData.  */
    if (speechToTextData.said && speechToTextData.said.includes("play music")) {
        audioPlayerData.play = true
    }
    else {
        audioPlayerData.play = false
    }

    return audioPlayerData;
}