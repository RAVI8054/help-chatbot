// api.js
const API_URL = "http://localhost:5000/ask"; // backend endpoint

export async function askWorkshop(query) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        const data = await res.json();
        return data.answer || " No answer found.";
    } catch (error) {
        console.error("API error:", error);
        return " Something went wrong while fetching the answer.";
    }
}
