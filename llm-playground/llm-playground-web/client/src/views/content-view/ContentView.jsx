import { useState } from "react";
import SceneView from "../scene-view/SceneView";
import FooterButton from "../../components/FooterButton";
import Characters from "../../story/Characters";
import { useAppState } from "../../app-state/AppStateProvider";
import "./ContentView.scss";

const ContentView = () => {
    const {sceneDescription} = useAppState();
    const [participants, setParticipants] = useState(["Lilach"]);

    const onButtonClick = (name) => {
        setParticipants([...participants, name]);
    }

    return (
        <div className="content-view">
            <div className="topper">{sceneDescription}</div>

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