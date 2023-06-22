//Dataconvertor code for voice service to arduino LCD service
(switchData) => {

    let roboticsData =
    {
        print: switchData.state,

    };

    /*  YOUR conversion code 
        map your inputData to outputData.  */

    return roboticsData;
}