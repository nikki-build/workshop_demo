# import cv2
# from cvzone.HandTrackingModule import HandDetector
# import time

# cap = cv2.VideoCapture(0)
# cap.set(3, 1280)
# cap.set(4, 720)

# detector = HandDetector(detectionCon=0.7)
# startDist = None
# scale = 0
# cx, cy = 500, 500
# count = 0
# while True:
#     success, img = cap.read()
#     hands, img = detector.findHands(img)
#     # img1 = cv2.imread(img)

#     if len(hands):

#         finger = detector.fingersUp(hands[0])
#         # print(type(finger))
#         for ele in finger:
#             if (ele == 1):
#                 count = count + 1
#                 count1 = count
#         print(count)
#         time.sleep(1)

#         count = 0
#     cv2.imshow("Image", img)
#     cv2.waitKey(1)
# # pip install opencv-python



import cv2
import mediapipe as mp
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hands = mp.solutions.hands

# For webcam input:
cap = cv2.VideoCapture(0)
with mp_hands.Hands(
    model_complexity=0,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as hands:
  while cap.isOpened():
    success, image = cap.read()
    if not success:
      print("Ignoring empty camera frame.")
      # If loading a video, use 'break' instead of 'continue'.
      continue

    # To improve performance, optionally mark the image as not writeable to
    # pass by reference.
    image.flags.writeable = False
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(image)

    # Draw the hand annotations on the image.
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # Initially set finger count to 0 for each cap
    fingerCount = 0
    fingers = []
    if results.multi_hand_landmarks:

      for hand_landmarks in results.multi_hand_landmarks:
        # Get hand index to check label (left or right)
        
        handIndex = results.multi_hand_landmarks.index(hand_landmarks)
        handLabel = results.multi_handedness[handIndex].classification[0].label
        
        # Set variable to keep landmarks positions (x and y)
        handLandmarks = [handLabel]
        tipid=[4,8,12,16,20]
        # Fill list with x and y positions of each landmark
        for landmarks in hand_landmarks.landmark:

          handLandmarks.append([landmarks.x, landmarks.y])
        
        # Test conditions for each finger: Count is increased if finger is 
        #   considered raised.
        # Thumb: TIP x position must be greater or lower than IP x position, 
        #   deppeding on hand label.
        if handLabel == "Left":
          if handLandmarks[4][0] > handLandmarks[3][0]:
            fingers.append(1)  
            fingerCount = fingerCount+1
          else:
            fingers.append(0) 


        
        
        # Other fingers: TIP y position must be lower than PIP y position, 
        #   as image origin is in the upper left corner.
          for id in range(1, 5):        
              if handLandmarks[tipid[id]][1] < handLandmarks[tipid[id]-2][1]: 
                fingers.append(1)         #Index finger
                fingerCount = fingerCount+1
              elif handLandmarks[tipid[id]][1] > handLandmarks[tipid[id]-2][1]: 
                fingers.append(0)         #Index finger
                fingerCount = fingerCount+1
   
        # Draw hand landmarks 
        mp_drawing.draw_landmarks(
            image,
            hand_landmarks,
            mp_hands.HAND_CONNECTIONS,
            mp_drawing_styles.get_default_hand_landmarks_style(),
            mp_drawing_styles.get_default_hand_connections_style())
    print(fingers)
    # Display finger count
    cv2.putText(image, str(fingerCount), (50, 450), cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 0, 0), 10)

    # Display image
    cv2.imshow('MediaPipe Hands', image)
    if cv2.waitKey(5) & 0xFF == 27:
      break
cap.release()