import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios"
import parse from 'html-react-parser';

import './Home.css';

export default function Major()
{
    const location = useLocation();
    const username = location.state?.username || "Guest";
    let greeting = "Hi! " + username + "!!!";
    console.log("Test", username);

    /*
    document.querySelector('.major').onClick = (username, "African_American_Studies") => {
        majorChoose(username, "African_American_Studies");
    }
        */

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "less_clubs.txt", true);
    let allText = rawFile.responseText;
    let major_names = allText.split('\n');

    const major = "African_American_Studies"
    let buttons = [];
    /*
    for (let i = 0; i < 10; i++)
    {
        buttons.push(
            <div>
                <button onClick={() => MajorChoose(username, major_names[i])}>{major_names[i]}</button>
            </div>
        );
    }
    */
    let target = `/major/${major}`;

    return (
        <div className='Major'>
            <p>{greeting}</p>
            <p>CS Math Physics Bio</p>
            <Link to={target}>{major}</Link>
        </div>
    )
}

/*
async function MajorChoose(username, major)
{
    const navigate = useNavigate();

    const handleNavigate = () => {
        // Navigate to another route and pass state
        navigate('/receiver', {
        state: {
            userId: 123,
            message: 'Hello from Sender!',
            status: 'active'
        }
        });
    };

    await axios.post("http://localhost:5000/major",{
        username, major
    })
    .then((response) => {
        console.log("Response: ", response.data);
        navigate('/Major/major', {
            state: {
                userId: 123,
                message: 'Hello from Sender!',
                status: 'active'
            }
        })
    })
}
*/

// <button class='major' onClick={() => {majorChoose(username, major)}}>African American Studies</button>


