(function () {

    const chat = document.createElement("div");

    chat.id = "aiChat";

    chat.innerHTML = `
        <div class="ai-chat-title">
            <span>AI Music Psychology</span>
            <span class="ai-status">LOCAL AI</span>
        </div>

        <div id="aiMessages" class="ai-messages">
            <div class="ai-message ai">
                Ask me about the current emotional position,
                music theory, psychology, or composition.
            </div>
        </div>

        <div class="ai-input-row">

            <input
                id="aiInput"
                type="text"
                placeholder="Ask about this emotional position..."
            >

            <button id="aiSend">
                Send
            </button>

        </div>
    `;

    const style = document.createElement("style");

    style.textContent = `

        #aiChat {
            margin-top: 24px;
            border: 1px solid rgba(255,255,255,.12);
            border-radius: 16px;
            background: rgba(255,255,255,.04);
            overflow: hidden;
            width: 100%;
        }

        .ai-chat-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 16px;
            border-bottom: 1px solid rgba(255,255,255,.1);
            font-weight: 600;
        }

        .ai-status {
            font-size: 10px;
            letter-spacing: 1px;
            opacity: .55;
        }

        .ai-messages {
            height: 230px;
            overflow-y: auto;
            padding: 14px;
        }

        .ai-message {
            padding: 10px 12px;
            margin-bottom: 10px;
            border-radius: 10px;
            line-height: 1.5;
            white-space: pre-wrap;
            font-size: 14px;
        }

        .ai-message.user {
            background: rgba(255,255,255,.08);
            margin-left: 30px;
        }

        .ai-message.ai {
            background: rgba(100,150,255,.10);
            margin-right: 20px;
        }

        .ai-input-row {
            display: flex;
            gap: 8px;
            padding: 12px;
            border-top: 1px solid rgba(255,255,255,.1);
        }

        #aiInput {
            flex: 1;
            background: rgba(0,0,0,.25);
            color: white;
            border: 1px solid rgba(255,255,255,.12);
            border-radius: 9px;
            padding: 10px 12px;
            outline: none;
        }

        #aiSend {
            border: none;
            border-radius: 9px;
            padding: 10px 16px;
            cursor: pointer;
        }

    `;

    document.head.appendChild(style);

    const map = document.querySelector("svg");

    if (map && map.parentElement) {
        map.parentElement.appendChild(chat);
    } else {
        document.body.appendChild(chat);
    }

    const input = document.getElementById("aiInput");
    const send = document.getElementById("aiSend");
    const messages = document.getElementById("aiMessages");

    let history = [];
    let currentAIMessage = null;
    let currentAIText = "";

    function addMessage(text, type) {

        const message = document.createElement("div");

        message.className =
            "ai-message " + type;

        message.textContent = text;

        messages.appendChild(message);

        messages.scrollTop =
            messages.scrollHeight;

        return message;
    }

    window.electronAPI.onAIStream(function (chunk) {

        if (!currentAIMessage) {
            currentAIMessage =
                addMessage("", "ai");
        }

        currentAIText += chunk;

        currentAIMessage.textContent =
            currentAIText;

        messages.scrollTop =
            messages.scrollHeight;

    });

    window.electronAPI.onAIStreamDone(function () {

        if (currentAIMessage && currentAIText) {

            history.push({
                user: currentAIMessage.dataset.question || "",
                ai: currentAIText
            });

        }

        currentAIMessage = null;
        currentAIText = "";

        send.disabled = false;
        input.focus();

    });

    async function askAI() {

        const question =
            input.value.trim();

        if (!question || send.disabled) return;

        addMessage(question, "user");

        input.value = "";

        send.disabled = true;

        currentAIMessage = null;
        currentAIText = "";

        try {

            const mixture =
                typeof calculateMixture === "function"
                    ? calculateMixture()
                    : {};

            const response =
                await window.electronAPI.chat({
                    moods: mixture,
                    message: question,
                    history: history
                });

            if (response.error) {

                addMessage(
                    "AI error: " + response.error,
                    "ai"
                );

                send.disabled = false;
                input.focus();

            }

        } catch (error) {

            addMessage(
                "I couldn't connect to the local AI. Make sure Ollama is running.",
                "ai"
            );

            send.disabled = false;
            input.focus();

        }

    }

    send.addEventListener(
        "click",
        askAI
    );

    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                askAI();
            }

        }
    );

})();
