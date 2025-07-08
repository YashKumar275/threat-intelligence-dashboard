from flask import Blueprint, request, jsonify
import joblib
import os

analyze_bp = Blueprint("analyze", __name__)

model_path = os.path.join(os.path.dirname(__file__), "../ml/model.joblib")
model = joblib.load(model_path)

@analyze_bp.route("/", methods=["POST", "OPTIONS"])
def analyze():
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    data = request.get_json()
    description = data.get("description", "")
    if not description.strip():
        return jsonify({"error": "Description is required"}), 400
    prediction = model.predict([description])[0]
    return jsonify({"predicted_category": prediction})
