from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load model on startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "scaler.pkl")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

GRADE_LABELS = {
    0: "Fail (< 10)",
    1: "Pass (10 - 13)",
    2: "Merit (14 - 16)",
    3: "Distinction (17 - 20)"
}

def get_recommendations(features: dict, predicted_class: int) -> list:
    recs = []
    if features["studytime"] < 2:
        recs.append("Increase weekly study time to at least 5–10 hours for better outcomes.")
    if features["absences"] > 10:
        recs.append("Reduce absences — high absenteeism strongly correlates with poor performance.")
    if features["failures"] > 0:
        recs.append("Seek academic support for previously failed subjects before the next assessment.")
    if features["goout"] > 3:
        recs.append("Balance social activities with study time — frequent outings may reduce focus.")
    if features["freetime"] > 3 and features["studytime"] < 2:
        recs.append("Convert some free time into structured revision sessions.")
    if features["internet"] == 0:
        recs.append("Accessing online learning resources can significantly supplement classroom learning.")
    if features["higher"] == 0:
        recs.append("Setting higher education goals improves motivation and academic engagement.")
    if predicted_class <= 1:
        recs.append("Consider forming or joining a study group to improve understanding of core subjects.")
    if not recs:
        recs.append("Keep up the great work! Maintain your study habits and attendance.")
    return recs


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        feature_order = [
            "age", "studytime", "failures", "absences",
            "freetime", "goout", "health",
            "famrel", "internet", "higher",
            "G1", "G2"
        ]

        features_array = np.array([[data[f] for f in feature_order]], dtype=float)
        features_scaled = scaler.transform(features_array)
        prediction = int(model.predict(features_scaled)[0])
        probabilities = model.predict_proba(features_scaled)[0].tolist()
        confidence = round(max(probabilities) * 100, 2)

        recommendations = get_recommendations(data, prediction)

        return jsonify({
            "predicted_grade_class": prediction,
            "predicted_grade_label": GRADE_LABELS[prediction],
            "confidence": confidence,
            "probabilities": {
                GRADE_LABELS[i]: round(p * 100, 2)
                for i, p in enumerate(probabilities)
            },
            "recommendations": recommendations
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "AI Performance Prediction API is running."})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
