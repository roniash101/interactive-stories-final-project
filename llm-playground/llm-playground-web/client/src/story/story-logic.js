import { useCallback, useEffect, useRef } from 'react';
import { useAppState, useSetAppState } from '../app-state/AppStateProvider';
import Characters from './Characters';

export function useHandleStoryResponse() {
    const { inputMessage, charactersText } = useAppState();
    const setAppState = useSetAppState();

    function handleStoryResponse(messages, response) {
        if (!response) return;

        // const newMessages = [...messages];

        // Test modifying the words limit:
        // if (!isNaN(parseInt(newMessage))) {
        //     newMessages.push({ role: 'system', content: `Your next storyText output has maximum length of ${newMessage} words.` })
        // }

        // properties: characterName, characterText, LilachInnerDialogue, callToAction, goalProgress
        console.log("response", response);

        if (response.characterName && response.characterText) {            
            let charactersTextState = {...charactersText};
            charactersTextState[response.characterName] = response.characterText;
            setAppState({charactersText: charactersTextState});
            // newMessages.push({ role: 'assistant', content: response.characterText });
        }

        // setAppState({ messages: [...newMessages] }); // todo: update scene description?

        setTimeout(() => {
            if (response.LilachInnerDialogue && response.callToAction) {
                setAppState({ innerDialogue: response.LilachInnerDialogue + " " + response.callToAction });
            }
        }, 500)
    }

    return handleStoryResponse;
}
