from nikki_python.serviceBase import serviceBase
import time
nodeInst = serviceBase()
nodeInst.start()
time.sleep(5)


def compare_strings(str1, str2):

    return str1 == str2


while True:
    inp1 = str(input('sting1       '))
    inp2 = str(input('sting2       '))
    send = str(compare_strings(inp1, inp2))
    print(send)
    nodeInst.sendData(send)
