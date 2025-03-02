from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_socketio import SocketIO, join_room, leave_room, send
import os
from db import Listing, Database, User
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, supports_credentials=True) 

load_dotenv(".env")
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
# jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")
database = Database(None)

@app.route('/signup', methods=['POST'])
def signup():
    try:
        if database.add_user(User(**request.json)):
            return {"status": "success"}
        else:
            return {"status": "failure"}
    except KeyError:
        return {"status": "failure", "message": "Username or password not provided."}


@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.json['username']
        password = request.json['password']
        user = database.get_user(username)
        if user["password"] == password:
            return {"auth": "success"}
        else:
            return {"auth": "failure"}
    except Exception as e:
        print("error failure", e)
        return {"auth": "failure"}


if __name__ == "__main__":
    app.run(debug=True)
