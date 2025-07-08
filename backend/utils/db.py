from pymongo import MongoClient

# Replace this with your MongoDB URI if you're using Atlas/cloud
client = MongoClient("mongodb+srv://consassign:consecure@consecureassign.ncl7yyj.mongodb.net/")

# Create or connect to database and collection
db = client["threat_db"]
collection = db["threats"]
