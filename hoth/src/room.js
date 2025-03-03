import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./room.css";

function Room() {
  const location = useLocation();
  const major_name = location.state?.major_name;
  let navigate = useNavigate();

  return (
    <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
      <iframe
        src="http://127.0.0.1:5501/hoth/src/video_stream/index.html"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
}

export default Room;