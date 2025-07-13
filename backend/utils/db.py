from pymongo import MongoClient

# Replace this with your MongoDB URI if you're using Atlas/cloud
client = MongoClient("your-mongodb-atlas-uri")

# Create or connect to database and collection
db = client["threat_db"]
collection = db["threats"]
