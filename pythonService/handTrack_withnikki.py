# this example is to send data from nikki build
import time
import cv2
from cvzone.HandTrackingModule import HandDetector
from nikki_python.serviceBase import serviceBase
nodeInst = serviceBase()

cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)
nodeInst.start()
detector = HandDetector(detectionCon=0.7)
startDist = None
scale = 0
cx, cy = 500, 500
count = 0
while True:
    success, img = cap.read()
    hands, img = detector.findHands(img)
    # img1 = cv2.imread(img)

    if len(hands):

        finger = detector.fingersUp(hands[0])
        # print(type(finger))
        for ele in finger:
            if (ele == 1):
                count = count + 1
                count1 = count
        print(count)
        nodeInst.sendData(count)
        time.sleep(1)

        count = 0
    cv2.imshow("Image", img)
    cv2.waitKey(1)
