//Dataconvertor code for hand gesture controller service to arduino LED service
(pythonAIMLData) => {
    let bulbData = {
        state: "",
    };

    /*  YOUR conversion code 
                      map your inputData to outputData.  */
    if (pythonAIMLData == "5") {
        bulbData.state = "on";
    }
    if (pythonAIMLData == "0") {
        bulbData.state = "off";
    }

    return bulbData;
};