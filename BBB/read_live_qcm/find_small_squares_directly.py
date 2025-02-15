import numpy as np
import cv2
arr = np.array
from time import sleep

cap = cv2.VideoCapture(0)
cap.set(cv2.cv.CV_CAP_PROP_FRAME_WIDTH,320)
cap.set(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT,240)
thresh = 100
max_thresh = 255

def show_squares(ii):
    cnt, perim, bckgrd = ii.cnt, ii.perim, ii.bckgrd
    approx = cv2.approxPolyDP(cnt, 0.02*perim, True)
    #if len(approx) == 4:
    print 'ooooo'
    screenCnt = approx
    color_app = [10,10,100]
    cv2.drawContours(bckgrd, [screenCnt], 0, color_app, 2)
    cv2.drawContours(ii.frame, [screenCnt], 0, color_app, 2)

class IMAGE_INFOS():
    def __init__(self, image):
        self.frame = image

while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()
    ii = IMAGE_INFOS(frame)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    #blur = cv2.GaussianBlur(gray, (5,5), 0)
    edges = cv2.Canny(gray,thresh,max_thresh)
    #edges = cv2.adaptiveThreshold(edges, 255, 1, 1, 5, 2)
    contours,hierarchy = cv2.findContours(edges,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    bckgrd = np.zeros(frame.shape, np.uint8) 
    image_area = gray.size
    #sleep(0.3)
    
    for i, cnt in enumerate(contours):
        cv2.drawContours(bckgrd, [cnt], 0, [100,100,100], 2)
        perim = cv2.arcLength(cnt, True)
        ii.cnt, ii.perim, ii.bckgrd = cnt, perim, bckgrd
        if  10 < perim < 200:  
            show_squares(ii)

        color = np.random.randint(0,255,(3)).tolist()  #
        #cv2.drawContours(frame,[cnt], 0, color, 2)  
        #cv2.drawContours(ctrs_bckgrd, [cnt], 0, color, 2)
        
    cv2.imshow('output', bckgrd)

    # Our operations on the frame come here
    # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Display the resulting frame
    cv2.imshow('frame',frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
