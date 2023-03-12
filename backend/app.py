from flask import Flask, request, render_template, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
from rmbg import rmbg_fn
from PIL import Image
import numpy as np
import io
from bson.binary import Binary
import base64

app = Flask(__name__)


# Database
password = "*****"
connection_string = "*******"
client = MongoClient(connection_string)
db = client['RMBG'] # database name


# Settings
CORS(app, supports_credentials=True)


def process_images(files):
    rmbg_data = []
    for file in files:
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        image = np.array(image)
        orginal_str, rmbg_str, mask_str = rmbg_fn(image)
        rmbg_data.append({
            'orginal': orginal_str,
            'rmbg': rmbg_str,
            'mask': mask_str
        })

    return rmbg_data

# Routes
@app.route('/')
def index():
    return render_template('index.html')




@app.route('/upload', methods=['POST'])
def upload():
    files = request.files.getlist('myfile')


    rmbg_data = process_images(files)
        
    db['rmbg'].insert_one({'rmbg_data': rmbg_data})


    response = jsonify({
        'status': 'Data is posted to MongoDB',
        'rmbg_data': rmbg_data
    })

    return response




if __name__ == '__main__':
    app.debug = True
    app.run()

