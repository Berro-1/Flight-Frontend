// Function to close the promotion banner
function closeBanner() {
    document.getElementById('promotionBanner').style.display = 'none';
}

// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {

    // Selectors for various chatbot elements
    const chatbotToggler = document.querySelector('.chatbot-toggler');
    const closeBtn = document.querySelector('.close-btn');
    const chatbox = document.querySelector('.chatbox');
    const chatInput = document.querySelector('.chat-input textarea');
    const sendChatBtn = document.querySelector('.chat-input span');

    // Initialize variables
    let userMessage = null; // Variable to store the user's message
       // At this line 18 ushould replace ur API key for OpenAI
    const inputInitHeight = chatInput.scrollHeight; // Initial height of the input textarea

    // Function to create a chat list item
    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li"); // Create a list item element
        chatLi.classList.add("chat", `${className}`); // Add class names for styling
        const chatContent = className === "outgoing" 
            ? `<p></p>` 
            : `<span class="material-symbols-outlined">smart_toy</span><p></p>`; // Determine content based on message type
        chatLi.innerHTML = chatContent; // Set the inner HTML
        chatLi.querySelector("p").textContent = message; // Set the message text
        return chatLi; // Return the chat list item
    }

    // Function to generate a response from the API
    const generateResponse = (chatElement) => {
        const API_URL = "https://api.openai.com/v1/chat/completions"; // API URL for OpenAI
        const messageElement = chatElement.querySelector("p"); // Get the message element

        // Define the properties and message for the API request
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }]
            })
        }

        // Send POST request to API, get response, and set the response as paragraph text
        fetch(API_URL, requestOptions)
            .then(res => res.json())
            .then(data => {
                messageElement.textContent = data.choices[0].message.content.trim();
                saveChatToLocalStorage(userMessage, data.choices[0].message.content.trim());
            })
            .catch(() => {
                messageElement.classList.add("error");
                messageElement.textContent = "Oops! Something went wrong. Please try again.";
            })
            .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight)); // Scroll to the bottom of the chatbox
    }

    // Function to handle chat submission
    const handleChat = () => {
        userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
        if (!userMessage) return; // Exit if the message is empty

        // Clear the input textarea and set its height to default
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        // Append the user's message to the chatbox
        const outgoingChatLi = createChatLi(userMessage, "outgoing");
        chatbox.appendChild(outgoingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            // Display "Thinking..." message while waiting for the response
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }

    // Adjust the height of the input textarea based on its content
    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    // Handle chat submission when Enter key is pressed
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    // Handle chat submission when send button is clicked
    sendChatBtn.addEventListener("click", handleChat);

    // Close the chatbot when close button is clicked
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

    // Toggle chatbot visibility when toggler is clicked
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle('show-chatbot'));

    // Function to save chat to local storage
    const saveChatToLocalStorage = (outgoingMessage, incomingMessage) => {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.push({ type: 'outgoing', message: outgoingMessage });
        chatHistory.push({ type: 'incoming', message: incomingMessage });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    // Function to load chat from local storage
    const loadChatFromLocalStorage = () => {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.forEach(chat => {
            const chatLi = createChatLi(chat.message, chat.type);
            chatbox.appendChild(chatLi);
        });
        chatbox.scrollTo(0, chatbox.scrollHeight); // Scroll to the bottom of the chatbox
    }

    // Load chat history when the page loads
    loadChatFromLocalStorage(); 
});
