import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./RecipeCreated.css"


export default function CreatedRecipe() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets)
    const [error, setError] = useState({});

    const [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: "",
        stepByStep: "",
        diets: [],
    })



    function validateTitle(input) {
        let error = {};
        if (!input.title) {
            error.title = "Este campo es obligatorio";
        } else if (!/^[a-zA-ZÁ-ÿ/s]/.test(input.title)) {
            error.title = "El title solo puede contener letras"
        } if (input.healthScore) {
            console.log(input.healthScore)
            if (input.healthScore < 1 || input.healthScore > 100) {
                error.healthScore = "Solo acepta rango de 1 a 100"
            }

        }
        return error;
    }



    function handleChange(e) {
        setError(validateTitle({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSummit(e) {
        e.preventDefault();
        if (Object.keys(error).length > 0) {
            return alert("Faltan los campos obligatorios")
        }
        dispatch(postRecipe(input))
        alert("Recipe Created")
        setInput({
            title: "",
            summary: "",
            healthScore: "",
            stepByStep: "",
            diets: [],
        })
        history.push("/home")
    }

    function handleSelect(e) {
        if (!input.diets.includes(e.target.value)) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }

    }

    function handleDelete(e) {
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== e)
        })
    }
    useEffect(() => {
        dispatch(getDiets())
    }, [])

    return (
        <div className="containerForm">
            <Link to="/home">
                <div className="containerbutton">
                    <button className="buttonback">Back</button>
                </div>
            </Link>
            <div>
                <h2 className="header">CREATE YOUT RECIPE</h2>
            </div>
            <div className="formContainer">

                <div>

                    <form onSubmit={(e) => handleSummit(e)}>
                        <div className="formdiv">
                            <h2 className="tituloInput">Title</h2>
                            <input
                                type="text"
                                value={input.title}
                                name="title"
                                onChange={(e) => handleChange(e)}
                            />
                            {error.title && (
                                <p>{error.title}</p>
                            )}
                        </div>
                        <div className="formdiv">
                            <h2 className="tituloInput">Summary</h2>
                            <input
                                type="text"
                                value={input.summary}
                                name="summary"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="formdiv">
                            <h2 className="tituloInput">Health Score</h2>
                            <input
                                type="number"
                                value={input.healthScore}
                                name="healthScore"
                                onChange={(e) => handleChange(e)}
                            />
                            {error.healthScore && (
                                <p>{error.healthScore}</p>
                            )}
                        </div>
                        <div className="formdiv">
                            <h2 className="tituloInput">Step By Step</h2>
                            <input
                                type="text"
                                value={input.stepByStep}
                                name="stepByStep"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <select className="filterDietsForm" onChange={(e) => handleSelect(e)}>
                                {diets.map((d) => (
                                    <option value={d.name}>{d.name}</option>
                                ))}
                            </select>
                            <ul>
                                <li>
                                    {input.diets.map(el => el + "-")}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <button className="buttoncreatedForm" type="submit">Created Recipe</button>
                        </div>
                    </form>
                    <div>
                        {input.diets.map(el =>
                            <div className="divType">
                                <p>{el}</p>
                                <button className="botonX" onClick={() => handleDelete(el)}>X</button>
                            </div>
                        )}

                    </div>
                </div>
            </div>

        </div>
    )
}
