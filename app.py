from flask import Flask, render_template, send_file

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/resume")
def resume():
    return send_file('static/Dhravyas_Resume.pdf', attachment_filename='resume.pdf')

@app.route("/qrcode")
def qrcode():
    return render_template('qrcode.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True)