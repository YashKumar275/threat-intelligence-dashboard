import pandas as pd
from pymongo import MongoClient
import json

#Replace with your 
client = MongoClient("your-mongodb-atlas-uri")
db = client["threat_db"]
collection = db["threats"]

# Clear old data
collection.delete_many({})

# Read CSV
df = pd.read_csv('...')  # Ensure file name is changed according to your system

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
