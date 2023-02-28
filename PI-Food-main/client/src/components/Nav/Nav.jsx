import React from "react"
import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import "./Nav.css"

export default function Nav() {

    function handleReload(e) {
        e.preventDefault();
        /*  dispatchEvent(getPokemons()); */
        window.location.reload()
    }

    return (
        <div className="containermenu">
            <button className="buttonAll" onClick={e => handleReload(e)}> All Recipe</button>
            <SearchBar />
            <div>
                <Link to="/recipe">
                    <button className="buttonCreated" >Created Recipe</button>
                </Link>
            </div>
        </div>
    )
}