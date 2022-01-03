import cv2
import numpy as np
from keras.models import load_model

model = load_model('./mask_detector/model-007.model')
source = cv2.VideoCapture(0)
face_clsfr=cv2.CascadeClassifier('./mask_detector/haarcascade_frontalface_default.xml')

labels_dict={0:'MASK',1:'NO MASK'}
color_dict={0:(0,255,0),1:(0,0,255)}

def gen_frames():  # generate frame by frame from camera
    global out, capture,rec_frame
    while True:
        success, img = source.read() 
        if success:
            try:
                gray=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
                faces=face_clsfr.detectMultiScale(gray,1.3,5)  

                for x,y,w,h in faces:
                    

                    face_img=gray[y:y+w,x:x+w]
                    resized=cv2.resize(face_img,(100,100))
                    normalized=resized/255.0
                    reshaped=np.reshape(normalized,(1,100,100,1))
                    result=model.predict(reshaped)
                    label = np.argmax(result,axis=1)[0]
                
                    cv2.rectangle(img,(x,y),(x+w,y+h),color_dict[label] ,2)
                    # cv2.rectangle(img,(x,y-40),(x+w,y),color_dict[label],-1)
                    cv2.putText(img, labels_dict[label], (x, y-10),cv2.FONT_HERSHEY_SIMPLEX,1,(255,255,255),1)
            
                    # SHow the image in the tab
                    out = cv2.imencode('.jpg', img)[1].tobytes()
                    yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + out + b'\r\n')
                    
            except Exception as e:
                print(e)