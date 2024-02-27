import { useState, useCallback, useEffect, useRef } from 'react';
import { useAppState, useSetAppState } from '../app-state/AppStateProvider';
import { SETTINGS } from '../../settings';
import Characters from './Characters';

export function useSendMessage(message, onSend) {
    const { messages, status } = useAppState();
    const setAppState = useSetAppState();
    const handleResponse = useHandleStoryResponse();
    const [isEnd, setIsEnd] = useState(false);

    const send = useCallback(() => {

        const newMessages = [...messages, message];

        setAppState({ messages: newMessages, status: 'loading' });

        fetch(
            `${SETTINGS.SERVER_URL}/story-completions`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(newMessages)
            }
        ).then(response => response.json()
        ).then(data => {
            try {
                let storytellerResponse = data.choices[0].message.content;
                storytellerResponse = JSON.parse(storytellerResponse);

                setAppState({ status: 'idle'});
                handleResponse(newMessages, storytellerResponse);
                onSend();

                // if (storytellerResponse.currentKeyGoalIndex >= 3 && storytellerResponse.isCurrentKeyGoalCompleted) {
                //     setIsEnd(true);
                // }

            } catch { err => { throw err } }
        }).catch(err => {
            console.error('Api error. Details: ', err);
            setAppState({ status: 'error' });
        })

    }, [messages]);

    return send;
}


export function useHandleStoryResponse() {
    const { inputMessage, charactersText } = useAppState();
    const setAppState = useSetAppState();

    function handleStoryResponse(messages, response) {
        if (!response) return;

        // Test modifying the words limit:
        // if (!isNaN(parseInt(newMessage))) {
        //     newMessages.push({ role: 'system', content: `Your next storyText output has maximum length of ${newMessage} words.` })
        // }

        // properties: galitText, smadarText, barakText, LilachInnerDialogue, callToAction, galitGoalProgress, smadarGoalProgress, barakGoalProgress
        console.log("response", response);

        const newChatactersText = {
            Galit: '',
            Smadar: '',
            Barak: ''
        };

        if (response.galitText) {
            newChatactersText.Galit = response.galitText;
        }

        if (response.smadarText) {
            newChatactersText.Smadar = response.smadarText;
        }

        if (response.barakText) {
            newChatactersText.Barak = response.barakText;
        }

        setAppState({ charactersText: { ...newChatactersText } });

        // const newMessages = [...messages];
        // newMessages.push({ role: 'assistant', content: response.characterText });
        // setAppState({ messages: [...newMessages] }); // todo: update scene description?

        setTimeout(() => {
            if (response.LilachInnerDialogue && response.callToAction) {
                setAppState({ innerDialogue: response.LilachInnerDialogue + " " + response.callToAction });
            }
        }, 500)
    }

    return handleStoryResponse;
}
