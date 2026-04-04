from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

# Get absolute path to the 'dist' directory (where React build lives)
dist_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")

app = Flask(__name__, static_folder=dist_path, static_url_path="/")
CORS(app)

# ── Model Configuration ────────────────────────────────────────
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

# ── Static File Serving (Render Production) ───────────────────
# This serves the React website when you open your live link
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

@app.route('/health')
def health_check():
    return "API and Frontend are active 🚀"

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
        "class": str(result)
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
