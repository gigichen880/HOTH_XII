import os
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from pymongo.errors import ConnectionFailure

app = Flask(__name__)

# Load MongoDB URI from environment variable
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)
db = mongo.db  # Access the database

try:
    # Test the connection
    mongo.cx.admin.command('ping')  # 'cx' is PyMongo's MongoClient
    print("✅ Successfully connected to MongoDB!")
except ConnectionFailure:
    print("❌ Failed to connect to MongoDB. Check your URI and network connection.")

@app.route("/add_user", methods=["POST"])
def add_user():
    data = request.json
    user_id = db.users.insert_one({"name": data["name"], "email": data["email"]}).inserted_id
    return jsonify({"message": "User added", "user_id": str(user_id)}), 201

@app.route("/users", methods=["GET"])
def get_users():
    users = list(db.users.find({}, {"_id": 0}))
    return jsonify(users)

if __name__ == "__main__":
    app.run(debug=True)
