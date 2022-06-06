import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import SR, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognition = ({ onListening }) => {
    const router = useRouter();
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const startListening = () => {
        SR.startListening({ continuous: true });
    };

    const stopListening = () => {
        SR.stopListening();
        resetTranscript();
    };

    let microphone = null;

    if (browserSupportsSpeechRecognition) {
        microphone = listening ? (
            <div title="Turn off voice search" onClick={stopListening}>
                <i
                    style={{ marginRight: '0.7em' }}
                    className="bi bi-mic-mute font-20"></i>
            </div>
        ) : (
            <div title="Turn on voice search" onClick={startListening}>
                <i
                    style={{ marginRight: '0.7em' }}
                    className="bi bi-mic font-20"></i>
            </div>
        );
    }

    useEffect(() => {
        router.events.on('routeChangeStart', stopListening);
        if (listening) {
            onListening(transcript);
        }

        return () => {
            router.events.off('routeChangeStart', stopListening);
        };
    }, [transcript]);

    return microphone;
};

export default SpeechRecognition;
