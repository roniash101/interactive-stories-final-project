import { useEffect, useState } from "react";
import SceneView from "../scene-view/SceneView";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import FooterButton from "../../components/FooterButton";
import Characters from "../../story/Characters";
import { useAppState, useSetAppState } from "../../app-state/AppStateProvider";
import "./ContentView.scss";

const ContentView = () => {
    const { title, sceneDescription, participants } = useAppState();
    const setAppState = useSetAppState();
    // const [participants, setParticipants] = useState(["Lilach"]); //todo: add phone ring etc..

    // useEffect(() => {
    //     setAppState(participants);
    // }, [participants]);

    const setParticipants = (value) => {
        setAppState({ participants: value });
    }

    const onButtonClick = (name) => {
        setAppState([...participants, name]);
    }

    return (
        <div className="content-view">
            <div className="title">{title}</div>
            <div className="topper">
                <div className="progress-bars">
                {Object.keys(Characters).map((name, i) => (
                    !Characters[name].isMain ?
                        <ProgressBar name={name} key={i} /> : null
                ))}
                </div>
                <p>{sceneDescription}</p>
            </div>

            <SceneView participants={participants} />

            <div className="footer">
                {Object.keys(Characters).map((name, i) => (
                    !Characters[name].isMain ?
                        <FooterButton
                            value={name}
                            key={i}
                            array={participants}
                            setArray={setParticipants} /> : null
                ))}
            </div>
        </div>
    );
}

export default ContentView;