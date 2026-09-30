# Music Psychology AI

Music Psychology AI is a Windows desktop research and composition laboratory that explores the relationship between music, emotion, perception, and psychology.

The application combines an interactive emotional map with music-theory analysis and a local AI assistant to help explore how musical choices can be used to create different emotional and psychological experiences.

## Current Features

- Interactive 8-mood emotional map
- Draggable emotional position
- Continuous emotional mixture percentages
- Dynamic music analysis
- Suggested musical key
- Suggested scale or mode
- Suggested tempo (BPM)
- Suggested chord progression
- Melody guidance
- Rhythm guidance
- Dynamics guidance
- Instrumentation and texture suggestions
- Overall sound description
- Local AI chat
- Ollama + Llama 3.2 integration
- English, French, Spanish, and Simplified Chinese language support
- Dark, light, and dark rainbow background themes
- Windows desktop application
- Windows installer build using Electron Builder

## Emotional Map

The current emotional map contains eight emotional states:

- Wonder
- Euphoria
- Anger
- Fear
- Melancholy
- Nostalgia
- Calm
- Joy

The user can move between emotional areas and explore blended emotional states rather than being limited to a single category.

## How It Works

The application connects several layers of musical and psychological exploration:

**Emotional position → Musical characteristics → Perception → Psychological interpretation**

For example, an emotional position may influence suggested:

- Tempo
- Harmony
- Scale or mode
- Chord movement
- Melody behavior
- Rhythm
- Dynamics
- Instrumentation
- Texture

These relationships are treated as creative and research-oriented suggestions rather than universal psychological laws.

Music can influence emotion differently depending on the listener, context, culture, memories, expectations, performance, and many other factors.

## AI Assistant

The application includes a local AI assistant called **AI Music Psychology**.

The AI currently runs locally through:

- Electron
- Ollama
- Llama 3.2

The application sends the current emotional mixture, conversation history, and user question to Ollama.

The AI is instructed to:

- Discuss music theory
- Explore composition
- Explain possible relationships between music and emotion
- Distinguish musical observations from psychological interpretations
- Distinguish established research from interpretation or hypothesis
- Avoid presenting musical-emotional relationships as absolute rules

Because the AI runs through a local Ollama installation, the application does not require a cloud AI API for the current chat system.


## Requirements

### Operating System

Windows is currently the primary supported platform.

### Required Software

You will need:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/)
- [Ollama](https://ollama.com/download/windows)
- [Llama 3.2](https://ollama.com/library/llama3.2)


## Installation

### 1. Clone the repository

Clone the repository to your computer.

### 2. Open the project folder

Use PowerShell to enter the project directory.

### 3. Install Node dependencies

Run:

npm install

### 4. Install Ollama

Install Ollama for Windows from the official Ollama website.

After installation, verify it with:

ollama --version

### 5. Install the AI model

Download Llama 3.2 with:

ollama pull llama3.2

You can verify the model with:

ollama list

## Running the Application

From the project directory, run:

npm start

Ollama must be available locally for the AI chat functionality.

The application communicates with the local Ollama API at:

http://127.0.0.1:11434


## Building the Windows Installer

The project uses Electron Builder to create a Windows installer.

From the project directory, run:

npm run build

The installer will be created inside:

dist/

The generated installer currently follows this naming format:

Music Psychology AI Setup 1.0.0.exe

## Project Structure

Music-Psychology-AI/
│
├── app/
│   ├── index.html
│   ├── ai-chat.js
│   └── backups/
│
├── build/
│   └── icon.ico
│
├── main.js
├── preload.js
├── package.json
├── package-lock.json
├── server.py
├── start-server.vbs
├── .gitignore
└── README.md

### Main Files

**app/index.html**

Contains the primary application interface, emotional map, music analysis interface, settings system, language system, and visual styling.

**app/ai-chat.js**

Controls the AI chat interface in the application.

**main.js**

Controls the Electron desktop process and communication with the local Ollama AI service.

**preload.js**

Provides the secure bridge between the Electron renderer and the main process.

**package.json**

Contains project metadata, dependencies, scripts, and Electron Builder configuration.

**build/icon.ico**

The Windows application icon used by the installer.


## Research Philosophy

Music Psychology AI is designed as a research and composition laboratory.

The project does not assume that one musical characteristic universally produces one emotional response.

Instead, it is designed to explore relationships between:

- Musical structure
- Perception
- Emotion
- Memory
- Expectation
- Context
- Psychology
- Music cognition

When psychological claims are added to the application, the goal is to distinguish:

1. Established research
2. Evidence-supported interpretation
3. Creative hypothesis
4. Speculation

This distinction is important because emotional responses to music are complex and highly dependent on context and individual listeners.

## Development

The project uses Git for version control.

The main development workflow is:

git status

git add .

git commit -m "Description of change"

git push

The GitHub repository is currently private.

## Backups

Development backups are kept locally under:

app/backups/

The backup directory is excluded from Git so historical working copies do not become part of the repository.

## Roadmap

Planned future development includes:

- Audio file upload
- MP3 analysis
- WAV analysis
- Deeper musical feature extraction
- Detailed psychological analysis
- Research references and evidence tracking
- Music-to-psychology reports
- MIDI generation
- Chord generation
- Melody generation
- AI-assisted composition
- Audio creation
- Study mode
- Song → Analysis → Mood → Psychology → Research workflow
- Research insight generation
- Video outline generation
- Expanded language support

## Project Status

The project is actively under development.

Features described under the current feature section are implemented or part of the current working application.

Features under the roadmap are planned future development and should not be considered implemented yet.

## License

License information has not yet been finalized.




