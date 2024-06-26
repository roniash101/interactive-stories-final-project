import { useEffect, useState } from "react";
import { useAppState } from "../../app-state/AppStateProvider"
import Characters from "../../story/Characters";
import Bubble from "../../components/bubble/Bubble";
import "./CharacterView.scss";

const CharacterView = (props) => {
    const { name } = props;
    const chatacter = Characters[name];

    const { isVictory, innerDialogue, status, charactersText, participants } = useAppState();
    const [text, setText] = useState('');

    useEffect(() => {
        if (chatacter.isMain) return;

        if (charactersText[name] != null) {
            setText(charactersText[name]);
        }

    }, [charactersText, name])

    return (
        <div className="character-view" style={{ "backgroundColor": chatacter.backgroundColor }}>
            <div className={`online ${chatacter.isMain && "empty"}`}>
                <div className="dot" />
                {name} is online
            </div>
            <div className="character-parent">
                <img className="character" src={chatacter.image} />
            </div>

            {/* <div className="bubbles-parent"> */}
            {chatacter.isMain ?
                <>
                    {participants.length != 1 && !isVictory && <Bubble isModeSpeak={true} enableInput={true} />}
                    <Bubble isModeSpeak={false} text={innerDialogue} />
                </>
                :
                <>
                    <Bubble isModeSpeak={true} text={text} isLoading={status === 'text-loading'} />
                </>}
            {/* </div> */}
        </div>
    );
}

export default CharacterView;