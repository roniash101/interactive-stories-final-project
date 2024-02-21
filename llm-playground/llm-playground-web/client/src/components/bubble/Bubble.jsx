import InteractorInput from "../interactor-input/InteractorInput";
import SpeakingBubble from "../../assets/speaking-bubble.png";
import ThinkingBubble from "../../assets/thinking-bubble.png";
import "./Bubble.scss";

const Bubble = (props) => {
    const { isModeSpeak, enableInput, text } = props;
    const className = isModeSpeak ? "speaking-bubble" : "thinking-bubble";
    const hasText = text != undefined && text != "";
    const isRender = (hasText || enableInput);

    return (
        <div className="bubbles-parent">
            {isRender && <div className={"bubble " + className}>
                {hasText ?
                    <p className="text">{text}</p>
                    : <InteractorInput />}
            </div>}
        </div>
    );
}

export default Bubble;