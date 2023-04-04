# reactive programming libraries are really powerfull, you could see its implementation in
# many programming languages, many powerfull frameworks uses them.
# we recommend you to give it a try and feel the power.
#
#
# beginner friendly documentation.
# on how to install rxjs and basic usage.
# refer https://www.tutorialspoint.com/rxpy/rxpy_tutorial.pdf
#


import rx
from rx import of, operators as op

from nikki_python.serviceBase import serviceBase

#  in the below example,
#  rx.interval(6).pipe( op.take(20) )
#  will send data every 6 seconds and sends max 20 messages
#  BE CARE FULL , while changin these paramters,
#  your subscriptions will have MAX messages allowed to send limit.
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


source = rx.interval(6).pipe(op.take(200))
#  send data every one second

nodeInst = MyDerivedClass()


def intervalTickEvent(count):
    try:
        outData = {}
        outData["count"] = count
        nodeInst.sendData(outData)
        print("sending... ", outData)

    except Exception as e:
        print("exception while sending data ", e)


def intervalCompleteEvent():
    try:
        nodeInst.stop()
    except Exception as e:
        print("exception while stopping  ", e)

    print("completed ")


def intervalErrorEvent(err):
    print("error ", err)


#  connect to nikki.build.
nodeInst.start()
print("will start sending data to Playground every 6 seconds... ")
susbscription = source.subscribe(
    on_next=intervalTickEvent,
    on_error=intervalErrorEvent,
    on_completed=intervalCompleteEvent
)


input("Press any key to exit\n")
