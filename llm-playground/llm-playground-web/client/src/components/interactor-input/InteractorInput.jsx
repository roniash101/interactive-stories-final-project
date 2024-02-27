import { useAppState, useSetAppState } from "../../app-state/AppStateProvider";
import { useSendMessage } from "../../story/story-logic";
import "./interactor-input.css";

export default function InteractorInput() {

    const { status, inputMessage } = useAppState();
    const setAppState = useSetAppState();

    const message = { role: 'user', content: inputMessage };
    const onMessageSent = () => setAppState({ inputMessage: '' });
    const sendMessage = useSendMessage(onMessageSent);

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage(message);
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
            <textarea
                value={inputMessage}
                cols="20"
                rows="5"
                disabled={status === 'loading'}
                style={{ "color": getTextColor() }}
                onKeyDown={onKeyDown}
                onChange={e => setAppState({ inputMessage: e.target.value })}
                autoComplete="off" />
            {status === 'error' && 'Something is broken'}
        </div>
    )
}