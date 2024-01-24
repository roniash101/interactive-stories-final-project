import React, { useState, useEffect } from 'react';

const LoadingDots = ({ size = 8, color = "#444", speed = 1, style }) => {
    const r = size * 0.5;
    const [dotOpacity, setDotOpacity] = useState([1, 0, 0]); // Initial opacity values for the three dots

    useEffect(() => {
        const interval = setInterval(() => {
            // Update opacity values for the dots in sequence
            setDotOpacity((prevOpacity) => [
                prevOpacity[2], // Move the third dot's opacity to the first dot
                prevOpacity[0], // Move the first dot's opacity to the second dot
                prevOpacity[1], // Move the second dot's opacity to the third dot
            ]);
        }, 500); // Adjust the interval duration as needed

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    return (
        <svg width={r * 8} height={size} style={style} xmlns="http://www.w3.org/2000/svg">
            <circle cx={r} cy={r} r={r} fillOpacity={dotOpacity[0]} fill={color}>
                <animate attributeName="fill-opacity" values="0;1;0" dur={`${speed}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={r * 4} cy={r} r={r} fillOpacity={dotOpacity[1]} fill={color}>
                <animate attributeName="fill-opacity" values="0;1;0" dur={`${speed}s`} begin={`${speed / 3}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={r * 7} cy={r} r={r} fillOpacity={dotOpacity[2]} fill={color}>
                <animate attributeName="fill-opacity" values="0;1;0" dur={`${speed}s`} begin={`${speed / 2}s`} repeatCount="indefinite" />
            </circle>
        </svg>
    );
};

export default LoadingDots;