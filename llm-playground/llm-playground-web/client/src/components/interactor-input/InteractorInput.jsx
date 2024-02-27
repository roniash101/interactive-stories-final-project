import { useCallback, useEffect, useRef, useState } from "react";
import { useAppState, useSetAppState } from "../../app-state/AppStateProvider";
import { SETTINGS } from "../../../settings";
import { useSendMessage, useHandleStoryResponse } from "../../story/story-logic";
import "./interactor-input.css";

export default function InteractorInput() {

    const { messages, status, inputMessage } = useAppState();
    const setAppState = useSetAppState();
    const handleResponse = useHandleStoryResponse();

    const message = { role: 'user', content: inputMessage };
    const onSent = () => setAppState({ inputMessage: '' });
    const realSend = useSendMessage(message, onSent);

    const [isEnd, setIsEnd] = useState(false);

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            realSend();
            setAppState({ innerDialogue: '' });
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
                    <textarea
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