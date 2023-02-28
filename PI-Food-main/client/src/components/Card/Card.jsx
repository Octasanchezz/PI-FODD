import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ id, title, image, diets, healthScore, dishTypes }) {
    return (
        <Link to={`/home/${id}`}>
            <div className="card">
                <div className="face front">
                    {/* <div>{dishTypes?.map(e => (<h4 key={id++}>{e}</h4>))}</div>  */}
                    <img className="image" src={image ? image : "https://wallpaperaccess.com/full/2567134.jpg"} alt="img not found" />
                    <h3>{title}</h3>

                </div>
                <div className="face back">
                    <h3 className="titleCarta">{title}</h3>
                    <div className="containerDietsCard">
                        <h4 className="dietsTitle">Diets</h4>
                        <div className="dietsCard">{diets?.map(e => (<h4 key={id++}><li>{e.name ? e.name : e}</li></h4>))}</div>
                    </div>
                    <div className="containerHealthCard">
                        <h2 className="healthCard">{healthScore}</h2>
                    </div>
                    <div className="link">
                    </div>

                </div>
            </div>
        </Link>
    )
}
