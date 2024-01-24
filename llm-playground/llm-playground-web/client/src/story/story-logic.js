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

        if (response.storyText) {
            newMessages.push({ role: 'assistant', content: response.storyText });
        }

        setAppState({ messages: [...newMessages] });

        // TODO: end story with a long closing paragraph, and 'THE END' message.
        console.log('goal progress: ', response.goalProgress);

        // If the player is idle for a long period, add some content or a hint to push the story forward.
        idleTimer.current = new Timer(15000, () => {
            if (response.storyEvent && Math.random() > 0.7) {
                // Trigger an independent story event:
                newMessages.push({ role: 'assistant', content: response.storyEvent });
                setAppState({ messages: [...newMessages] });
            }

            if (response.callToAction) {
                // Apply call to action hint:
                newMessages.push({ role: 'assistant', content: `(${response.callToAction})` });
                setAppState({ messages: [...newMessages] });
            }
        });
        idleTimer.current.start();
    }

    return handleStoryResponse;
}
