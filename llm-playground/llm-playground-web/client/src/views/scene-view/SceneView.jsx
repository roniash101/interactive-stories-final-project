import { useState } from "react";
import CharacterView from "../character-view/CharacterView";
import Characters from "../../story/Characters";

const SceneView = (props) => {
    const { participants } = props;

    return (
        <div className="scene-view">
            {participants.length > 0 &&
                <div className="column">
                    <CharacterView name={participants[0]} />
                    {participants.length > 3 &&
                        <CharacterView name={participants[3]} />}
                </div>}
            {participants.length > 1 &&
                <div className="column">
                    <CharacterView name={participants[1]} />
                    {participants.length > 2 &&
                        <CharacterView name={participants[2]} />}
                </div>}
        </div>
    );
}

export default SceneView;