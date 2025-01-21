document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const responseElement = document.getElementById("response");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form from submitting normally

        // Get input values
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();

        // Validate inputs
        if (!name || !phone) {
            responseElement.textContent = "Please fill out all fields.";
            responseElement.style.color = "red";
            return;
        }

        try {
            // Use your actual SheetDB API URL here
            const apiUrl = process.env.API_URL;
            // Make the POST request
            const result = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ data: [{ name, phone }] }) // Format required by SheetDB
            });

            if (result.ok) {
                responseElement.textContent = "Registration successful!";
                responseElement.style.color = "green";
                form.reset(); // Clear the form after success
            } else {
                const errorData = await result.json();
                console.error("Error details:", errorData);
                responseElement.textContent = "Failed to register. Please try again.";
                responseElement.style.color = "red";
            }
        } catch (error) {
            console.error("Error connecting to the server:", error);
            responseElement.textContent = "Error connecting to the server.";
            responseElement.style.color = "red";
        }
    });
});
