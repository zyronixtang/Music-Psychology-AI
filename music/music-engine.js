const MidiWriter = require("midi-writer-js");
const path = require("path");
const fs = require("fs");

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function generateMusic(moods, outputName = "generated-song.mid") {

    const calm = Number(moods.Calm || 0);
    const joy = Number(moods.Joy || 0);
    const wonder = Number(moods.Wonder || 0);
    const euphoria = Number(moods.Euphoria || 0);
    const anger = Number(moods.Anger || 0);
    const fear = Number(moods.Fear || 0);
    const melancholy = Number(moods.Melancholy || 0);
    const nostalgia = Number(moods.Nostalgia || 0);

    const brightness =
        joy +
        euphoria +
        wonder;

    const tension =
        anger +
        fear;

    const softness =
        calm +
        melancholy +
        nostalgia;

    const tempo = Math.round(
        clamp(
            70 +
            brightness * 0.35 +
            tension * 0.15 -
            softness * 0.20,
            55,
            135
        )
    );

    let key = "C";
    let scale = "major";

    if (melancholy + nostalgia > joy + euphoria) {
        key = "A";
        scale = "minor";
    }

    if (tension > brightness + 15) {
        key = "D";
        scale = "minor";
    }

    let chords;

    if (scale === "minor") {
        chords = [
            ["A3", "C4", "E4"],
            ["F3", "A3", "C4"],
            ["C4", "E4", "G4"],
            ["G3", "B3", "D4"]
        ];
    } else {
        chords = [
            ["C4", "E4", "G4"],
            ["G3", "B3", "D4"],
            ["A3", "C4", "E4"],
            ["F3", "A3", "C4"]
        ];
    }

    const chordTrack = new MidiWriter.Track();

    chordTrack.setTempo(tempo);

    chordTrack.addEvent(
        new MidiWriter.ProgramChangeEvent({
            instrument: 1
        })
    );

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

    let melody;

    if (brightness >= softness && brightness >= tension) {

        melody = [
            "E4",
            "G4",
            "A4",
            "G4",
            "C5",
            "B4",
            "G4",
            "E4"
        ];

    } else if (tension >= softness) {

        melody = [
            "D4",
            "F4",
            "A4",
            "C5",
            "A4",
            "F4",
            "E4",
            "D4"
        ];

    } else {

        melody = [
            "C4",
            "E4",
            "G4",
            "E4",
            "D4",
            "C4",
            "A3",
            "C4"
        ];
    }

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

    const outputPath = path.join(
        __dirname,
        outputName
    );

    const midiData = writer.buildFile();

    fs.writeFileSync(
        outputPath,
        Buffer.from(midiData)
    );

    return {
        outputPath,
        tempo,
        key,
        scale
    };
}

module.exports = {
    generateMusic
};
