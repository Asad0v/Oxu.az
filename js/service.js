import { BASE_URL } from "./config.js";

async function getAllNews() {
    try {
        const res = await fetch(BASE_URL.GET)
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `) 
        }
        const data  = await  res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}
async function deleteNewsById(id) {
    try {
        const res = await fetch(`${BASE_URL.GET}/${id}`,{
            method: 'DELETE'
        })
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `) 
        }
        const data  = await  res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}
async function createNews(news) {
    try {
        const res = await fetch(`${BASE_URL.GET}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(news)
        })
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `) 
        }
        const data  = await  res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}
async function patchNews(id, like) {
    try {
        const res = await fetch(`${BASE_URL.PUT}/${id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(like)
        })
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `) 
        }
        const data  = await res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}
async function patchView(id, view) {
    try {
        const res = await fetch(`${BASE_URL.PUT}/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(view)
        })
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `) 
        }
        const data  = await res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}
async function updateNews(id, news) {
    try {
        const res = await fetch(`${BASE_URL.PUT}/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(news )
        })
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `) 
        }
        const data  = await res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export{
    getAllNews,
    deleteNewsById,
    createNews,
    patchNews,
    patchView,
    updateNews
}