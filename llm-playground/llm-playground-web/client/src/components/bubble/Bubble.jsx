import { useState } from "react";
import SpeakingBubble from "../../assets/speaking-bubble.png";
import ThinkingBubble from "../../assets/thinking-bubble.png";
import "./Bubble.scss";

const Bubble = (props) => {
    const { isModeSpeak, text } = props;
    const [input, setInput] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const className = isModeSpeak ? "speaking-bubble" : "thinking-bubble";
    const hasText = text != undefined && text != "";
    const isRender = !(!isModeSpeak && !hasText);

    const onButtonClick = (value) => {
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

    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            //   this.myFormRef.submit();
            setIsDisabled(true);
        }
    }

    return (
        <div className="bubbles-parent">
            {isRender && <div className={"bubble " + className}>
                {hasText ?
                    <p className="text">{text}</p>
                    : <textarea
                        id="usermsg"
                        cols="20"
                        rows="5"
                        disabled={isDisabled}
                        style={{"color": isDisabled ? "black" : "blue"}}
                        onKeyDown={onEnterPress} />}
            </div>}
        </div>
    );
}

export default Bubble;