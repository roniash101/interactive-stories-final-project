import { useAppState } from "../../app-state/AppStateProvider";
import "./ProgressBar.scss";

const ProgressBar = (props) => {
    const { name } = props;
    const { goalProgress } = useAppState();
    const precent = goalProgress[name] * 100;
    const nonZeroPrecent = precent != 0 ? precent : 5;

    const getColor = () => {
        if ((nonZeroPrecent) < 30)
            return "red";
        if ((nonZeroPrecent == 100))
            return "green";
        return "blue";
    }

    return (
        <div className="progress-bar">
            <div className="name">{name}</div>
            <div className="bar">
                <div className="background">
                    <div className={`progress ${getColor()}`} style={{ "width": `${nonZeroPrecent}%` }} />
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;