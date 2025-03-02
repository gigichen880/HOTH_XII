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

    /*
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "less_clubs.txt", true);
    let allText = rawFile.responseText;
    let major_names = allText.split('\n');
    */
    let major_names = [
        "African_American_Studies",
        "African_and_Middle_Eastern_Studies",
        "American_Indian_Studies",
        "American_Literature_and_Culture",
        "Ancient_Near_East_and_Egyptology",
        "Anthropology",
        "Arabic",
        "Art_History",
        "Asian_American_Studies",
        "Asian_Humanities"
    ]

    const major = "African_American_Studies"
    let buttons = [];

    let navigate = useNavigate();
    
    for (let i = 0; i < 10; i++)
    {
        let target = `/major/${major_names[i]}`;
        let name = major_names[i].split('_');
        name = name.join(' ');
        buttons.push(
            <div>
                <button onClick={() => navigate(target, {state: {username: username}})}>{name}</button>
            </div>
        );
    }
    
    

    return (
        <div className='Major'>
            <p>{greeting}</p>
            <p>CS Math Physics Bio</p>
            {buttons}
        </div>
    )
}




