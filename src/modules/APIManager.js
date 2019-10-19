const RemoteURL = "http://localhost:3001/api";

const accessToken = sessionStorage.getItem("AccessToken") || localStorage.getItem("AccessToken");
const userId = sessionStorage.getItem("userId") || localStorage.getItem("userId");


//{"where":{"userId":"1"}}

export default {
    getOne: (id, db) => {
        return fetch(`${RemoteURL}/${db}/${id}`)
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
    getByUserId: (db) => {
        return fetch(`${RemoteURL}/${db}?filter=%7B%22where%22%3A%7B%22userId%22%3A%22${userId}%22%7D%7D&access_token=${accessToken}`)
        .then(results => results.json())
    }
}