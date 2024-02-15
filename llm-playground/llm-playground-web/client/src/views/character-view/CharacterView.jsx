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
        image: Character1,
        backgroundColor: "red",
        isMain: true
    },
    Smadar: {
        name: "Smadar",
        image: Character2,
        backgroundColor: "blue",
        isMain: false
    },
    Barak: {
        name: "Barak",
        image: Character3,
        backgroundColor: "yellow",
        isMain: false
    },
    Galit: {
        name: "Galit",
        image: Character4,
        backgroundColor: "green",
        isMain: false
    }
};

const CharacterView = (props) => {

    const { name } = props;

    return (
        <div className="character-view" style={{ "backgroundColor": Characters[name].backgroundColor }}>
            <img className="character" src={Characters[name].image} />
            <div className="bubbles">
                <img className="speaking-bubble" src={SpeakingBubble} />
                <img className="thinking-bubble" src={ThinkingBubble} />
            </div>
        </div>
    );
}

export default CharacterView;