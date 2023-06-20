
import { nodeServiceBase } from "../src/serviceBase";


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



export class MyDerivedClass extends nodeServiceBase {

    onConnected(): void {
        console.info("we got connected : ")
    }

    onDisconnected(): void {
        console.info("closed connection  ")
    }

    onData(data: any): void {
        console.info("we got data : ", data)
    }
}


let srvInst = new MyDerivedClass

// to connect to nikki.build.
srvInst.start()

let count = 0

let interInst = setInterval(() => {
    count++;
    // send data to nikkibuild
    srvInst.sendData({ count });
    console.info("sending data ", count)

}, 3000)

//  sends messages every 6 seconds . after sending 20 service will stop..
// #  BE CARE FULL , while changin these paramters,
// #  your subscriptions will have MAX messages allowed to send limit.
// #  you CAN NOT send more than 2 messages per second.





