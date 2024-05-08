class mainApi {
    constructor ({baseUrl}){
        this._baseUrl = baseUrl;
    }

    _checkResponse(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getAllRecipes(){
        return fetch(`${this._baseUrl}/recipes?limit=100`, {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        })
        .then(this._checkResponse);
    }
}

export default mainApi;