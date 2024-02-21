import { useCallback, useEffect, useRef, useState } from "react";
import { useAppState, useSetAppState } from "../../app-state/AppStateProvider";
import { SETTINGS } from "../../../settings";
import { useHandleStoryResponse } from "../../story/story-logic";
import "./interactor-input.css";

export default function InteractorInput() {

    // const [isDisabled, setIsDisabled] = useState(false);
    const { messages, status, inputMessage } = useAppState();
    const setAppState = useSetAppState();
    const [isEnd, setIsEnd] = useState(false);

    const handleResponse = useHandleStoryResponse();

    const send = useCallback(() => {

        const newMessages = [...messages, { role: 'user', content: inputMessage }];

        setAppState({ messages: newMessages, status: 'loading' }); // todo: inputMessage: ''

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

                if (storytellerResponse.currentKeyGoalIndex >= 3 && storytellerResponse.isCurrentKeyGoalCompleted) {
                    setIsEnd(true);
                }

            } catch { err => { throw err } }
        }).catch(err => {
            console.error('Api error. Details: ', err);
            setAppState({ status: 'error' });
        })

    }, [messages, inputMessage]);

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            // setIsDisabled(true);
            send()
        }
    }

    const getTextColor = () => {
        switch (status) {
            case 'idle':
                return 'blue';
            case 'loading':
                return 'black';
            case 'error':
                return 'red';
            default:
                return 'blue';
        }
    }

    return (
        <div
            id="interactor-box"
            style={{
                pointerEvents: status === 'loading' ? 'none' : 'auto',
                color: getTextColor()
            }}>
            {isEnd ? <span>The End.</span> : //todo: handle end
                <>
                    <textarea // todo: prevent resize?
                        value={inputMessage}
                        cols="20"
                        rows="5"
                        disabled={status === 'loading'}
                        style={{ "color": getTextColor() }}
                        onKeyDown={onKeyDown}
                        onChange={e => setAppState({ inputMessage: e.target.value })}
                        autoComplete="off" />
                </>}
            {
                status === 'error' && 'Something is broken'
            }
        </div>
    )
}