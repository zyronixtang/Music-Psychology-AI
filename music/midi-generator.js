const MidiWriter = require("midi-writer-js");
const path = require("path");
const fs = require("fs");

const outputPath = path.join(
    __dirname,
    "first-generated-song.mid"
);

const tempo = 90;

const chordTrack = new MidiWriter.Track();

chordTrack.setTempo(tempo);

chordTrack.addEvent(
    new MidiWriter.ProgramChangeEvent({
        instrument: 1
    })
);

const chords = [
    ["C4", "E4", "G4"],
    ["A3", "C4", "E4"],
    ["F3", "A3", "C4"],
    ["G3", "B3", "D4"]
];

for (const chord of chords) {
    chordTrack.addEvent(
        new MidiWriter.NoteEvent({
            pitch: chord,
            duration: "1"
        })
    );
}

const melodyTrack = new MidiWriter.Track();

melodyTrack.setTempo(tempo);

melodyTrack.addEvent(
    new MidiWriter.ProgramChangeEvent({
        instrument: 1
    })
);

const melody = [
    "E4",
    "G4",
    "A4",
    "G4",
    "E4",
    "D4",
    "C4",
    "E4"
];

for (const note of melody) {
    melodyTrack.addEvent(
        new MidiWriter.NoteEvent({
            pitch: [note],
            duration: "4"
        })
    );
}

const writer = new MidiWriter.Writer([
    chordTrack,
    melodyTrack
]);

const midiData = writer.buildFile();

fs.writeFileSync(
    outputPath,
    Buffer.from(midiData)
);

console.log("MIDI generated:");
console.log(outputPath);
