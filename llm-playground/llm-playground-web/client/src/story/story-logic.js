import { useCallback, useEffect, useRef } from 'react';
import { useAppState, useSetAppState } from '../app-state/AppStateProvider';
import Characters from './Characters';

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

        setAppState({charactersText: {...newChatactersText}});

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
