
import time
from nikki_python.serviceBase import serviceBase


class MyDerivedClass(serviceBase):
    def onConnected(self):
        print("we got connected.")

    def onDisconnected(self):
        print("bye bye.")

    def onData(self, data):
        try:
            # print("we got data :", data)
            senddata(data)
            return data
        except Exception as e:
            print("exception while processing inputdata ", e)


def senddata(data):
    print(data['said'], data)


pyInst = MyDerivedClass()
pyInst.start()
time.sleep(1000)
