import { useEffect, useState } from "react";
// import { useAppState, useSetAppState } from "../app-state/AppStateProvider";
// import { SETTINGS } from "../../settings";
// import { useHandleStoryResponse } from "../story/story-logic";

const FooterButton = (props) => {
    const {value, array, setArray} = props;
    const [isActive, setIsActive] = useState(false);

    // const { messages, status } = useAppState();
    // const setAppState = useSetAppState();
    // const handleResponse = useHandleStoryResponse();

    useEffect(() => {
        if (array.indexOf(value) != -1) setIsActive(true);
    }, []);

    const onButtonClick = (value) => { // todo: update gpt
        if (!isActive) {
            setArray([...array, value]);
            setIsActive(true);
        }
        else {
            let copyArray = [...array];
            let index = copyArray.indexOf(value);
            copyArray.splice(index, 1);
            setArray(copyArray)
            setIsActive(false);
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