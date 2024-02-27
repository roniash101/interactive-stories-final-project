import { useEffect, useState } from "react";
import { useSendMessage } from "../story/story-logic";

const FooterButton = (props) => {
    const { value, array, setArray } = props;
    const [isActive, setIsActive] = useState(false);
    const sendMessage = useSendMessage();

    useEffect(() => {
        if (array.indexOf(value) != -1) setIsActive(true);
    }, []);

    const formatNotification = () => {
        let action = !isActive ? "joined" : "left";
        return `${value} has ${action} the conversation`;
    }

    const onButtonClick = (value) => {
        if (!isActive) {
            setIsActive(true);

            sendMessage({ role: 'system', content: formatNotification() }, () => {
                setArray([...array, value]);
            });
        }
        else {
            let copyArray = [...array];
            let index = copyArray.indexOf(value);
            copyArray.splice(index, 1);
            setIsActive(false);

            sendMessage({ role: 'system', content: formatNotification() }, () => {
                setArray(copyArray)
            });
        }
    }

    return (
        <div className={`button ${isActive && "active"}`}
            onClick={() => onButtonClick(value)}>
            {value}
        </div>
    );
}

export default FooterButton;