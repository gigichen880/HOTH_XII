import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import "./room.css"

/*
export default function Room()
{
    const [url, setUrl] = useState("https://localhost:5501");
    return (
        <div>
            <button onClick={() => setUrl("https://localhost:5501/hoth/src/video_stream/index.html")}>Join Stream</button>
            <iframe src={url} width="100%" height="600px" style={{ border: "none"}}/>
        </div>
    )
}
*/



function Room()
{
    const location = useLocation();
    const major_name = location.state?.major_name;
    let navigate = useNavigate();
    return (
        <div>
            <h1 id="title">Meeting Room</h1>
            <button onClick={() => {
                navigate(`/major/${major_name}`);
            }}>Exit</button>
            <image src="./button.png" style={{width: '100%', height: '100vh'}}></image>
            <div style={{ width: '100%', height: '100vh' }}>
                
                <iframe
                    src="http://127.0.0.1:5501/hoth/src/video_stream/index.html" // or use /static-html/index.html if in public folder
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                ></iframe>
            </div>
        </div>
    );
}
export default Room


