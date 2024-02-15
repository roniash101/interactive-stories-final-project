import "./CharacterView.scss";
import Character1 from "../../assets/character1.png";
import Character2 from "../../assets/character2.png";
import Character3 from "../../assets/character3.png";
import Character4 from "../../assets/character4.png";
import { useEffect, useState } from "react";

export const Characters = {
    Lilach: {
        name: "Lilach",
        image: Character1,
        backgroundColor: "red"
    },
    Smadar: {
        name: "Smadar",
        image: Character2,
        backgroundColor: "blue"
    },
    Barak: {
        name: "Barak",
        image: Character3,
        backgroundColor: "yellow"
    },
    Galit: {
        name: "Galit",
        image: Character4,
        backgroundColor: "green"
    }
};

const CharacterView = (props) => {

    const { name } = props;

    return (
        <div className="character-view" style={{ "backgroundColor": Characters[name].backgroundColor }}>
            <img src={Characters[name].image} />
        </div>
    );
}

export default CharacterView;