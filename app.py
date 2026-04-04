from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app) # Enable CORS for frontend connectivity

# Load model (looking for model.h5 in root)
MODEL_PATH = "model.h5"
model = None

if os.path.exists(MODEL_PATH):
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        print(f"✅ Model loaded from {MODEL_PATH}")
    except Exception as e:
        print(f"⚠️ Error loading model: {e}")

# Pre-processing (Step 1)
def preprocess(img):
    img = img.resize((224, 224))
    if img.mode != "RGB":
        img = img.convert("RGB")
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@app.route('/')
def home():
    return "Plant Disease API is running 🚀"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
        
    file = request.files['file']
    img = Image.open(file.stream)
    img = preprocess(img)

    if model:
        prediction = model.predict(img)
        result = int(np.argmax(prediction))
        confidence = float(np.max(prediction))
    else:
        # Mock result if model file is missing
        result = 0
        confidence = 0.99

    return jsonify({
        "prediction": result,
        "confidence": confidence,
        "class": str(result) # Added class for frontend compatibility
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
