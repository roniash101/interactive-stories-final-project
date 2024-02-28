import { useAppState, useSetAppState } from "../../app-state/AppStateProvider";
import { useSendMessage } from "../../story/story-logic";
import "./interactor-input.css";

export default function InteractorInput() {

    const { status, inputMessage, participants } = useAppState();
    const isLoading = (status === 'text-loading' || status === 'view-loading');
    const setAppState = useSetAppState();

    const message = { role: 'user', content: inputMessage };
    const sendMessage = useSendMessage();

    const onMessageSent = () => {
        setAppState({ inputMessage: '' });
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage(message, participants, onMessageSent);
            setAppState({ innerDialogue: '' });
        }
    }

    const getTextColor = () => {
        switch (status) {
            case 'idle':
                return 'blue';
            case 'text-loading':
                return 'black';
            case 'view-loading':
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
                pointerEvents: isLoading ? 'none' : 'auto',
                color: getTextColor()
            }}>
            <textarea
                value={inputMessage}
                cols="20"
                rows="5"
                disabled={isLoading}
                style={{ "color": getTextColor() }}
                onKeyDown={onKeyDown}
                onChange={e => setAppState({ inputMessage: e.target.value })}
                autoComplete="off" />
            {status === 'error' && 'Something is broken'}
        </div>
    )
}