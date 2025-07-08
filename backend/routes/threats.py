from flask import Blueprint, jsonify, request
from utils.db import collection
from bson import ObjectId

threats_bp = Blueprint('threats', __name__)

# Convert ObjectId to string
def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@threats_bp.route("/", methods=["GET"])
def get_threats():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    search = request.args.get("search", "")
    category = request.args.get("category", "")

    query = {}
    if search:
        query["Cleaned_Threat_Description"] = {"$regex": search, "$options": "i"}
    if category:
        query["Threat_Category"] = category

    threats = collection.find(query).skip((page - 1) * limit).limit(limit)
    return jsonify([serialize(t) for t in threats])

@threats_bp.route("/<id>", methods=["GET"])
def get_threat_by_id(id):
    threat = collection.find_one({"_id": ObjectId(id)})
    if not threat:
        return jsonify({"error": "Not Found"}), 404
    return jsonify(serialize(threat))

@threats_bp.route("/stats", methods=["GET"])
def get_stats():
    total = collection.count_documents({})
    categories = collection.aggregate([
        {"$group": {"_id": "$Threat_Category", "count": {"$sum": 1}}}
    ])
    severities = collection.aggregate([
        {"$group": {"_id": "$Severity_Score", "count": {"$sum": 1}}}
    ])
    return jsonify({
        "total": total,
        "categories": [{ "category": c["_id"], "count": c["count"] } for c in categories],
        "severities": [{ "severity": s["_id"], "count": s["count"] } for s in severities]
    })
