const API_URL = "http://localhost:5000/api/ai/chat";

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const voiceButton = document.getElementById("voiceButton");
const voiceStatus = document.getElementById("voiceStatus");

const COURSE = "Bamboo Flower Vase";
const STEP = "Outer weaving";


function addUserMessage(message) {

    const row = document.createElement("div");

    row.className = "user-row";

    row.innerHTML = `
        <div class="message user-message">
            ${escapeHTML(message)}
        </div>
    `;

    chatMessages.appendChild(row);

    scrollToBottom();
}


function addAssistantMessage(message) {

    const row = document.createElement("div");

    row.className = "assistant-row";

    row.innerHTML = `
        <span class="message-avatar">S</span>

        <div class="message assistant-message">
            ${formatResponse(message)}
        </div>
    `;

    chatMessages.appendChild(row);

    scrollToBottom();
}


function addLoadingMessage() {

    const row = document.createElement("div");

    row.id = "aiLoading";

    row.className = "assistant-row";

    row.innerHTML = `
        <span class="message-avatar">S</span>

        <div class="message assistant-message">
            Silpam Guru ভাবছে...
        </div>
    `;

    chatMessages.appendChild(row);

    scrollToBottom();
}


function removeLoadingMessage() {

    const loading = document.getElementById("aiLoading");

    if (loading) {
        loading.remove();
    }
}


async function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    addUserMessage(message);

    messageInput.value = "";

    sendButton.disabled = true;

    addLoadingMessage();

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message,

                course: COURSE,

                step: STEP,

                language: "bn"

            })

        });


        const data = await response.json();

        removeLoadingMessage();


        if (!response.ok || !data.success) {

            throw new Error(
                data.error ||
                data.message ||
                "AI request failed"
            );

        }


        addAssistantMessage(data.reply);

    }

    catch (error) {

        removeLoadingMessage();

        console.error("Silpam AI:", error);

        addAssistantMessage(
            "দুঃখিত, এই মুহূর্তে আমি উত্তর দিতে পারছি না। একটু পরে আবার চেষ্টা করুন।"
        );

    }

    finally {

        sendButton.disabled = false;

        messageInput.focus();

    }
}


sendButton.addEventListener("click", sendMessage);


messageInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        sendMessage();
    }

});


function scrollToBottom() {

    const chat = document.querySelector(".chat-container");

    chat.scrollTop = chat.scrollHeight;

}


function formatResponse(text) {

    return escapeHTML(text)
        .replace(/\n/g, "<br>");

}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}