import { useEffect, useRef } from 'react';

let startTime = null;
let currentAnim = null;

function animateScroll(element, timestamp, start, change, duration) {
    const currentTime = timestamp;
    if (!startTime) startTime = currentTime;
    const easing = (time) => 1 - Math.pow(time - 1, 4); // Quadratic ease-out

    const timeElapsed = currentTime - startTime;
    const percentageComplete = timeElapsed / duration;

    const newPosition = start + change * easing(percentageComplete);

    if (percentageComplete < 1) {
        element.scrollTop = newPosition;
        currentAnim = requestAnimationFrame((newTimestamp) =>
            animateScroll(element, newTimestamp, start, change, duration)
        );
    } else {
        element.scrollTop = start + change;
        startTime = null;
        currentAnim = null;
    }
}

export default function scrollToBottom(element) {
    if (!element || currentAnim) return;
    const start = element.scrollTop;
    const change = element.scrollHeight - element.clientHeight - start;

    const duration = 500 + change * 0.5; // Adjust the duration as needed

    startTime = null;
    currentAnim = requestAnimationFrame((timestamp) => animateScroll(element, timestamp, start, change, duration));
}
