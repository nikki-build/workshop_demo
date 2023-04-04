nikki.build python client.
   for videos/tutorials on following topics

   1. how to write your own service
   2. how to run the downloaded service
   3. more information on service and its usage 

please refer https://docs.nikki.build/clientApi/index.html


               QUICK GUIDE


===================================================
prerequisites: 
1. python 2.7 or 3+


packages required (must)
===================================================
pip install nikki-python
pip install websocket
pip install websocket-client


optional dependency to run examples.
===================================================
pip install rx


folder structure of your python client template:
===================================================
    -serviceDef.json
    -serviceToken.json             
    -exampleSendingData.py
    -readme.txt     
    


how to run:
===================================================

unzip the pythonService.zip to your workspace, switch to that folder.


1. install all the prerequisites.

2. update serviceToken.json with new session information, refer section "how to update serviceToken.json"
 

3. OTPTIONAL: update serviceDef.json file with meta data related to your service like inputs, outputs, description, name , so on.
   ( read below sections for more information on serviceDef.json)


4. open any example you like, then run in command shell.
        command:
        python exampleSendingData.py

ALLWAYS replace your serviceToken.json when every you start new playground session. !!!
   (new playground session is created every time you login to nikki.build)
 









how to update serviceToken.json
===================================================
IMPORTANT !!!

   serviceToken.json file need to be updated with new session information.
   A new session is created each time you login to nikki.build,  
   update your serviceToken.json file to connect to new Playground session,
   or else it will fail to connect.

   How to find session token / credential to update serviceToken.json?
      1. go to nikki.build => Playground.
      2. click token button.
      3.   you have two options, you can either download the token or copy it.
           1.  download option will download the serivceToken.json file. Place serviceToken.json file in your workspace 
               (make sure file name is correct, it should be serviceToken.json).
                    ------- or --------
           2.  you can copy the session credential by clicking copy button and replace the old serviceToken.json file content with new one. 

      4 where to find/replace serviceToken.json ???
         4.1 your serviceToken.json file will be at firstLevel of your client template.
         refer folder structure in the above section. 




more information on serviceToken.json and serviceDef.json:
===================================================
===================================================


serviceToken.json file:
===================================================
      has information about the session. 
      
      VERY IMPORTANT TO REPLACE THE OLD serviceToken.json FILE WITH NEW ONE
      EVERY TIME A NEW SESSION IS CREATED.

      !!! services CAN NOT connect if you use old serviceToken.json file.!!!
      !!! every time you login to nikki.build new session is created and you must use new session token each time. !!!

      Refer secion "how to update serviceToken.json" 



serviceDef.json file:
===================================================

    json structured file has all the information about the 
    service. Like
    update this file based on your requirements.
    see examples for reference.

    -name         : name of the service.
    -dispName     : name to display on the Playground's dash board.
    -description  : short description about its functionality.  
    -tags         : comma seperated words which describe the service. example:  nodejs, server, example


    -iDf          : input definition. imagine your service as a function.
                   now define its inputs, example functionName (param1, param2)

    
    --  iDf.desc     : very short description about the function's input parameters 
                       like its inputs, possible values, range, things like this.
    --  iDf.data     : it is a json object which will have the actual input data.
    

    -oDf          : output definition. imagine your service as a function.
                    now define its output in json format
                   
                   like functionName (param1, param2) {
                       let returnObject = {
                           param1 = "hi",
                           param2 = "hi again"
                       }
                       return returnObject
                   }

  
    --  oDf.desc     : very short description about function's output parameters 
                       what are its outputs, possible values, range, things like this.
    --  oDf.data     : it is a json object which will have the actual output data (returnObject).

