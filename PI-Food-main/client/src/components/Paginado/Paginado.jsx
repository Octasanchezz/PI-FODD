import React from "react";
import "./Paginado.css"

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumber.push(i)
    }
    return (
        <nav >
            <ul className="paginado">
                {pageNumber && pageNumber.map(number => (
                    <a key={number}>
                        <button className="button" onClick={() => paginado(number)}>{number}</button>
                    </a>
                ))}
            </ul>
        </nav>
    )
}