const BASE_API_ENDPOINT = "https://api.codetabs.com/v1/proxy?quest=https://www.gamerpower.com/api"
//This will be: Games: `https://www.gamerpower.com/api"
export const API_ENDPOINTS = {
    Worth: `${BASE_API_ENDPOINT}/worth`,
    Giveaways: `${BASE_API_ENDPOINT}/giveaways`,
    Games: `https://api.codetabs.com/v1/proxy?quest=https://www.freetogame.com/api/games`,
    //This will be: Games: `https://www.freetogame.com/api/games`,

}
//on release we should remove cors proxy since they only apply when using apis on the web, on a native device the api is free from http problems thus crossing out the need for a cors proxy.
//we are only using this for debuging and previewing progress