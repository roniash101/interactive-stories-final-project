import { useState } from "react";

const FooterButton = (props) => {
    const {value, array, setArray} = props;
    const [isActive, setIsActive] = useState(false);

    const onButtonClick = (value) => {
        if (!isActive) {
            setArray([...array, value]);
            setIsActive(true);
        }
        else {
            let copyArray = [...array];
            let index = copyArray.indexOf(value);
            copyArray.splice(index, 1);
            setArray(copyArray)
            setIsActive(false);
        }
    }

    return (
        <div className={`button ${isActive && "active"}`}
            onClick={() => onButtonClick(value)}>
            {value}
        </div>
    );
}

export default FooterButton;