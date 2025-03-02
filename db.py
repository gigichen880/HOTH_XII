import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId


class User:
    def __init__(self, username, password, email, verify):
        self.username = username
        self.password = password
        self.email = email
        self.verify = False


class Room:
    def __init__(self, courseName=None, onlineUsers=None):
        if courseName:
            self.courseName = courseName
        if onlineUsers:
            self.onlineUsers = []


class Database:
    def __init__(self, db_pswd):
        uri = os.getenv("MONGO_URI")
        self.client = MongoClient(uri, server_api=ServerApi('1'))
        self.db = self.client['bruinmooz']
        try:
            self.client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print("db.py initialization error")
            print(e)

    def add_user(self, user: User):
        if self.db.users.find_one({"username": user.username}) is not None:
            return False
        else:
            self.db.users.insert_one(vars(user))
            return True

    def get_user(self, username: str):
        user = self.db.users.find_one({"username": username})
        try:
            if user is not None:
                del user['_id']
                return user
            else:
                return None
        except Exception as e:
            print(f"Error getting user: {str(e)}")
            return None

    def add_room(self, room: room):
        return self.db.room.insert_one(vars(room)).inserted_id

