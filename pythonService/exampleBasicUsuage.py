

from nikki_python.serviceBase import serviceBase

#  serviceBase is the base class , you can over ride its functionalities like
#
#  onConnected ()       // called when connection is successfully established to nikki.build
#  onDisconnected ()    // called on disconnect from nikki.build
#  onError (errMsg)     // called whenever there is any error.
#  onData  (jsonData)   // is called whenever any node sends data to your service.
#
#  sendData (jsonData)  // send to data to other connected nodes.
#                       // data should be JSON object.
#  start ()             // start connection to nikki.build
#  stop ()              // to disconnect  from nikki.build


#  your subscriptions will have MAX messages allowed to send limit!!!.
#  you CAN NOT send more than 2 messages per second.

class MyDerivedClass(serviceBase):
    def onConnected(self):
        print("we got connected.")

    def onDisconnected(self):
        print("bye bye.")

    def onData(self,data):
        try:
            print("we got data :", data)
        except Exception as e:
            print("exception while processing inputdata ", e)


pyInst = MyDerivedClass()

try:
    # to connect to nikki.build.
    pyInst.start()

    input("Press enter key to send output \n")

    count = {}
    count["count"] = 123
    print("sending :  " + str(count))

    # send data to nikkibuild
    pyInst.sendData(count)

    #  to disconnect from nikki.build.
    input("Press enter key to stop \n")

    pyInst.stop()


except Exception as e:
    print("failed " + str(e))
