
import time
from nikki_python.serviceBase import serviceBase


class MyDerivedClass(serviceBase):
    def onConnected(self):
        print("we got connected.")

    def onDisconnected(self):
        print("bye bye.")

    def onData(self, data):
        try:
            print("we got data :", data)
            
            return data
        except Exception as e:
            print("exception while processing inputdata ", e)





pyInst = MyDerivedClass()
pyInst.start()
# pyInst.sendData({})
time.sleep(1000)
