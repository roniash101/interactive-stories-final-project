import { useCallback, useEffect, useRef, useState } from "react";
import { useAppState, useSetAppState } from "../../app-state/AppStateProvider";
import "./interactor-input-styles.css";
import { SETTINGS } from "../../../settings";
import { useHandleStoryResponse } from "../../story/story-logic";

export default function InteractorInputView() {

    const { messages, status, inputMessage } = useAppState();
    const setAppState = useSetAppState();
    const [isEnd, setIsEnd] = useState(false);


    const handleResponse = useHandleStoryResponse();

    const send = useCallback(() => {

        const newMessages = [...messages, { role: 'user', content: inputMessage }];

        setAppState({ messages: newMessages, status: 'loading', inputMessage: '' });

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

                setAppState({ status: 'idle' });
                handleResponse(newMessages, storytellerResponse);

                if (storytellerResponse.currentKeyGoal) { // check if end
                    if (storytellerResponse.currentKeyGoal.index >= 3 && storytellerResponse.currentKeyGoal.isCompleted) {
                        setIsEnd(true);
                    }
                }


            } catch { err => { throw err } }
        }).catch(err => {
            console.error('Api error. Details: ', err);
            setAppState({ status: 'error' });
        })

    }, [messages, inputMessage]);


    return (
        <div
            id="interactor-box"
            style={{
                opacity: status === 'loading' ? 0.3 : 1,
                pointerEvents: status === 'loading' ? 'none' : 'auto',
                color: status === 'error' ? 'red' : 'auto'
            }}>
            {isEnd ? <span>The End.</span> :
                <>
                    <span>Koby:</span>
                    <input
                        id="interactor-text-input"
                        value={inputMessage}
                        onKeyDown={e => { if (e.key === 'Enter') send() }}
                        onChange={e => setAppState({ inputMessage: e.target.value })}
                    />
                    <button onClick={send}>Send</button>
                </>}
            {
                status === 'error' && 'Something is broken 😵‍💫'
            }
        </div>
    )
}