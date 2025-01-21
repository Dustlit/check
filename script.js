document.addEventListener("DOMContentLoaded", () => {
    const attendeesInput = document.getElementById("attendees");
    const kidsInput = document.getElementById("kids");
    const amountDisplay = document.getElementById("amount");
    const submitButton = document.getElementById("submitButton");

    const originalPrice = 500;
    const kidsPrice = 100;

    const calculateAmount = () => {
        const attendees = parseInt(attendeesInput.value) || 0;
        const kids = parseInt(kidsInput.value) || 0;
        const totalAmount = attendees * originalPrice + kids * kidsPrice;
        amountDisplay.textContent = `Total Amount: ₹${totalAmount.toFixed(2)}`;
    };

    attendeesInput.addEventListener("input", calculateAmount);
    kidsInput.addEventListener("input", calculateAmount);

    const registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const attendees = attendeesInput.value;
        const kids = kidsInput.value;
        const eventDate = document.querySelector('input[name="event_date"]:checked')?.value;

        if (!name || !phone || !attendees || !eventDate) {
            alert("Please fill in all required fields, including selecting an event date.");
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        const currentDate = new Date();
        const utcOffsetInMilliseconds = currentDate.getTimezoneOffset() * 60000;
        const istOffsetInMilliseconds = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(currentDate.getTime() + utcOffsetInMilliseconds + istOffsetInMilliseconds);

        const timestamp = istDate.toISOString();
        const submission_date = istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

        const formData = {
            name: name,
            phone: phone,
            attendees: attendees,
            kids: kids,
            event_date: eventDate,
            timestamp: timestamp,
            submission_date: submission_date
        };

        const apiUrl = process.env.REACT_APP_SHEETDB_API_URL || "https://example.com/api/default"; // Default fallback URL

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: formData })
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = "thankyou.html";
        })
        .catch(error => {
            console.error("Error submitting data to SheetDB: ", error);
            alert("An error occurred while submitting your data. Please try again.");
            submitButton.disabled = false;
            submitButton.textContent = "Submit";
        });
    });
});
