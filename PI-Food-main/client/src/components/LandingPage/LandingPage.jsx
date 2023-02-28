import React from "react";
import { Link } from "react-router-dom";
import landingVideo from "./videoLanding/video.mp4"

import "./LandingPage.css"


export default function LandingPage() {
    return (
        <div className="containerImg">
            <div className="containerVideoLanding">
                <video className="videoLandingpagee" src={landingVideo} autoPlay lopp muted />
                <div className="capa"> </div>
                <div className="containerWelcomeyH2" >
                    <h1 className="h1Wel">WELCOME TO HENRY FOOD </h1>
                    <Link to='/home'>
                        <button className="ButtonHOME">Home</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}