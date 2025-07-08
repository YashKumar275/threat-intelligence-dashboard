from flask import Flask
from flask_cors import CORS
from routes.threats import threats_bp 
from routes.analyze import analyze_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, allow_headers="*", supports_credentials=True)

# Register blueprint
app.register_blueprint(threats_bp, url_prefix="/api/threats")
app.register_blueprint(analyze_bp, url_prefix="/api/analyze")

@app.route("/")
def home():
    return {"message": "Threat Intelligence Dashboard API running."}

if __name__ == "__main__":
    app.run(debug=True)
