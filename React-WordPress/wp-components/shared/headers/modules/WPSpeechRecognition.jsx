import React, { useEffect } from 'react';
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition';

const WPSpeechRecognition = ({ onListening }) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const startListening = (e) => {
        e.preventDefault();
        SpeechRecognition.startListening({ continuous: true });
    };

    const stopListening = (e) => {
        e.preventDefault();
        SpeechRecognition.stopListening();
        resetTranscript();
    };

    let microphone = null;

    if (browserSupportsSpeechRecognition) {
        microphone = listening ? (
            <button title="Turn off voice search" onClick={stopListening}>
                <i className="icon-mic-mute"></i>
            </button>
        ) : (
            <button title="Turn on voice search" onClick={startListening}>
                <i className="icon-mic"></i>
            </button>
        );
    }

    useEffect(() => {
        if (listening) {
            onListening(transcript);
        }
    }, [transcript]);

    return microphone;
};

export default WPSpeechRecognition;
