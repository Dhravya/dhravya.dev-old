from flask import Flask, render_template, send_file, request, send_from_directory
from .extras.image_to_ascii import ImageToAscii

app = Flask(__name__)

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/resume")
def resume():
    return send_file('static/Dhravyas_Resume.pdf', attachment_filename='resume.pdf')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.route("/projects")
def projects():
    return render_template('projects.html')


@app.route("/qrcode")
def qrcode():
    return render_template('qrcode.html')


@app.route("/ascii")
def ascii():
    return render_template('ascii.html')


@app.route('/upload_image_for_ascii', methods=['POST'])
def ascii_upload():
    if request.method == 'POST':
        file = request.files['image']
        if file.filename == '':
            return 'No selected file'
        if file and allowed_file(file.filename):
            ImageToAscii(imagePath=file, outputFile="/var/www/FlaskApp/PersonalWebsite/test.txt")
            return send_from_directory(path='/var/www/FlaskApp/PersonalWebsite/test.txt',directory="." ,filename='test.txt', as_attachment=True)

    else:
        return 'Invalid request'

if __name__ == '__main__':
    app.run(debug=True)
