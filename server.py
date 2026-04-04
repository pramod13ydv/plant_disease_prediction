import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from PIL import Image
import numpy as np

# Get absolute path to the 'dist' directory
dist_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")

# Initialize Flask with the static folder pointing to Vite's output
app = Flask(__name__, static_folder=dist_path, static_url_path="/")
CORS(app)

# ── Model Configuration ────────────────────────────────────────
# Placeholder for the future trained model
MODEL_PATH = "medisight_model.h5" 
IMG_SIZE   = (224, 224) # Typical default for most modern models

# Global variable to hold the model instance once it's provided
model = None

# If you have classes for your model, they should go here
# Example: 
# CLASS_NAMES = ["Healthy", "Condition A", "Condition B"]
CLASS_NAMES = ["Awaiting Model Dataset..."]

# ── Pre-processing Logic ───────────────────────────────────────
def preprocess_image(image: Image.Image) -> np.ndarray:
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(IMG_SIZE)
    # Generic normalization (can be adjusted for the new model)
    arr = np.array(image, dtype=np.float32) / 255.0
    return np.expand_dims(arr, axis=0)

# ── API Routes ─────────────────────────────────────────────────
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No filename"}), 400

    try:
        # 1. Process Image
        # image = Image.open(file.stream)
        # processed = preprocess_image(image)

        # 2. Run Prediction (Placeholder logic)
        # In this stage, we return a mock response until the model is provided.
        
        return jsonify({
            "disease": "Placeholder Diagnostic",
            "confidence": 0.999,
            "healthy": True,
            "severity": "Low",
            "top3": [
                {"label": "Placeholder Result", "confidence": 0.999}
            ],
            "message": "Model and dataset removed. Waiting for the complete trained dataset."
        })

    except Exception as exc:
        print(f"Predict Error: {exc}")
        return jsonify({"error": str(exc)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ready",
        "model_loaded": False,
        "message": "Backend is active. Awaiting new model and dataset."
    })

# ── Static File Serving (Production) ───────────────────────────
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == '__main__':
    # Get port from environment or default to 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)


