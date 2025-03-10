import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import "./majorPage.css"

const MajorPage = () => {
  
  const navigate = useNavigate();

  var { room_name } = useParams();

  const location = useLocation();
  const username = location.state?.username || "Guest";
  var { major } = useParams();
  let major_name = major.slice(0)
  major = major_name.toUpperCase();

  const [chatRooms, setChatRooms] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");

  // let major_name = "African_American_Studies";

  const createNewRoom = async () => {
    const newRoom = { id: chatRooms.length + 1, name: newRoomName };
    setChatRooms([...chatRooms, newRoom]);
    setShowPopup(false); // Close the popup after room creation
    setNewRoomName(""); // Clear the input field
    console.log(newRoomName, username, major_name);
    const response = await fetch(`http://localhost:5000/major/${major_name}`, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({newRoomName: newRoomName, username: username, major_name: major_name}), // Send room data in the body
    })
  };

  /*
  axios.post("http://localhost:5000/major/African_American_Studies",{
    major_name
  });
  */

  const [loading, setLoading] = useState(true); // Declare loading state
  const [error, setError] = useState(null); // Declare error state

  useEffect(() => {
    async function fetch_room_info() {
      try {
        const response = await fetch(`http://localhost:5000/major/${major_name}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Map the data to JSX buttons (assuming data is an array of rooms with 'newRoomName' and 'name')
        
        console.log(data);
        data.forEach((room, idx) => {
          console.log(room["newRoomName"]);
          setChatRooms([...chatRooms, {name:  `${room["newRoomName"]} Chat Room`}]);
          console.log(chatRooms);
        })

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetch_room_info();
  }, [major_name]); // Re-run if major_name changes
  

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Welcome to the {major} Major Chat Rooms!</h1>

      {/* List of chat rooms */}
      <div>
        <h3 style={styles.subheading}>Available Chat Rooms</h3>
        <ul style={styles.roomList}>
          {chatRooms.map((room) => (
            <li key={room.id} style={styles.roomItem}>
              <button
                onClick={() => navigate(`/major/${major_name}/${room.newRoomName}`, {state:{major_name:major_name}})}
                style={styles.roomButton}
              >
                {room.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Button to create a new room */}
      <div>
        <button onClick={() => setShowPopup(true)} style={styles.createButton}>
          Create New Chat Room
        </button>
      </div>

      {/* Popup for creating a new room */}
      {showPopup && (
        <div style={styles.overlay}>
          <div style={styles.popupContainer}>
            <h3 style={styles.popupHeading}>Create a New Chat Room</h3>
            <input
              type="text"
              placeholder="Enter room name"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              style={styles.inputField}
            />
            <div style={styles.popupActions}>
              <button onClick={createNewRoom} style={styles.submitButton}>
                Submit
              </button>
              <button
                onClick={() => setShowPopup(false)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f7f9fc",
    height: "100vh",
    width: "100%",
  },
  heading: {
    color: "#2c3e50",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  subheading: {
    color: "#34495e",
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  roomList: {
    listStyleType: "none",
    padding: "0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  },
  roomItem: {
    marginBottom: "15px",
  },
  roomButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "15px",
    borderRadius: "8px",
    border: "none",
    width: "100%",
    cursor: "pointer",
    fontSize: "1.1rem",
    transition: "background-color 0.3s ease",
    height: "50vh",
  },
  roomButtonHover: {
    backgroundColor: "#2980b9",
  },
  createButton: {
    backgroundColor: "#2ecc71",
    color: "#fff",
    padding: "15px 30px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    width: "400px",
    textAlign: "center",
  },
  popupHeading: {
    color: "#34495e",
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    outline: "none",
  },
  popupActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  submitButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    width: "48%",
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    width: "48%",
  },
};

export default MajorPage;
