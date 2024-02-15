import "./CharacterView.scss";
import Character1 from "../../assets/character1.png";
import Character2 from "../../assets/character2.png";
import Character3 from "../../assets/character3.png";
import Character4 from "../../assets/character4.png";
import SpeakingBubble from "../../assets/speaking-bubble.png";
import ThinkingBubble from "../../assets/thinking-bubble.png";

import { useEffect, useState } from "react";

export const Characters = {
    Lilach: {
        name: "Lilach",
        image: Character3,
        backgroundColor: "#ccd5ae",
        isMain: true
    },
    Smadar: {
        name: "Smadar",
        image: Character2,
        backgroundColor: "#fefae0",
        isMain: false
    },
    Galit: {
        name: "Galit",
        image: Character4,
        backgroundColor: "#f8ad9d",
        isMain: false
    },
    Barak: {
        name: "Barak",
        image: Character1,
        backgroundColor: "#faedcd",
        isMain: false
    }
};

const CharacterView = (props) => {

    const { name } = props;
    const chatacter = Characters[name];

    return (
        <div className="character-view" style={{ "backgroundColor": chatacter.backgroundColor }}>
            <div className="character-parent">
                <img className="character" src={chatacter.image} />
            </div>
            <div className="bubbles-parent">
                <img className="speaking-bubble" src={SpeakingBubble} />
                {chatacter.isMain && <img className="thinking-bubble" src={ThinkingBubble} />}
            </div>
        </div>
    );
}

export default CharacterView;