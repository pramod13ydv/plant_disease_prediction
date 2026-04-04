import os
import io
import numpy as np
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from PIL import Image

app = FastAPI(title="Medisight AI - Neural Diagnostic Hub")

# Enable CORS for frontend connectivity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Model Configuration ────────────────────────────────────────
MODEL_PATH = "model/plant_model.h5"
IMG_SIZE   = (224, 224)

# Try to load the model if it exists, otherwise keep it None for MOCK mode
model = None
if os.path.exists(MODEL_PATH):
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        print(f"✅  Neural Model loaded from {MODEL_PATH}")
    except Exception as e:
        print(f"⚠️   Error loading model: {e}")

# ── Premium Diagnostic Intelligence (Step 5) ──────────────────
CLASS_NAMES = ['Tomato_Early_blight', 'Tomato_healthy', 'Potato_Late_blight']

DISEASE_INFO = {
    "Tomato_Early_blight": {
        "treatment": "Apply copper-based fungicides. Remove infected lower leaves early.",
        "cause": "Fungus (Alternaria solani) often caused by wet weather and poor air circulation.",
        "severity": "Moderate"
    },
    "Potato_Late_blight": {
        "treatment": "Destroy infected plants immediately. Use preventative fungicides on healthy plants.",
        "cause": "Water mold (Phytophthora infestans), the same organism behind the Irish Potato Famine.",
        "severity": "High"
    },
    "Tomato_healthy": {
        "treatment": "No treatment required. Maintain regular watering and nutrients.",
        "cause": "Optimal growth conditions.",
        "severity": "None"
    }
}

# ── Helpers ────────────────────────────────────────────────────
def preprocess_image(image: Image.Image) -> np.ndarray:
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(IMG_SIZE)
    # Generic normalization (standard for many Keras models)
    img_array = np.array(image) / 255.0
    return np.expand_dims(img_array, axis=0)

# ── API Routes ─────────────────────────────────────────────────
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read and open image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Pre-process
        img_batch = preprocess_image(image)

        if model:
            # Real Inference
            preds = model.predict(img_batch)
            idx = np.argmax(preds)
            predicted_class = CLASS_NAMES[idx]
            confidence = float(np.max(preds))
        else:
            # MOCK mode (if model file is not uploaded yet)
            import random
            predicted_class = random.choice(CLASS_NAMES)
            confidence = 0.985

        # Fetch extra details for "Premium" output
        details = DISEASE_INFO.get(predicted_class, {
            "treatment": "Consult a specialist for further analysis.",
            "cause": "Unknown anomaly detected.",
            "severity": "TBD"
        })

        return {
            "class": predicted_class,
            "confidence": round(confidence, 4),
            "healthy": "healthy" in predicted_class.lower(),
            "details": details
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {
        "status": "active",
        "model_path": MODEL_PATH,
        "model_loaded": model is not None
    }

# ── Static File Serving (Production Build Setup) ───────────────
# This ensures that when deployed, main.py also serves the React build
dist_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")

if os.path.exists(dist_path):
    # Mount assets folder for static files (JS, CSS, Images)
    app.mount("/assets", StaticFiles(directory=os.path.join(dist_path, "assets")), name="assets")

    @app.get("/{path:path}")
    async def serve_frontend(path: str):
        # Serve the requested file if it exists, otherwise serve index.html
        file_path = os.path.join(dist_path, path)
        if path != "" and os.path.exists(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(dist_path, "index.html"))

if __name__ == "__main__":
    import uvicorn
    # Local dev run
    uvicorn.run(app, host="127.0.0.1", port=8000)
