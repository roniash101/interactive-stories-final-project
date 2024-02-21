import { useEffect, useState } from "react";
import { useAppState } from "../../app-state/AppStateProvider"
import Characters from "../../story/Characters";
import Bubble from "../../components/bubble/Bubble";
import LoadingDots from "../../components/LoadingDots";
import "./CharacterView.scss";

const CharacterView = (props) => {
    const { name } = props;
    const chatacter = Characters[name];

    const { messages, innerDialogue, status } = useAppState();
    const [text, setText] = useState(''); // todo: move main vs regular handle to bubble

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role == "assistant") // todo: every message should contain all the roles?  == name
        {
            setText(lastMessage.content) // todo: parse chracter's line
        }
    }, [messages])

    return (
        <div className="character-view" style={{ "backgroundColor": chatacter.backgroundColor }}>
            <div className="character-parent">
                <img className="character" src={chatacter.image} />
            </div>

            {/* <div className="bubbles-parent"> */}
            {chatacter.isMain ?
                <>
                    <Bubble isModeSpeak={true} enableInput={true} />
                    <Bubble isModeSpeak={false} text={innerDialogue} />
                </>
                :
                <>
                    <Bubble isModeSpeak={true} text={text} />
                    {status === 'loading' && <LoadingDots /> /*move inside bubble*/ }
                </>}
            {/* </div> */}
        </div>
    );
}

export default CharacterView;