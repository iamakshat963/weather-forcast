import React, { useState, useEffect } from "react";
import './Theme.css' 

const ThemeSet=()=>{
    const [theme,setTheme]=useState(localStorage.getItem("theme") || "light"); //set theme acording to preference

    useEffect(()=>{ // switching themes
        document.body.className=theme==="dark" ? "dark-theme":""; 
        localStorage.setItem("theme",theme);
    },[theme]);

    return( //theme perference buttons
        <div className="theme">
            <b>Theme:</b> 
            <button className="light-btn" onClick={()=>setTheme("light")}>Light</button> 
            <b>/</b>
            <button className="dark-btn" onClick={()=>setTheme("dark")}>Dark</button>
        </div>
    );
};

export default ThemeSet;
