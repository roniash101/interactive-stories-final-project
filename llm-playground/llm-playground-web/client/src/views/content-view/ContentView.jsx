import { useEffect, useState } from "react";
import SceneView from "../scene-view/SceneView";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import FooterButton from "../../components/FooterButton";
import Characters from "../../story/Characters";
import { useAppState, useSetAppState } from "../../app-state/AppStateProvider";
import TelephoneIcon from "../../assets/telephone.png";
import storyConfig from '../../story/story-config';
import "./ContentView.scss";

const ContentView = () => {
    const { state, isVictory, title, sceneDescription, participants, interactionEnabled } = useAppState();
    const setAppState = useSetAppState();
    const [plainText, emphasizedText] = sceneDescription.split("*");

    // const [participants, setParticipants] = useState(["Lilach"]);

    // useEffect(() => {
    //     setAppState(participants);
    // }, [participants]);

    const isButtonDisabled = (name) => {
        return (!interactionEnabled && !Characters[name].isInitialCall) || state == 'end' || isVictory;
    }

    const setParticipants = (value) => {
        setAppState({ participants: value });
    }

    const onButtonClick = (name) => {
        setAppState([...participants, name]);
    }

    const onContinueButtonClick = () => {
        setAppState({
            state: 'end',
            sceneDescription: storyConfig.endSceneDescription
        });
    }

    return (
        <div className="content-view">
            <div className="title">
                <div className="container">
                    <h1>{title}</h1>
                    <p className="author">by Roni Ashkenazi</p>
                </div>
            </div>
            <div className="topper">
                {state == 'middle' && <div className="progress-bars">
                    {Object.keys(Characters).map((name, i) => (
                        !Characters[name].isMain ?
                            <ProgressBar name={name} key={i} /> : null
                    ))}
                </div>}
                <p className="scene-description"
                    style={{ "whiteSpace": "pre-line" }}>{plainText}
                    <em className="blink-1">{emphasizedText}</em></p>
            </div>

            <SceneView participants={participants} />

            {state != 'end' && <div className="footer">
                {isVictory && state == 'middle' ?
                    <button className="continue-button"
                        onClick={onContinueButtonClick}>
                        Continue
                    </button> :
                    <>
                        <img src={TelephoneIcon} />
                        {Object.keys(Characters).map((name, i) => (
                            !Characters[name].isMain ?
                                <FooterButton
                                    value={name}
                                    disabled={isButtonDisabled(name)}
                                    color={Characters[name].backgroundColor}
                                    key={i}
                                    array={participants}
                                    setArray={setParticipants} /> : null
                        ))}
                        <a href="https://www.flaticon.com/free-icons/phone" title="phone icons">Phone icons created by Gregor Cresnar - Flaticon</a>
                    </>}
            </div>}
        </div>
    );
}

export default ContentView;