const RemoteURL = "http://localhost:3001/api";

const accessToken = sessionStorage.getItem("AccessToken") || localStorage.getItem("AccessToken");
const userId = sessionStorage.getItem("userId") || localStorage.getItem("userId");


//{"where":{"userId":"1"}}

export default {
    //generic methods
    getOne: (id, db) => {
        return fetch(`${RemoteURL}/${db}/${id}?access_token=${accessToken}`)
		.then(results =>  results.json())
    },
    getAll: (db) => {
        return fetch(`${RemoteURL}/${db}?access_token=${accessToken}`)
		.then(results =>  results.json())
    },
    delete: (id, db) => {
        return fetch(`${RemoteURL}/${db}/${id}`, {
            method: "DELETE"
        })
    },
    add: (db, newObject) => {
        return fetch(`${RemoteURL}/${db}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newObject)
		})
		.then(results =>  results.json())
    },
    edit: (db, newObject, id) => {
        return fetch(`${RemoteURL}/${db}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        })
    },
    //user-specific methods
    login: (loginObject) => {
        return fetch(`${RemoteURL}/stitchers/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginObject)
        })
        .then(results => results.json())
    },
    logout: () => {
        return fetch(`${RemoteURL}/stitchers/logout?access_token=${accessToken}`, {
            method: "POST"
        })
    },
    getByUserId: (db) => {
        return fetch(`${RemoteURL}/${db}?filter=[where][userId]=${userId}&access_token=${accessToken}`)
        .then(results => results.json())
    },
    //expanded methods
    getWithDetails: (db) => {
        return fetch(`${RemoteURL}/${db}?filter[include]=type&filter[include]=company&access_token=${accessToken}`)
        .then(results => results.json())
    }
}