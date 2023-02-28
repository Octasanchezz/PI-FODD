import axios from "axios";

export function getRecipes() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: "GET_RECIPES",
            payload: json.data
        })
    }
}

export function getDiets() {
    return async function (dispatch) {
        var info = await axios("http://localhost:3001/diets", {

        });
        return dispatch({
            type: "GET_DIETS",
            payload: info.data
        })
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function postRecipe(payload) {
    return async function (dispatch) {
        const recipe = await axios.post("http://localhost:3001/recipes", payload)
        return {
            type: "POST_RECIPE",
            payload: recipe.data
        }
    }
}

export function getNameRecipes(title) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/recipes?name=" + title);
            return dispatch({
                type: "GET_NAME_RECIPES",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterDiets(payload) {
    return {
        type: "FILTER_DIETS",
        payload
    }
}

export function filterAlphabetical(payload) {
    return {
        type: "FILTER_ALPHABETICAL",
        payload
    }
}

export function filterHealthScore(payload) {
    return {
        type: "FILTER_HEALTH_SCORE",
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: "FILTER_CREATED",
        payload
    }
}

