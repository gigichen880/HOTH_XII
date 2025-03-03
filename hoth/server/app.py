from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO, join_room, leave_room, send
import os
from db import Room, Database, User
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, supports_credentials=True)

load_dotenv(".env")
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
#app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")  
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
socketio = SocketIO(app, cors_allowed_origins="*")
database = Database(None)

MAJOR_FILE = "cleaned_file.txt"

def load_majors():
    """Reads majors from the text file and returns a list."""
    try:
        with open(MAJOR_FILE, "r") as file:
            majors = [line.strip() for line in file.readlines()]
        return majors
    except FileNotFoundError:
        return []

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

        if user and user["password"] == password:
            # session["user"] = username  # Store username in session
            return jsonify({"auth": "success"})
        else:
            return jsonify({"auth": "failure"}), 401
    except Exception as e:
        print("Login error:", e)
        return jsonify({"auth": "failure"}), 500


@app.route('/logout', methods=['POST'])
def logout():
    # session.pop("user", None)  # Remove user from session
    return jsonify({"message": "Logged out successfully"})

"""
@app.route('/major', methods=['GET', 'POST'])
def major():
    if "user" not in session:
        return jsonify({"error": "Unauthorized"}), 401 

    current_user = session["user"] 

    if request.method == 'POST':
        data = request.json
        button_pressed = data.get('button')

        if button_pressed == "":
            return jsonify({"message": "Schedule button pressed", "user": current_user})
        elif button_pressed == "forum":
            return jsonify({"message": "Forum button pressed", "user": current_user})
        else:
            return jsonify({"message": "Unknown button"}), 400

    return jsonify({"message": f"Welcome to the major page, {current_user}!"})
"""

@app.route('/major', methods=['GET', 'POST'])
def major():
    '''
    if "user" not in session:
        return jsonify({"error": "Unauthorized"}), 401  
    '''
    
    majors = load_majors()
    print(majors)

    if request.method == 'POST':
        major_name = request.json.get("major")
        print(major_name)
        print(major_name in majors)
        if major_name in majors:
            print("YES")
            return jsonify({"redirect": f"/Major/{major_name}"})
        else:
            print("NO")
            return jsonify({"error": "Invalid major"}), 400

    return jsonify({"majors": majors}) 

@app.route('/major/<major_name>', methods=['GET'])
def all_major_room(major_name):
    # print(database.get_all_major_room(major_name))
    return database.get_all_major_room(major_name)


@app.route('/major/<major_name>', methods=['POST'])
def create_new_room(major_name):
    try:
        print("ohhhh", request.json)
        if database.add_room(Room(**request.json)):
            return {"status": "success"}
        else:
            return {"status": "failure"}
    except KeyError:
        return {"status": "failure", "message": "something or something not provided."}

if __name__ == "__main__":
    app.run(debug=True)