const BASE_URL = "http://localhost/smp_backend/api";


// ==========================
// GET PARKING SLOTS
// ==========================
export async function getParkingSlots() {

    const response = await fetch(
        `${BASE_URL}/parking-slots`
    );

    return await response.json();
}



// ==========================
// LOGIN USER
// ==========================
export async function loginUser(userData) {

    const response = await fetch(
        `${BASE_URL}/login`,
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)
        }
    );

    return await response.json();
}



// ==========================
// REGISTER USER
// ==========================
export async function registerUser(userData) {

    const response = await fetch(
        `${BASE_URL}/register`,
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)
        }
    );

    return await response.json();
}



// ==========================
// GET USER PROFILE
// ==========================
export async function getProfile() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/users/profile`,
        {

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();
}



// ==========================
// UPDATE USER PROFILE
// ==========================
export async function updateProfile(userData) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/users/profile`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(userData)
        }
    );

    return await response.json();
}