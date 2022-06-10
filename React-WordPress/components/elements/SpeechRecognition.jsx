import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition';

const appId = process.env.speechly_appID;
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

// const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;
// const mic = new SpeechRecognition();

// console.log(mic);

const Microphone = ({ onListening }) => {
    const router = useRouter();
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const startListening = () =>
        SpeechRecognition.startListening({ continuous: true });

    const stopListening = () => {
        SpeechRecognition.stopListening();
        resetTranscript();
    };

    let microphone;

    if (browserSupportsSpeechRecognition) {
        microphone = listening ? (
            <i
                title="Turn off voice search"
                className="bi bi-mic-mute font-20"
                style={{ marginRight: '0.7em' }}
                onClick={stopListening}></i>
        ) : (
            <i
                title="Turn on voice search"
                className="bi bi-mic font-20"
                style={{ marginRight: '0.7em' }}
                onClick={startListening}></i>
        );
    } else {
        microphone = (
            <i
                title="Turn on voice search"
                className="bi bi-mic font-20"
                style={{ marginRight: '0.7em' }}
                onClick={() => alert('Not supported!')}></i>
        );
    }

    useEffect(() => {
        router.events.on('routeChangeStart', stopListening);
        if (listening) {
            onListening(transcript.toLowerCase());
        }

        return () => {
            router.events.off('routeChangeStart', stopListening);
        };
    }, [transcript]);

    return microphone;
};

export default Microphone;
