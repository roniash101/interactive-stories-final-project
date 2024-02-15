import { useEffect, useRef } from "react";
import "./ContentView.scss";

const ContentView = () => {

    return (
        <div className="content-view">
            <div className="topper">Scene Description</div>
            <div className="content">
                <div>Charcter1</div>
                {/* <div>Charcter2</div>
                <div>Charcter3</div> */}
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