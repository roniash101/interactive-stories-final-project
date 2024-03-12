import { useEffect, useState } from "react";
import { useSendMessage } from "../story/story-logic";
import { useAppState, useSetAppState } from "../app-state/AppStateProvider";

const FooterButton = (props) => {
    const { value, disabled, color, array, setArray } = props;
    const { state, status } = useAppState();
    const setAppState = useSetAppState();
    const isLoading = (status === 'text-loading' || status === 'view-loading');
    const [isActive, setIsActive] = useState(false);
    // const sendMessage = useSendMessage();

    useEffect(() => {
        if (array.indexOf(value) != -1) setIsActive(true);
    }, []);

    const formatNotification = () => {
        let action = !isActive ? "joined" : "left";
        return `SYSTEM: ${value} has ${action} the conversation`;
    }

    const onButtonClick = (value) => {
        if (state == 'start') {
            setAppState({state: 'middle'});
        }

        if (!isActive) {
            setIsActive(true);

            // sendMessage({ role: 'system', content: formatNotification() }, () => {
                setArray([...array, value]);
            // });
        }
        else {
            let copyArray = [...array];
            let index = copyArray.indexOf(value);
            copyArray.splice(index, 1);
            setIsActive(false);

            // sendMessage({ role: 'system', content: formatNotification() }, () => {
                setArray(copyArray)
            // });
        }
    }

    return (
        <button
            className={`button ${isActive && "active"} ${!(disabled || isLoading) && "enabled"}`}
            style={{"backgroundColor": color}}
            onClick={() => onButtonClick(value)}
            disabled={disabled || isLoading}>
            {value}
        </button>
    );
}

export default FooterButton;