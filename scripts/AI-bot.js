document.addEventListener("DOMContentLoaded", () => {
    // Get references to various elements in the DOM
    const chatbotToggler = document.querySelector('.chatbot-toggler');
    const closeBtn = document.querySelector('.close-btn');
    const chatbox = document.querySelector('.chatbox');
    const chatInput = document.querySelector('.chat-input textarea');
    const sendChatBtn = document.querySelector('#sendBTN');

    // Initialize variables
    let userMessage = null;
    const inputInitHeight = chatInput.scrollHeight;

    // Function to create a chat list item
    const createChatLi = (message, className) => {
        // Create a list item element
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);

        // Different inner HTML based on the message type
        const chatContent = className === "outgoing" 
            ? `<p></p>` 
            : `<span class="material-symbols-outlined"><i class="fas fa-robot"></i></span><p></p>`;
        chatLi.innerHTML = chatContent;

        // Set the text content of the paragraph element inside the list item
        chatLi.querySelector("p").textContent = message;
        return chatLi;
    }

    // Function to generate a response from the API
    const generateResponse = (chatElement) => {
        const API_URL = "http://localhost/api/ai/trip_planner.php"; // Your API endpoint
        const messageElement = chatElement.querySelector("p");

        // Set up the request options for the fetch call
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userMessage
            })
        };

        // Fetch response from the API
        fetch(API_URL, requestOptions)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("Response Data:", data); // Log the response data
                if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                    messageElement.textContent = data.choices[0].message.content.trim();
                } else {
                    throw new Error("Invalid response structure");
                }
            })
            .catch(error => {
                console.error("Error:", error); // Log detailed error information
                messageElement.classList.add("error");
                messageElement.textContent = "Oops! Something went wrong. Please try again.";
            })
            .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }

    // Function to handle sending and receiving chat messages
    const handleChat = () => {
        userMessage = chatInput.value.trim(); // Get and trim the user message
        if (!userMessage) return; // If message is empty, do nothing

        chatInput.value = ""; // Clear the input field
        chatInput.style.height = `${inputInitHeight}px`; // Reset the input height

        const outgoingChatLi = createChatLi(userMessage, "outgoing"); // Create outgoing chat item
        chatbox.appendChild(outgoingChatLi); // Append it to the chatbox
        chatbox.scrollTo(0, chatbox.scrollHeight); // Scroll to the bottom of the chatbox

        // Simulate thinking and generate a response
        setTimeout(() => {
            const incomingChatLi = createChatLi("Thinking...", "incoming"); // Create incoming chat item
            chatbox.appendChild(incomingChatLi); // Append it to the chatbox
            chatbox.scrollTo(0, chatbox.scrollHeight); // Scroll to the bottom of the chatbox
            generateResponse(incomingChatLi); // Generate response from the API
        }, 600); // Delay to simulate thinking
    }

    // Event listener for adjusting input height
    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`; // Reset the height
        chatInput.style.height = `${chatInput.scrollHeight}px`; // Set the height based on scroll height
    });

    // Event listener for handling Enter key press
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault(); // Prevent default behavior
            handleChat(); // Handle the chat
        }
    });

    // Event listener for send button click
    sendChatBtn.addEventListener("click", handleChat);

    // Event listener for close button click
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

    // Event listener for toggling the chatbot
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle('show-chatbot'));
});
