import { useEffect, useState } from "react";
import { useAppState } from "../../app-state/AppStateProvider"
import Characters from "../../story/Characters";
import Bubble from "../../components/bubble/Bubble";
import "./CharacterView.scss";

const CharacterView = (props) => {
    const { name } = props;
    const chatacter = Characters[name];

    const { innerDialogue, status, charactersText } = useAppState();
    const [text, setText] = useState('');

    useEffect(() => {
        if (chatacter.isMain) return;

        if (charactersText[name] != null)
        {
            setText(charactersText[name]);
        }
        
    }, [charactersText])

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
                    <Bubble isModeSpeak={true} text={text} isLoading={status === 'text-loading'} />
                </>}
            {/* </div> */}
        </div>
    );
}

export default CharacterView;