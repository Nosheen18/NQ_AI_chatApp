document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submit").addEventListener("click", async () => {
        const userInputElement = document.getElementById("user-input");
        const outputDiv = document.getElementById("output");

        const userInput = userInputElement.value.trim();
        if (!userInput) {
            alert("Please enter a message.");
            return;
        }

        // Display the user's message
        const userMessage = document.createElement("p");
        userMessage.textContent = `You: ${userInput}`;
        outputDiv.appendChild(userMessage);

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userInput })
            });

            const data = await response.json();
            if (data.message) {
                // Display AI's response
                const aiMessage = document.createElement("p");
                aiMessage.textContent = `AI: ${data.message}`;
                aiMessage.style.color = "blue";
                outputDiv.appendChild(aiMessage);
            } else {
                const aiMessage = document.createElement("p");
                aiMessage.textContent = "AI: Sorry, no response!";
                aiMessage.style.color = "red";
                outputDiv.appendChild(aiMessage);
            }

        } catch (error) {
            const aiMessage = document.createElement("p");
            aiMessage.textContent = "AI: Sorry, something went wrong!";
            aiMessage.style.color = "red";
            outputDiv.appendChild(aiMessage);
        }

        // Clear input and scroll to bottom
        userInputElement.value = "";
        outputDiv.scrollTop = outputDiv.scrollHeight;
    });
});
