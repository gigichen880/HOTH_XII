import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

export default function Major() {
    const location = useLocation();
    const username = location.state?.username || "Guest";
    let greeting = "Hi! " + username + "!!!";

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
        "Asian_Humanities",
        "Asian_Languages_and_Linguistics",
        "Asian_Religions",
        "Asian_Studies",
        "Astrophysics",
        "Atmospheric_and_Oceanic_Sciences",
        "Atmospheric_and_Oceanic_Sciences/Mathematics",
        "Biochemistry",
        "Biology",
        "Biophysics",
        "Buiness_Economics",
        "Central_and_East_European_Languages_and_Cultures",
        "Chemistry",
        "Chemistry/Materials_Science",
        "Chicana_and_Chicano_Studies",
        "Chinese",
        "Classical_Civilization",
        "Climate_Science",
        "Cognitive_Science",
        "Communication",
        "Comparative_Literature",
        "Computational_and_Systems_Biology",
        "Data_Theory",
        "Disability_Studies",
        "Earth_and_Environmental_Science",
        "Ecology,_Behavior,_and_Evolution",
        "Economics",
        "English",
        "Environmental_Science",
        "European_Language_and_Transcultural_Studies",
        "European_Languages_and_Transcultural_Studies_with_French_and_Francophone",
        "European_Languages_and_Transcultural_Studies_with_German",
        "European_Languages_and_Transcultural_Studies_with_Italian",
        "European_Languages_and_Transcultural_Studies_with_Scandinavian",
        "European_Studies",
        "Gender_Studies",
        "Geography",
        "Geography/Environmental_Studies",
        "Geology",
        "Geology/Engineering_Geology",
        "Geophysics",
        "Global_Studies",
        "Greek",
        "Greek_and_Latin",
        "History",
        "Human_Biology_and_Society",
        "International_Development_Studies",
        "Iranian_Studies",
        "Japanese",
        "Jewish_Studies",
        "Korean",
        "Labor_Studies",
        "Latin",
        "Latin_American_Studies",
        "Linguistics",
        "Linguistics_and_Anthropology",
        "Linguistics_and_Asian_Languages_and_Cultures",
        "Linguistics_and_Computer_Science",
        "Linguistics_and_English",
        "Linguistics_and_Philosophy",
        "Linguistics_and_Psychology",
        "Linguistics_and_Spanish",
        "Linguistics,_Applied",
        "Marine_Biology",
        "Mathematics",
        "Mathematics,_Applied",
        "Mathematics/Applied_Science",
        "Mathematics/Economics",
        "Mathematics,_Financial_Actuarial",
        "Mathematics_for_Teaching",
        "Mathematics_of_Computation",
        "Microbiology,_Immunology,_and_Molecular_Genetics",
        "Middle_Eastern_Studies",
        "Molecular,_Cell,_and_Developmental_Biology",
        "Neuroscience",
        "Nordic_Studies",
        "Philosophy",
        "Physics",
        "Physiological_Science",
        "Political_Science",
        "Portuguese_and_Brazilian_Studies",
        "Psychobiology",
        "Psychology",
        "Religion,_Study_of",
        "Russian_Language_and_Literature",
        "Russian_Studies",
        "Sociology",
        "Southeast_Asian_Studies",
        "Spanish",
        "Spanish_and_Community_and_Culture",
        "Spanish_and_Linguistics",
        "Spanish_and_Portuguese",
        "Statistics_and_Data_Science",
        "Individual_Field_of_Concentration",
        "Architectural_Studies",
        "Art",
        "Dance",
        "Design_|_Media_Arts",
        "World_Arts_and_Cultures",
        "Individual_Field_of_Concentration_in_the_Arts_and_Architecture",
        "Aerospace_Engineering",
        "Bioengineering",
        "Chemical_Engineering",
        "Civil_Engineering",
        "Computer_Engineering",
        "Computer_Science",
        "Computer_Science_and_Engineering",
        "Electrical_Engineering",
        "Materials_Engineering",
        "Mechanical_Engineering",
        "Ethnomusicology",
        "Global_Jazz_Studies",
        "Musicology",
        "Music_Composition",
        "Music_Education",
        "Music_Industry",
        "Music_Performance",
        "Nursing_-_Prelicensure",
        "Public_Affairs",
        "Film_and_Television",
        "Theater",
        "Individual_Field_of_Concentration_in_Theater,_Film_and_Television",
        "Education_and_Social_Transformation",
        "Public_Health",
    ];

    let buttons = [];
    let navigate = useNavigate();

    // Generate buttons for the majors dynamically
    for (let i = 0; i < major_names.length; i++) {
        let target = `/major/${major_names[i]}`;
        let name = major_names[i].split("_").join(" ");
        buttons.push(
            <div key={i} className="major-button">
                <button
                    onClick={() =>
                        navigate(target, { state: { username: username } })
                    }
                >
                    {name}
                </button>
            </div>,
        );
    }

    return (
        <div className="Major">
            <div className="greeting">{greeting}</div>
            <div className="majors-list">{buttons}</div>
        </div>
    );
}
