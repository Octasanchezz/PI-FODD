import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../Redux/actions";
import "./SearchBar.css";
import imagenSearch from "./imagenSearch/depositphotos_78297532-stock-illustration-search-flat-orange-and-gray.png"

export default function SearchBar() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    function handleInput(e) {
        e.preventDefault();
        setTitle(e.target.value)
        console.log(title)
    }

    function handleSummit(e) {
        e.preventDefault();
        dispatch(getNameRecipes(title))
    }
    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder="Recipe..."
                    onChange={(e) => handleInput(e)}
                />
                <span>
                    <img className="imageBusca" src={imagenSearch}  width="30" onClick={(e) => handleSummit(e)}/>
                </span>
            </div>
        </div>
    )

}