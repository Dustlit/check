document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const responseElement = document.getElementById("response");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;

        try {
            const result = await fetch("YOUR_BACKEND_API_URL", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, phone })
            });

            if (result.ok) {
                responseElement.textContent = "Registration successful!";
                responseElement.style.color = "green";
            } else {
                responseElement.textContent = "Failed to register. Please try again.";
                responseElement.style.color = "red";
            }
        } catch (error) {
            responseElement.textContent = "Error connecting to the server.";
            responseElement.style.color = "red";
        }
    });
});
