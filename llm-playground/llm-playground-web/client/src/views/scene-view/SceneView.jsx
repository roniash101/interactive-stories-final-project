import { useState } from "react";
import { useAppState } from "../../app-state/AppStateProvider";
import CharacterView from "../character-view/CharacterView";
import Characters from "../../story/Characters";
import ConcertImage from "../../assets/concert.png";
import Confetti from "../../assets/confetti2.gif";

const SceneView = (props) => {
    const { participants } = props;
    const { state } = useAppState();

    return (
        <div className="scene-view">
            {state == 'end' ?
                <div className="end-scene">
                    <img className="concert" src={ConcertImage} />
                    <img className="confetti" src={Confetti} />
                    <h2>The End.</h2>
                </div>
                :
                <>
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
                </>}
        </div>
    );
}

export default SceneView;