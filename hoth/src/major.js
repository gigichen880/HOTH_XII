import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from "axios"

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

    const major = "African_American_Studies"

    return (
        <div className='Major'>
            <p>{greeting}</p>
            <p>CS Math Physics Bio</p>
            <button class='major' onClick={() => {majorChoose(username, major)}}>African American Studies</button>
        </div>
    )
}

function majorChoose(username, major)
{
    axios.post("http://localhost:5000/major",{
        username, major
    })
}



