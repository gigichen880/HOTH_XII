import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId


class User:
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
        #self.verify = False


class Room:
    def __init__(self, newRoomName=None, username=None, major_name=None):
        if newRoomName:
            self.newRoomName = newRoomName
        if username:
            self.onlineUsers = [username]
        else:
            self.onlineUsers = []
        if major_name:
            self.major = major_name


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
    
    def get_all_major_room(self, major_name: str):
        all_rooms = []
        query = {"major": major_name}  # Query rooms based on major

        for room in self.db.room.find(query):
            room['_id'] = str(room['_id'])  # Convert ObjectId to string for readability
            all_rooms.append(room)

        return all_rooms
    
    def join_room(self, room:Room, user:str):
        existing_room = self.db.room.find_one({"newRoomName": room.newRoomName})

        if existing_room:
            if user not in existing_room.get("onlineUsers", []):
                self.db.room.update_one(
                    {"newRoomName": room.newRoomName},
                    {"$push": {"onlineUsers": user}}
                )
            return False 
        else:
            room.onlineUsers = [user]  
            self.db.room.insert_one(vars(room))
            return True 
    
    def leave_room(self, room: Room, user: str):
        existing_room = self.db.room.find_one({"newRoomName": room.newRoomName})

        if existing_room:
            if user in existing_room.get("onlineUsers", []):
                # Remove user from the onlineUsers list
                self.db.room.update_one(
                    {"newRoomName": room.newRoomName},
                    {"$pull": {"onlineUsers": user}}
                )

                # Check if the room is empty after removal
                updated_room = self.db.room.find_one({"newRoomName": room.newRoomName})
                if not updated_room.get("onlineUsers"):  # If empty, delete the room
                    self.db.room.delete_one({"newRoomName": room.newRoomName})

            return True  # User left the room
        return False  # Room does not exist

        
    def add_room(self, room: Room):
         if self.db.room.find_one({"newRoomName": room.newRoomName}) is not None:
            return False
         else:
            room.onlineUsers = [room.onlineUsers]  
            self.db.room.insert_one(vars(room))
            return True
        
