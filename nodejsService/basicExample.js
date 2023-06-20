var nikkiJs = require('nikki.node')

// #  serviceBase is the base class , you can over ride its functionalities like
// #  
// #  onConnected ()       // called when connection is successfully established to nikki.build
// #  onDisconnected ()    // called on disconnect from nikki.build  
// #  onError (errMsg)     // called whenever there is any error.
// #  onData  (jsonData)   // is called whenever any node sends data to your service.
// #  
// #  sendData (jsonData)  // send to data to other connected nodes.
// #                       // data should be JSON object. 
// #  start ()             // start connection to nikki.build.
// #  stop ()              // to disconnect  from nikki.build.                      



// #  your subscriptions will have MAX messages allowed to send limit!!!.
// #  you CAN NOT send more than 2 messages per second.



 class MyDerivedClass extends nikkiJs.serviceBase {

    onConnected() {
        console.info("we got connected : ")
    }

    onDisconnected() {
        console.info("closed connection  ")
    }

    onData(data) {
        console.info("received data from nikki.build node : ", data)
    }
}


let srvInst = new MyDerivedClass


// to connect to nikki.build.
srvInst.start()




// send data every 3 second. 
// you can send only 1 message every second.
// rate of sending depends on your subscription to nikki.build 

let counter = 0
setInterval(() => {
    if (srvInst) {
        let outObj = { count: counter }
        console.info("sending data ", outObj)
        srvInst.sendData(outObj)
        counter++
    }
}, 3000)