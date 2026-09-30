from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import urllib.request

OLLAMA_URL = "http://127.0.0.1:11434/api/generate"
MODEL = "llama3.2"


class Handler(SimpleHTTPRequestHandler):

    def do_POST(self):

        if self.path != "/api/chat":
            self.send_error(404)
            return

        try:

            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)
            data = json.loads(body)

            moods = data.get("moods", {})
            message = data.get("message", "")
            history = data.get("history", [])

            prompt = f"""
You are the AI assistant inside a Music Psychology laboratory.

The user is exploring the relationship between music,
emotion, perception, and psychology.

CURRENT EMOTIONAL MAP:
{json.dumps(moods, indent=2)}

CONVERSATION HISTORY:
{json.dumps(history, indent=2)}

USER QUESTION:
{message}

Answer the user's question directly and practically.

You may discuss:

- music theory
- harmony
- melody
- rhythm
- tempo
- dynamics
- instrumentation
- timbre
- texture
- musical tension and release
- perception
- emotion
- psychology
- composition

Important:
Do not present a particular key, chord, mode, tempo, or musical
feature as universally causing a particular emotion.

Distinguish between:
1. music-theory observations
2. perceptual interpretations
3. research-supported psychological claims

When discussing psychology, acknowledge that emotional responses
to music vary between listeners and contexts.

Keep answers understandable for a musician.
Do not reveal hidden chain-of-thought.
Give concise explanations rather than internal reasoning.
"""

            request_data = json.dumps({
                "model": MODEL,
                "prompt": prompt,
                "stream": False
            }).encode("utf-8")

            request = urllib.request.Request(
                OLLAMA_URL,
                data=request_data,
                headers={"Content-Type": "application/json"}
            )

            with urllib.request.urlopen(request, timeout=120) as response:
                result = json.loads(response.read().decode("utf-8"))

            answer = result.get("response", "The AI returned no response.")

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            self.wfile.write(
                json.dumps({"answer": answer}).encode("utf-8")
            )

        except Exception as error:

            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            self.wfile.write(
                json.dumps({"error": str(error)}).encode("utf-8")
            )


print("Music Psychology AI running at http://localhost:8000")

server = ThreadingHTTPServer(("127.0.0.1", 8000), Handler)

server.serve_forever()
