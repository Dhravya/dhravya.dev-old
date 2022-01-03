from flask import Flask, render_template, send_file, Response 
from mask_detector import detector

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/resume")
def resume():
    return send_file('static/Dhravyas_Resume.pdf', attachment_filename='resume.pdf')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/video_feed')
def video_feed():
    return Response(detector.gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/mask-detector')
def mask_detector():
    return render_template('mask_detector.html')

if __name__ == '__main__':
    app.run(debug=True)
