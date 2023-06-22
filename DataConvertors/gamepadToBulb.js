 

            (gamepadData) => {
           
                let bulbData =  
                {
                    state : "on",
                
                };


     if(gamepadData && gamepadData.data&& gamepadData.data.name && (gamepadData.data.name == "button_6") )
{
    bulbData.state =  "on"
}  

 if(gamepadData && gamepadData.data && gamepadData.data.name && (gamepadData.data.name == "button_7")) 
{
    bulbData.state =  "off"
}
    
          

                /*  YOUR conversion code 
                    map your inputData to outputData.  */
                
                return bulbData;
            }