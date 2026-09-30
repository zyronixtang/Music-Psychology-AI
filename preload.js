const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    chat: (data) => ipcRenderer.invoke("ai-chat", data),

    onAIStream: (callback) =>
        ipcRenderer.on("ai-stream", (event, chunk) => callback(chunk)),

    onAIStreamDone: (callback) =>
        ipcRenderer.on("ai-stream-done", () => callback())
});
