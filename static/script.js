document.getElementById("chat-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value.trim();

    if (userMessage) {
        // Append user message to the chat
        appendMessage(userMessage, "user-message");

        // Clear input
        userInput.value = "";

        try {
            // Send user message to the backend
            const response = await fetch("http://127.0.0.1:5000/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input: userMessage }),
            });

            const data = await response.json();

            // Append bot response to the chat
            appendMessage(data.bot_response, "bot-message");
        } catch (error) {
            console.error("Error:", error);
            appendMessage("Sorry, something went wrong.", "bot-message");
        }
    }
});

function appendMessage(message, className) {
    const chatBox = document.querySelector(".chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
