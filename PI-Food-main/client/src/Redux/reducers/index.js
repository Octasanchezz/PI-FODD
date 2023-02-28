const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_RECIPES":
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            }
        case "GET_DIETS":
            return {
                ...state,
                diets: action.payload
            }
        case "GET_NAME_RECIPES":
            return {
                ...state,
                recipes: action.payload
            }
        case "POST_RECIPES":
            return {
                ...state
            }
        case "FILTER_ALPHABETICAL":
            let sortedArr = action.payload === "asc" ?
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (b.title > a.title) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: sortedArr
            }
        case "FILTER_DIETS":
            const allRecipes = state.allRecipes
            console.log("ALL RECIPES..", allRecipes)
            const statusFiltered = action.payload === "All" ? allRecipes : allRecipes.filter(e => e.diets ? e.diets.includes(action.payload) : e.typeDiets[0].name.includes(action.payload));
            return {
                ...state,
                recipes: statusFiltered.length > 0 ? statusFiltered : allRecipes
            }
        case "FILTER_HEALTH_SCORE":
            let sortedArray = action.payload === "less" ?
                state.allRecipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return 1;
                    }
                    if (b.healthScore > a.healthScore) {
                        return -1;
                    }
                    return 0;
                }) :
                state.allRecipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return -1;
                    }
                    if (b.healthScore > a.healthScore) {
                        return 1;
                    }
                    return 0
                })
            return {
                ...state,
                recipes: sortedArray
            }
        case "FILTER_CREATED":
            const createdFilter = action.payload === "created" ? state.allRecipes.filter(el => el.createdInDb) :
                state.allRecipes.filter(e => !e.createdInDb);
            return {
                ...state,
                recipes: createdFilter
            }
        default:
            return state;
    }
}

export default rootReducer;