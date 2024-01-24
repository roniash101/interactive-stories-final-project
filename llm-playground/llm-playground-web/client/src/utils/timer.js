class Timer {
    constructor(duration, callBack) {
        this.duration = duration;
        this.callBack = callBack;
    }

    start() {
        if (typeof this.timeoutID === 'number') {
            this.cancel();
        }

        this.timeoutID = setTimeout(() => {
            this.callBack();
        }, this.duration);
    }

    cancel() {
        clearTimeout(this.timeoutID);
    }
}

export default Timer;
