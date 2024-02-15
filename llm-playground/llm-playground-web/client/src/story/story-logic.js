import { useCallback, useEffect, useRef } from 'react';
import { useAppState, useSetAppState } from '../app-state/AppStateProvider';
import Timer from '../utils/timer';

export function useHandleStoryResponse() {
    const { inputMessage } = useAppState();
    const setAppState = useSetAppState();
    const idleTimer = useRef();

    useEffect(() => {
        idleTimer.current?.cancel();
    }, [inputMessage]);

    function handleStoryResponse(messages, response) {
        if (!response) return;

        const newMessages = [...messages];

        // Test modifying the words limit:
        // if (!isNaN(parseInt(newMessage))) {
        //     newMessages.push({ role: 'system', content: `Your next storyText output has maximum length of ${newMessage} words.` })
        // }

        console.log("response", response);

        if (response.userLineToneVerb) {
            newMessages.push({ role: 'assistant', content: ", " + response.userLineToneVerb + " Koby." });
        }

        if (response.storyText) {
            newMessages.push({ role: 'assistant', content: response.storyText });
        }

        if (response.KobyInnerDialogue) {

            newMessages.push({ role: 'assistant', content: response.KobyInnerDialogue });
        }

        if (response.storyEvent) {
            newMessages.push({ role: 'assistant', content: response.storyEvent });
        }

        setAppState({ messages: [...newMessages] });

        // If the player is idle for a long period, add some content or a hint to push the story forward.
        idleTimer.current = new Timer(10000, () => {
            // if (response.storyEvent && Math.random() > 0.7) {
            //     // Trigger an independent story event:
            //     newMessages.push({ role: 'assistant', content: response.storyEvent });
            //     setAppState({ messages: [...newMessages] });
            // }

            if (response.currentKeyGoalIndex < 3 || (response.currentKeyGoalIndex == 3 && !response.isCurrentKeyGoalCompleted)) {

                if (response.callToAction) {
                    // Apply call to action hint:
                    newMessages.push({ role: 'assistant', content: `(${response.callToAction})` });
                    setAppState({ messages: [...newMessages] });
                }
            }
        });
        idleTimer.current.start();
    }

    return handleStoryResponse;
}
