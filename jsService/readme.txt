HOW TO USE NIKKI.BUILD JAVASCRIPT CLIENT (BROWSER) LIBRARY: WITH 3 SIMPLE STEPS.
======================================================================================

1. Refer example "embeddingInHtml" to directly include javascript library into your html.
   
   Steps to initialize javascript client.

   1.  LOADING FILES:

       1. 
          1. TO load the  nikkijs.min.js client library from your server.
                        =========OR======== 
          2. Use CDN link to load the client library like.
             <!-- <script src="https://cdn.jsdelivr.net/npm/nikki.js@0.0.16/dist/nikkijs.min.js"></script> -->
             check for latest version. https://www.jsdelivr.com/package/npm/nikki.js?path=dist
          

       2. Make sure you place serviceDef.json in the root path. So that it is accessible at this path /serviceDef.json
          You can find serviceDef.json file in CDN link or in our exmaples. Don't modify the content of serviceDef.json file.

       3. Create instance of nikkibuild's js client by creating instance of serviceBase class ,
          you could find in nikki namespace.
            
            example:
                  var jsHandler = new nikki.serviceBase()    


   2.  INITIALIZING THE CLIENT.

       You need to load the nikki.build's playground session credentials to complete the initialization.
       This information is stored in serviceToken.json (you can download it from nikki.build's playground => token => download token).
       
       You have 2 ways to initialize your client library. You can choose any of them.

       1. Loading session credentials from file serviceToken.json:
            Pass the file handler to  loadTokenFromFileHanlder ( fileHandler ) function.
              example:
                  html code : open serviceToken.json file from file input.
                  <input type="file"  onchange="jsHandler.loadTokenFromFileHanlder(event)">

                              =========OR========
       2. Loading from server : 
               Place your serviceToken.json file next to your serviceDef.json file. accessible at this path /serviceToken.json 
               example:
                     jsHandler.loadTokenFromServer()
           

   3. START THE CONNECTION.
       Call start() function of the client library once initialization is complete. This will establish the communication channel
       with the server. refer to the client API section for more information.
      
       example: 
            jsHandler.start()


For more information:  https://docs.nikki.build/clientApi



!!! important !!!.
======================================================================================
MAKE SURE YOU UPDATE YOUR serviceToken.json FILE EVERY TIME YOU START A NEW SESSION.
======================================================================================



JAVASCRIPT CLIENT API: 
=======================

 =  loadTokenFromFileHanlder( fileHanlder ) :
        Map "onchange" event for file input element of you html. open serviceToken.json file to load the session's credentials. 
        example 
            html code.: 
                  <input type="file"  onchange="loadTokenFromFileHanlder(event)">

            js code:
                  function loadTokenFromFileHanlder(event){
                        jsHandler.loadTokenFromFileHanlder(event)
                  }


 =  loadTokenFromServer() :
        Place your serviceToken.json file in the root path of your server and call this function to load it from the /serviceToken.json path
       // it returns promise, either await for it or use then().catch() 


      example: 

            async function yourStartingFun(){
                  await jsHandler.loadTokenFromServer()
            }
                    
                    =========OR======== 

            jsHandler.loadTokenFromServer().
                  then(()=>{
                        console.info("connected to server")
                  }).
                  cathc((err)=>{
                        console.info("failed to load tokens", err)
                  })



=  addEventListener(eventName, callbackFunction) :

       Register your event listeners on specific events.
       events:
            connected      : emitted when client connects to playground.
            disConnected   : emitted when connection with server breaks or closed.
            data           : emitted whenever you receive input from the playground.

      returns the ID of the listener. pass this ID to  removeEventListener() to remove the event listener.
      
      example: 
            
            function onData(data){
                  console.log("got data", data)
            }

            let listnerID = jsHandler.addEventListener("data", onData)


=  removeEventListener(ID) :
       ID : While registering the callback you will get an listener ID , pass that to remove the specific callback.
       
       example: 
            jsHandler.removeEventListener(listnerID)


 =  start() :
       To establish the connection.
      example: 
             jsHandler.start()

 =  stop() :
       To stop the connection.
       example: 
             jsHandler.stop()

 =  sendData(jsonData) :
       To send data to the playground. jsonData need to be valid and stringify() able.   
       example: 
             let data = {count : 0}
             jsHandler.sendData(data);
   
       

 

