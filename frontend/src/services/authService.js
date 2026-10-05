import { apiRequest } from "./api";


// Login
export async function login(username, password) {

    return apiRequest("/login", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            password
        })
    });

}


// Signup
export async function signup(username, email, password) {

    return apiRequest("/signup", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            email,
            password
        })
    });

}


// Logout
export async function logout() {

    return apiRequest("/logout", {
        method: "GET"
    });

}