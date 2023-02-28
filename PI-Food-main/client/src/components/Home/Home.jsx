import React, { Fragment } from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets, filterDiets, filterHealthScore, filterAlphabetical, filterCreated } from "../../Redux/actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import Nav from "../Nav/Nav";
import state from "./Home.css"
import imagemenu from "../Nav/imagemenu/postMesa de trabajo 1-original.png"
import videomenu from "./videoHome/production ID_4474373 (1).mp4"

export default function Home() {
    const [order, setOrder] = useState(" ");
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    console.log("ALL RECIPE", allRecipes)
    const diets = useSelector((state) => state.diets);
    console.log("DIETS", diets);
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage //12
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage // 0
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
    }, [dispatch]);

    function handleFilterDiets(e) {
        e.preventDefault();
        dispatch(filterDiets(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterHealthScore(e) {
        e.preventDefault();
        dispatch(filterHealthScore(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleFilterAlphabetical(e) {
        e.preventDefault();
        dispatch(filterAlphabetical(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)

    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
    }


    return (
        <div className="container">

            <Nav />

            <div className="containervideoHome">
                <video src={videomenu} autoPlay loop muted />
                <div className="containerImagenYText">
                    <img className="logoimg" src={imagemenu} />
                </div>
                <div className="containerTitleYText">
                    <h1 className="titleFood">FOOD HENRY</h1>
                    <h2 className="parrafoFood">Food Henry es una applicacion que te brinda salud y dedicacion.
                        Es verdad que comer es una necesidad, pero comer con inteligencia es un arte. </h2>
                </div>
            </div>

            <div >

                <div className="Allfilters">
                    <select className="filterAllFilters" onChange={e => handleFilterDiets(e)} >
                        <option value="All">All Diets</option>
                        <option value="dairy free">Dairy Free</option>
                        <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="whole 30">Whole 30</option>
                        <option value="primal">Primal</option>
                        <option value="pescatarian">pescatarian</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="fodmap friendly">Fodmap Friendly</option>
                        <option value="gluten free">Gluten Free</option>
                        {/*   {
                            diets?.map(diet => (
                                <option value={diet.name} key={diet.name}>{diet.name}</option>
                            ))
                        } */}
                    </select>

                    <select className="filterAllFilters" onChange={e => handleFilterHealthScore(e)}>
                        <option value="n">Health Score</option>
                        <option value="less">- / +</option>
                        <option value="more">+ / -</option>
                    </select>
                    <select className="filterAllFilters" onChange={e => handleFilterAlphabetical(e)}>
                        <option value="b">Alphabetical</option>
                        <option value="asc">A - Z</option>
                        <option value="des">Z - A</option>
                    </select>
                    <select className="filterAllFilters" onChange={e => handleFilterCreated(e)}>
                        <option value="n">Source</option>
                        <option value="all">Api</option>
                        <option value="created">Created</option>
                    </select>
                </div>

                <div>
                    <Paginado
                        recipesPerPage={recipesPerPage}
                        allRecipes={allRecipes.length}
                        paginado={paginado}
                    />
                    {currentRecipes?.map(el => {
                        return (
                            <Fragment key={el.id}>
                                <Card
                                    id={el.id}
                                    title={el?.title}
                                    diets={el.diets ? el.diets : el.typeDiets}
                                    image={el.image}
                                    healthScore={el.healthScore}
                                    dishTypes={el.dishTypes}
                                />
                            </Fragment>
                        );
                    })
                    }
                </div>
            </div>
        </div>
    )

}
