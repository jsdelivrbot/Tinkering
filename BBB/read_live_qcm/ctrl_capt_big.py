import numpy as np
import cv2
arr = np.array

cap = cv2.VideoCapture(0)
cap.set(cv2.cv.CV_CAP_PROP_FRAME_WIDTH,320)
cap.set(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT,240)
thresh = 100
max_thresh = 255

while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Display the resulting frame
    cv2.imshow('frame',frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()

cap = cv2.VideoCapture(0)
cap.set(cv2.cv.CV_CAP_PROP_FRAME_WIDTH,800)
cap.set(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT,240)
# thresh = 100
# max_thresh = 255
ret, frame = cap.read()
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5,5), 0)
edges = cv2.Canny(gray, thresh, max_thresh)
edges = cv2.adaptiveThreshold(blur,255,1,1,5,2)
contours,hierarchy = cv2.findContours(edges,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
bckgrd = np.zeros(frame.shape, np.uint8) 

avperim = 0
for i, cnt in enumerate(contours):
    perim = cv2.arcLength(cnt, True)
    if  perim < 800:  
        color = np.random.randint(0,255,(3)).tolist()  #
        cv2.drawContours(frame,[cnt], 0, color, 2)  
        cv2.drawContours(bckgrd, [cnt], 0, color, 2)
        avperim += perim
avperim /= len(contours)
print('averae perim is ', avperim)
    

cv2.imwrite("frame_ctrs.jpg",frame)
cv2.imwrite("ctrs_bckgrd.jpg",bckgrd)


cap.release()
cv2.destroyAllWindows()

        


