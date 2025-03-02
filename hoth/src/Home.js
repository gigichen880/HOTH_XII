import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import './Home.css';

export default function Home()
{
    const location = useLocation();
    const username = location.state?.username || "Guest";
    
    console.log()
    return (
        <div className='Home'>
            <p>Hello World!!!!!</p>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    )
}

