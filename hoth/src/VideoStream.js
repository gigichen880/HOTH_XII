import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import './VideoStream.css'; // Ensure you have this CSS file for styling

// VideoStream Component
function VideoStream() {
  // Agora App Credentials (replace with your own)
  const APP_ID = '8e8d14e1af63438f8589af74b383d236'; // Your Agora App ID
  const TOKEN = '007eJxTYIi/fniRkvpTZf4T1044f2ONV96/8XLNpMzqs/HNC/0aVGUUGCxSLVIMTVINE9PMjE2MLdIsTC0sE9PMTZKMLYxTjIzNZlw+kt4QyMjQ4GjMzMgAgSA+C0NuYmYeAwMAXQMfTA=='; // Your Agora Token
  const CHANNEL = 'main';

  // State and Refs
  const [isJoined, setIsJoined] = useState(false); // Track if user has joined the stream
  const [localTracks, setLocalTracks] = useState([]); // Store local audio and video tracks
  const [remoteUsers, setRemoteUsers] = useState({}); // Store remote users
  const [error, setError] = useState(null); // Error state for debugging
  const localVideoRef = useRef(null); // Ref for local video element
  const remoteVideoRefs = useRef({}); // Refs for remote video elements
  const navigate = useNavigate(); // Navigation hook

  // Initialize Agora client
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  // Effect to handle Agora events
  useEffect(() => {
    // Handle remote user publishing a stream
    client.on('user-published', async (user, mediaType) => {
      try {
        await client.subscribe(user, mediaType);
        console.log('User subscribed:', user.uid, mediaType);

        if (mediaType === 'video') {
          setRemoteUsers((prev) => ({
            ...prev,
            [user.uid]: user,
          }));

          // Play remote video if the ref is available
          if (remoteVideoRefs.current[user.uid]) {
            user.videoTrack.play(remoteVideoRefs.current[user.uid]);
          } else {
            console.warn(`Video element for UID ${user.uid} not available`);
          }
        }

        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      } catch (err) {
        console.error('Error subscribing to user:', err);
        setError(err.message);
      }
    });

    // Handle remote user unpublishing (leaving)
    client.on('user-unpublished', (user) => {
      setRemoteUsers((prev) => {
        const newUsers = { ...prev };
        delete newUsers[user.uid];
        return newUsers;
      });

      // Remove remote video container
      const videoContainer = document.getElementById(`user-container-${user.uid}`);
      if (videoContainer) videoContainer.remove();
    });

    // Handle client errors
    client.on('error', (err) => {
      console.error('Agora client error:', err);
      setError(err.message || 'An error occurred with AgoraRTC');
    });

    // Cleanup on component unmount
    return () => {
      leaveStream();
      client.removeAllListeners();
    };
  }, [client]);

  // Join the stream
  const joinStream = async () => {
    try {
      console.log('Joining channel:', CHANNEL);
      const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);
      console.log('Joined with UID:', uid);

      // Create and set local tracks
      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTracks([microphoneTrack, cameraTrack]);

      // Play local video if ref exists
      if (localVideoRef.current) {
        cameraTrack.play(localVideoRef.current);
      } else {
        console.warn('Local video element not available');
        throw new Error('Local video element not found');
      }

      await client.publish([microphoneTrack, cameraTrack]);
      setIsJoined(true);
    } catch (error) {
      console.error('Error joining stream:', error);
      setError(error.message || 'Failed to join stream');
    }
  };

  // Leave the stream
  const leaveStream = async () => {
    if (localTracks.length > 0) {
      localTracks.forEach((track) => {
        track.stop();
        track.close();
      });
    }

    await client.leave();
    setIsJoined(false);
    setLocalTracks([]);
    setRemoteUsers({});
    setError(null);

    // Clear video streams container
    const videoStreams = document.getElementById('video-streams');
    if (videoStreams) videoStreams.innerHTML = '';
  };

  // Toggle microphone
  const toggleMic = async () => {
    if (localTracks[0]) {
      const isMuted = localTracks[0].muted;
      await localTracks[0].setMuted(!isMuted);
    }
  };

  // Toggle camera
  const toggleCamera = async () => {
    if (localTracks[1]) {
      const isMuted = localTracks[1].muted;
      await localTracks[1].setMuted(!isMuted);
    }
  };

  // Error display
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => setError(null)}>Try Again</button>
      </div>
    );
  }

  // Main render
  return (
    <div className="video-stream">
      <button
        id="join-btn"
        onClick={joinStream}
        style={{ display: isJoined ? 'none' : 'block' }}
      >
        Join Stream
      </button>
      <div id="video-streams" className="video-streams">
        {isJoined && (
          <div className="video-container" id="user-container-local">
            <div
              className="video-player"
              ref={localVideoRef}
              style={{ width: '320px', height: '240px', background: '#000' }}
            />
          </div>
        )}
        {Object.values(remoteUsers).map((user) => (
          <div
            key={user.uid}
            className="video-container"
            id={`user-container-${user.uid}`}
          >
            <div
              className="video-player"
              ref={(el) => (remoteVideoRefs.current[user.uid] = el)}
              style={{ width: '320px', height: '240px', background: '#000', margin: '10px' }}
            />
          </div>
        ))}
      </div>
      <h1 id="title" style={{ display: isJoined ? 'block' : 'none' }}>
        Meeting Room
      </h1>
      <div id="stream-controls" style={{ display: isJoined ? 'flex' : 'none' }}>
        <button id="leave-btn" onClick={leaveStream}>Leave Stream</button>
        <button id="mic-btn" onClick={toggleMic}>
          {localTracks[0]?.muted ? 'Mic Off' : 'Mic On'}
        </button>
        <button id="camera-btn" onClick={toggleCamera}>
          {localTracks[1]?.muted ? 'Camera Off' : 'Camera On'}
        </button>
      </div>
    </div>
  );
}

// MajorPage Component (Fixed undefined variables)
function MajorPage() {
  const [roomButtons, setRoomButtons] = useState([]); // State for room buttons
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(false); // State for loading
  const buttons = []; // Local variable (could be replaced with state if dynamic)

  // Example logic (replace with your actual implementation)
  useEffect(() => {
    // Simulate fetching room data
    setLoading(true);
    try {
      // Add your logic here (e.g., API call)
      setRoomButtons(['Room 1', 'Room 2']); // Example data
    } catch (err) {
      setError('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <h1>Major Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {roomButtons.map((room, index) => (
          <button key={index}>{room}</button>
        ))}
      </div>
    </div>
  );
}

// App Component with Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/video-stream" element={<VideoStream />} />
        <Route path="/major" element={<MajorPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;