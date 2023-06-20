//Dataconvertor code for voice service to virtual bulb service
(speechToTextData) => {
    let bulbData =
    {
        state: "on",

    };
    
    /*  YOUR conversion code 
    map your inputData to outputData.  */
    if (speechToTextData.said && speechToTextData.said.includes("on")) {
        bulbData.state = "on"
    }
    else {
        bulbData.state = "off"
    }


    return bulbData;
}