//Dataconvertor code for voice service to arduino LED service
(speechToTextData) => {

    let roboticsData =
    {
        state: "on",

    };

    /*  YOUR conversion code 
        map your inputData to outputData.  */
    if (speechToTextData.said && speechToTextData.said.includes("on")) {
        roboticsData.state = "on"
    }
    else if (speechToTextData.said && speechToTextData.said.includes("blink")) {
        roboticsData.state = "blink"
    }
    else {
        roboticsData.state = "off"
    }

    return roboticsData;
}