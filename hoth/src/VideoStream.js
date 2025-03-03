
import React, { useState, useEffect } from "react";
import { useParams, useLocation, } from "react-router-dom";
import "./VideoStream.css"

export default function VideoStream()
{
    return(
        <div>
            <button id="join-btn">Join Stream</button>
            <div id="stream-wrapper">
                <div id="video-streams"></div>

                <h1 id="title" style="display: none">Meeting Room</h1>

                <div id="stream-controls">
                    <button id="leave-btn">Leave Stream</button>
                    <button id="mic-btn">Mic On</button>
                    <button id="camera-btn">Camera on</button>
                </div>
            </div>
            <script src="./video_stream/AgoraRTC_N-4.23.1.js"></script>
            <script src="./video_stream/main.js"></script>
        </div>

    );
}

/*
export default function VideoStream()
{
    // Agora App Credentials
    const APP_ID = "8e8d14e1af63438f8589af74b383d236";
    const TOKEN =
        "007eJxTYIi/fniRkvpTZf4T1044f2ONV96/8XLNpMzqs/HNC/0aVGUUGCxSLVIMTVINE9PMjE2MLdIsTC0sE9PMTZKMLYxTjIzNZlw+kt4QyMjQ4GjMzMgAgSA+C0NuYmYeAwMAXQMfTA==";
    const CHANNEL = "main";

    // Create and initialize Agora client instance
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    let localTracks = []; // Stores local audio and video tracks
    let remoteUsers = {}; // Stores remote users in the session

    // Function to join the channel and display local video
    let joinAndDisplayLocalStream = async () => {
        client.on("user-published", handleUserJoined); // Listen for new users join event
        client.on("user-left", handleUserLeft); // Listen for users leaving

        // Join channel with a unique ID
        let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);
        // Create microphone and camera tracks
        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

        // Display local video stream
        let player = `<div class="video-container" id="user-container-${UID}">
                            <div class="video-player" id="user-${UID}"></div>
                    </div>`;
        document
            .getElementById("video-streams")
            .insertAdjacentHTML("beforeend", player);

        localTracks[1].play(`user-${UID}`); // Play local video
        await client.publish([localTracks[0], localTracks[1]]); // Publish local tracks
    };

    // Function to join the stream when the button is clicked
    let joinStream = async () => {
        await joinAndDisplayLocalStream();
        document.getElementById("join-btn").style.display = "none"; // Hide join button
        document.getElementById("stream-controls").style.display = "flex"; // Show controls
        document.getElementById("title").style.display = "block"; // Show title when joining
    };

    // Handle when a remote user joins
    let handleUserJoined = async (user, mediaType) => {
        remoteUsers[user.uid] = user; // Add user to the remoteUsers object
        await client.subscribe(user, mediaType); // Subscribe to the user's stream

        if (mediaType === "video") {
            let player = document.getElementById(`user-container-${user.uid}`);
            if (player != null) {
                player.remove(); // Remove existing player if rejoining
            }

            // Create video container for remote user
            player = `<div class="video-container" id="user-container-${user.uid}">
                            <div class="video-player" id="user-${user.uid}"></div>
                    </div>`;
            document
                .getElementById("video-streams")
                .insertAdjacentHTML("beforeend", player);

            user.videoTrack.play(`user-${user.uid}`); // Play remote video
        }

        if (mediaType === "audio") {
            user.audioTrack.play(); // Play remote audio
        }
    };

    // Handle when a remote user leaves
    let handleUserLeft = async (user) => {
        delete remoteUsers[user.uid]; // Remove user from remoteUsers object
        document.getElementById(`user-container-${user.uid}`).remove(); // Remove video container
    };

    // Function to leave the stream and remove local video
    let leaveAndRemoveLocalStream = async () => {
        for (let i = 0; i < localTracks.length; i++) {
            localTracks[i].stop(); // Stop each local track
            localTracks[i].close(); // Release each local track
        }

        await client.leave(); // Leave the Agora channel
        document.getElementById("join-btn").style.display = "block"; // Show join button
        document.getElementById("stream-controls").style.display = "none"; // Hide controls
        document.getElementById("video-streams").innerHTML = ""; // Clear video display
        document.getElementById("title").style.display = "none"; // Hide title when leaving
    };

    // Function to toggle microphone on/off
    let toggleMic = async (e) => {
        if (localTracks[0].muted) {
            await localTracks[0].setMuted(false);
            e.target.innerText = "Mic on";
            e.target.style.backgroundColor = "cadetblue";
        } else {
            await localTracks[0].setMuted(true);
            e.target.innerText = "Mic off";
            e.target.style.backgroundColor = "#EE4B2B";
        }
    };

    // Function to toggle camera on/off
    let toggleCamera = async (e) => {
        if (localTracks[1].muted) {
            await localTracks[1].setMuted(false);
            e.target.innerText = "Camera on";
            e.target.style.backgroundColor = "cadetblue";
        } else {
            await localTracks[1].setMuted(true);
            e.target.innerText = "Camera off";
            e.target.style.backgroundColor = "#EE4B2B";
        }
    };

    // Event listeners for buttons
    document.getElementById("join-btn").addEventListener("click", joinStream);
    document
        .getElementById("leave-btn")
        .addEventListener("click", leaveAndRemoveLocalStream);
    document.getElementById("mic-btn").addEventListener("click", toggleMic);
    document.getElementById("camera-btn").addEventListener("click", toggleCamera);


    return (
        <div>
            <script src='./video_stream/AgoraRTC_N-4.23.1.js'></script>
            <button id="join-btn">Join Stream</button>
            <div id="stream-wrapper">
                <div id="video-streams"></div>

                <h1 id="title" style="display: none">Meeting Room</h1>

                <div id="stream-controls">
                    <button id="leave-btn">Leave Stream</button>
                    <button id="mic-btn">Mic On</button>
                    <button id="camera-btn">Camera on</button>
                </div>
            </div>
        </div>
    )
}

*/