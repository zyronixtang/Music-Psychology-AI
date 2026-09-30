const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

async function askOllama(event, data) {

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama3.2",
            prompt: buildPrompt(data),
            stream: true,
            options: {
                num_predict: 220
            }
        })
    });

    if (!response.ok) {
        throw new Error("Ollama returned an error.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {

        const { value, done } =
            await reader.read();

        if (done) break;

        buffer +=
            decoder.decode(value, { stream: true });

        const lines =
            buffer.split("\n");

        buffer = lines.pop();

        for (const line of lines) {

            if (!line.trim()) continue;

            const chunk =
                JSON.parse(line);

            if (chunk.response) {

                event.sender.send(
                    "ai-stream",
                    chunk.response
                );

            }

            if (chunk.done) {

                event.sender.send(
                    "ai-stream-done"
                );

            }

        }
    }
}

function buildPrompt(data) {

    const moods =
        data.moods || {};

    const message =
        data.message || "";

    const history =
        data.history || [];

    return `
You are the AI assistant inside a Music Psychology research and composition laboratory.

You help the user explore the relationship between:
- music theory
- musical composition
- perception
- emotion
- psychology
- music cognition

The user's current emotional map is:

${JSON.stringify(moods, null, 2)}

Conversation history:

${JSON.stringify(history, null, 2)}

User question:

${message}

Give a clear, useful answer.

Important:
- Do not claim that a particular key, chord, scale, BPM, or instrument universally causes a specific emotion.
- Separate music-theory observations from psychological interpretations.
- When discussing psychology, distinguish established research from interpretation or hypothesis.
- Help the user experiment creatively rather than presenting musical-emotional relationships as absolute laws.
- Remember that this application is a research and composition laboratory.

Answer the user's question directly.
`;
}

function createWindow() {

    const window =
        new BrowserWindow({
            width: 1400,
            height: 900,
            minWidth: 1000,
            minHeight: 700,
            backgroundColor: "#0b0d12",

            webPreferences: {
                preload:
                    path.join(__dirname, "preload.js"),

                nodeIntegration: false,
                contextIsolation: true
            }
        });

    window.loadFile(
        path.join(
            __dirname,
            "app",
            "index.html"
        )
    );
}

ipcMain.handle(
    "ai-chat",
    async (event, data) => {

        try {

            await askOllama(
                event,
                data
            );

            return {
                started: true
            };

        } catch (error) {

            console.error(
                "Ollama error:",
                error
            );

            return {
                error:
                    "I could not connect to Ollama. Make sure Ollama is running and Llama 3.2 is installed."
            };
        }
    }
);

app.whenReady().then(() => {

    createWindow();

    app.on("activate", () => {

        if (
            BrowserWindow
                .getAllWindows()
                .length === 0
        ) {
            createWindow();
        }

    });

});

app.on(
    "window-all-closed",
    () => {

        if (
            process.platform !== "darwin"
        ) {
            app.quit();
        }

    }
);



