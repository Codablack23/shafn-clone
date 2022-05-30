import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition';

const WPSpeechRecognition = ({ onListening }) => {
    const router = useRouter();
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        resetTranscript();
    };

    let microphone = null;

    if (browserSupportsSpeechRecognition) {
        microphone = listening ? (
            <i
                className="icon-mic-mute"
                title="Turn off voice search"
                onClick={stopListening}></i>
        ) : (
            <i
                className="icon-mic"
                title="Turn on voice search"
                onClick={startListening}></i>
        );
    }

    useEffect(() => {
        router.events.on('routeChangeStart', stopListening);
        if (listening) {
            onListening(transcript);
        }
    }, [transcript]);

    return microphone;
};

export default WPSpeechRecognition;
