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
        backgroundColor: "#ccd5ae",
        isMain: true
    },
    Smadar: {
        name: "Smadar",
        image: Character2,
        backgroundColor: "#fefae0",
        isMain: false
    },
    Galit: {
        name: "Galit",
        image: Character4,
        backgroundColor: "#f8ad9d",
        isMain: false
    },
    Barak: {
        name: "Barak",
        image: Character1,
        backgroundColor: "#faedcd",
        isMain: false
    }
};

export default Characters;