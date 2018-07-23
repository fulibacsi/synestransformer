from flask import render_template

from app import app
import string


@app.route('/')
def main():
    characters = string.ascii_lowercase + string.digits
    return render_template('main.html', characters=characters)
