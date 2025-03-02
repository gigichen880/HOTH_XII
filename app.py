from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_socketio import SocketIO, join_room, leave_room, send
import os

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

CORS(app) 
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
# jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    user = {
        "username": data["username"],
        "email": data["email"],
        "password": hashed_pw,
        # "major": data["major"]
    }
    mongo.db.users.insert_one(user)
    return jsonify({"message": "User created!"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = mongo.db.users.find_one({"email": data["email"]})
    if not user or not bcrypt.check_password_hash(user["password"], data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user["email"])
    return jsonify({"token": access_token, "user": {"username": user["username"], "major": user["major"]}})


if __name__ == "__main__":
    app.run(debug=True)
