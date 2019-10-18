const RemoteURL = "http://localhost:3001/api"

/*
let AccessToken = localStorage
fetch(`${RemoteURL}/${db}`, {
    headers: {
      Authorization: "`${AccessToken}`"
    }
  })
*/

export default {
    getOne: async (id, db) => {
        const results = await fetch(`${RemoteURL}/${db}/${id}`)
		return await results.json()
    },
    getAll: async (db) => {
        const results = await fetch(`${RemoteURL}/${db}`)
		return await results.json()
    },
    delete: (id, db) => {
        return fetch(`${RemoteURL}/${db}/${id}`, {
            method: "DELETE"
        })
    },
    add: async (db, newObject) => {
        const results = await fetch(`${RemoteURL}/${db}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newObject)
		})
		return await results.json()
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
    }
}