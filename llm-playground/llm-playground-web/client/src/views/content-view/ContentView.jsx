import { useEffect, useRef } from "react";
import CharacterView from "../character-view/CharacterView";
import { Characters } from "../character-view/CharacterView";
import "./ContentView.scss";

const ContentView = () => {

    return (
        <div className="content-view">
            <div className="topper">Scene Description</div>
            <div className="content">
                <CharacterView name={Characters.Lilach.name} />
                <CharacterView name={Characters.Smadar.name} />
                <CharacterView name={Characters.Galit.name} />
                <CharacterView name={Characters.Barak.name} />
            </div>
            <div className="footer">
                <input/>
                <div>Call</div>
                <div>Hang up</div>
            </div>
        </div>
    );
}

export default ContentView;