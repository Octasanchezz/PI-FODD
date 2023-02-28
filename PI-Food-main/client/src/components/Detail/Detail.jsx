import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/actions";
import { useEffect } from "react";
import "./Detail.css"

export default function Detail(props) {
    const dispatch = useDispatch();
    const myRecipe = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [])

    return (
        <div className="containerdetail">
            <div>
                {
                    Object.keys(myRecipe).length > 0 ?
                        <div>
                            <div className="containerNyI">
                                <span className="titleDetail">{myRecipe.title}</span>
                                <img
                                    className="imagencontainer"
                                    src={myRecipe.image}
                                />
                            </div>
                            <div className="containerDetailHealth">
                                <h2 className="titlePropHe">Health Score</h2>
                                <div className="healthScore">
                                    <h2 className="h">{myRecipe.healthScore}%</h2>
                                </div>
                            </div>
                            <div className="containerProps">
                                <h2 className="titlePropsSu">Summary</h2>
                                <div className="summaryDetail">
                                    <p>{JSON.stringify(myRecipe.summary?.replace(/(<([^>]+)>)/ig, ""))}</p>
                                </div>
                                <div>
                                    <h2 className="titleProps">Step By Step</h2>
                                    <div className="stepDetail">
                                        <span>{myRecipe.stepByStep}</span>
                                    </div>

                                </div>
                                <div>
                                    <h2 className="titlePropsDET">Diets</h2>
                                    <div className="dietsDetail">
                                        {myRecipe.createdInDb ? myRecipe.diets + "" :
                                            myRecipe.diets.map(el => <h4 className="dietsD"><li>{el}</li></h4>)}
                                    </div>

                                </div>
                            </div>

                        </div> :
                        <div>
                            <p>Loading...</p>
                            <img />
                        </div>
                }
                <div>
                    <Link to="/home">
                        <button className="botonback"  >Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}