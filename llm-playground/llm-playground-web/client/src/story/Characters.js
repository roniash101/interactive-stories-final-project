import Character1 from "../assets/character1.png";
import Character2 from "../assets/character2.png";
import Character3 from "../assets/character3.png";
import Character4 from "../assets/character4.png";
import SpeakingBubble from "../assets/speaking-bubble.png";
import ThinkingBubble from "../assets/thinking-bubble.png";

export const Characters = {
    Lilach: {
        name: "Lilach",
        image: Character3,
        backgroundColor: 'rgb(255 239 192)', //'#F9EDCB', //"#ccd5ae",
        isMain: true,
        isInitialCall: false
    },
    Smadar: {
        name: "Smadar",
        image: Character4, 
        backgroundColor: "#F7D9C4", //"#fefae0",
        isMain: false,
        isInitialCall: false
    },
    Galit: {
        name: "Galit",
        image: Character2,
        backgroundColor: 'rgb(183 239 228)', //"#C9E3DE", //"#f8ad9d",
        isMain: false,
        isInitialCall: true
    },
    Barak: {
        name: "Barak",
        image: Character1,
        backgroundColor: "#DCCEE5", //"#faedcd",
        isMain: false,
        isInitialCall: false
    }
};

export default Characters;