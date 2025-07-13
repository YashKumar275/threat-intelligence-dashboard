# 🔐 Threat Intelligence Dashboard

A full-stack application for visualizing and analyzing cybersecurity threats in real-time. Built as part of a placement assignment, this project demonstrates core full-stack development, data ingestion, REST API design, frontend visualization, and ML-based threat category prediction.

---

## 🚀 Features Implemented

- 📊 **Dashboard View**: View total threats, distribution by category, and severity.
- 🗂 **Threats View**: Paginated, searchable, and filterable list of threats.
- 🔍 **Threat Analysis**: Real-time category prediction from threat description using a trained ML model.
- ✅ **Data ingestion script**: Parses and uploads data from a provided CSV to MongoDB.
- ⚙️ **Modular API**: RESTful API with proper status codes, pagination, and filtering.
- 🎯 **Frontend SPA**: Built with React for a clean and responsive interface.

---

## 🧱 Technology Stack

| Layer         | Tech Used         | Why This Choice |
|---------------|-------------------|------------------|
| **Frontend**  | React, Axios, Chart.js | Clean UI, dynamic charts, responsive SPA |
| **Backend**   | Flask (Python)    | Simple, REST-friendly, easy ML integration |
| **Database**  | MongoDB (Atlas)   | NoSQL flexibility to match variable threat data |
| **ML Model**  | Scikit-learn (TF-IDF + Logistic Regression) | Simple yet effective text classification |
| **Tools**     | VS Code, Pandas, Joblib, Flask-CORS | For productivity and data handling |

---

## 🛠️ Project Setup & Running Instructions

Follow these steps to get the entire application running locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/threat-intelligence-dashboard.git
cd threat-intelligence-dashboard
```

### 2️⃣ Set Up the Backend

📌 Pre-requisites:
Python 3.x installed

MongoDB Atlas URI (or local MongoDB running at mongodb://localhost:27017)

✅ Create Virtual Environment
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # For Windows
# source venv/bin/activate  # For macOS/Linux
pip install -r requirements.txt
```

📦 requirements.txt
```txt
flask
flask-cors
pymongo
pandas
scikit-learn
joblib
```

### 3️⃣ Configure MongoDB
If you're using MongoDB Atlas, make sure to update the MongoDB connection URI in the following files:

1. backend/utils/db.py

2. scripts/ingest_data.py

Replace the existing MongoClient line with your own MongoDB Atlas URI:

```python
client = MongoClient("your-mongodb-atlas-uri")
```

### 4️⃣ Ingest Data
Place the Cybersecurity_Dataset.csv inside scripts/, then run:

```bash
python scripts/ingest_data.py
```
✅ This populates the threats collection in MongoDB.

# ⚠️ Note on Dataset File Path
In the script scripts/ingest_data.py, make sure to update the CSV file path according to your system:

```python
df = pd.read_csv('...')
```
📌 If you're cloning the project, simply place the Cybersecurity_Dataset.csv file inside the data/ folder (you can create it if it doesn't exist), and then update the path in the script like:

```python
df = pd.read_csv('./data/Cybersecurity_Dataset.csv')
```
✅ This ensures the data ingestion works correctly on any system.

### 5️⃣ Train ML Model
This script trains a logistic regression model using the Cleaned Threat Description field and saves it:

```bash
python scripts/train_model.py
```

# ⚠️ Note on File Path in train_model.py
In the script scripts/train_model.py, make sure to update the path to the dataset based on your local file system:

```python
df = pd.read_csv('...')
```
📌 If you're placing the dataset inside a data/ folder (recommended), update it like this:

```python
df = pd.read_csv('./data/Cybersecurity_Dataset.csv')
```
✅ This helps avoid path issues and makes the project portable across systems.

### 6️⃣ Run Backend API Server

```bash
python app.py
```
Your Flask backend will run at:
🔗 http://localhost:5000

### 7️⃣ Set Up and Run the Frontend

```bash
cd ../frontend
npm install
npm start
```
Your React frontend will run at:
🔗 http://localhost:3000

📡 API Endpoints Summary
Endpoint	Method	Description
/api/threats	GET	Get paginated, filtered threats
/api/threats/:id	GET	Fetch single threat by ID
/api/threats/stats	GET	Get threat statistics (total, by category, by severity)
/api/analyze	POST	Predict category from a threat description

🧪 Running Tests

🔹 (Optional testing setup — include only if implemented)

If you implemented backend unit tests:

```bash
cd backend
pytest
```

If frontend testing is added using Jest:

```bash
cd frontend
npm test
```

📝 Final Notes

❗ If you're behind a firewall or using MongoDB Atlas, make sure your IP is whitelisted.

💡 CORS issues were addressed using flask-cors.

📂 Folder Structure
```cpp
threat-intelligence-dashboard/
├── backend/
│   ├── app.py
│   ├── utils/
│   ├── routes/
│   ├── ml/
│   └── venv/
├── frontend/
│   ├── src/
│   └── public/
├── scripts/
│   ├── ingest_data.py
│   └── train_model.py
├── Cybersecurity_Dataset.csv
└── README.md
```
