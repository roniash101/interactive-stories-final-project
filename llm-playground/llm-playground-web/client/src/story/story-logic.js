import { useCallback, useEffect, useRef } from 'react';
import { useAppState, useSetAppState } from '../app-state/AppStateProvider';

export function useHandleStoryResponse() {
    const { inputMessage } = useAppState();
    const setAppState = useSetAppState();

    function handleStoryResponse(messages, response) {
        if (!response) return;

        const newMessages = [...messages];

        // Test modifying the words limit:
        // if (!isNaN(parseInt(newMessage))) {
        //     newMessages.push({ role: 'system', content: `Your next storyText output has maximum length of ${newMessage} words.` })
        // }

        console.log("response", response);
        // characterName, characterText, LilachInnerDialogue, callToAction, goalProgress

        if (response.characterText) {
            newMessages.push({ role: 'assistant', content: response.characterText });
        }

        setAppState({ messages: [...newMessages] }); // todo: update scene description?

        setTimeout(() => {
            if (response.LilachInnerDialogue && response.callToAction) {
                setAppState({ innerDialogue: response.LilachInnerDialogue + " " + response.callToAction });
            }
        }, 500)
    }

    return handleStoryResponse;
}
