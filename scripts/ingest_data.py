import pandas as pd
from pymongo import MongoClient
import json

client = MongoClient("mongodb+srv://consassign:consecure@consecureassign.ncl7yyj.mongodb.net/?retryWrites=true&w=majority&appName=ConsecureAssign")
db = client["threat_db"]
collection = db["threats"]

# Clear old data
collection.delete_many({})

# Read CSV
df = pd.read_csv('E:/Consecure_Assignment/data/Cybersecurity_Dataset.csv')  # Ensure file is downloaded from Kaggle

df.rename(columns={
    'Threat Category': 'Threat_Category',
    'Severity Score': 'Severity_Score',
    'Cleaned Threat Description': 'Cleaned_Threat_Description'
}, inplace=True)


# Filter out incomplete rows
df = df[df['Threat_Category'].notnull()]
df = df[df['Severity_Score'].notnull()]

# Convert to JSON and insert
data = json.loads(df.to_json(orient='records'))
collection.insert_many(data)

print(f"Inserted {len(data)} records into MongoDB Atlas")