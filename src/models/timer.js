import {Model} from 'js-abstract-model'

class Timer extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'passedTime',
                default: {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    intervals: {
                        second: 1000,
                        minute: 1000 * 60,
                        hour: 1000 * 60 * 60,
                        day: 1000 * 60 * 60 * 24
                    }
                }
            },

            {
                key: 'remainingTime',
                default: {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    intervals: {
                        second: 1000,
                        minute: 1000 * 60,
                        hour: 1000 * 60 * 60,
                        day: 1000 * 60 * 60 * 24
                    }
                }
            },
            {
                key: 'end',
                default: new Date()
            },
            {
                key: 'start',
                default: new Date()
            }


        ])
        let today = new Date()
        this.start.setMinutes(today.getMinutes() - 20)
        this.end.setMinutes(today.getMinutes() + 1)
        // currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        let event = new Date()
        event.setHours(today.getHours() - 1)
    }
    updateTimer() {
        this.updateDiffs(Date.now(), this.start.getTime(), this.passedTime )
        if (this.end.getTime() > Date.now()) {
            this.updateDiffs(this.end.getTime(), Date.now(), this.remainingTime)

        } else {
            this.remainingTime.days = 0
            this.remainingTime.hours = 0
            this.remainingTime.minutes = 0
            this.remainingTime.seconds = 0
        }
    }
    updateDiffs(upperTime, lowerTime, targetTime) {

        let diff = Math.abs(upperTime - lowerTime);
        targetTime.days = Math.floor(diff / targetTime.intervals.day);
        diff -= targetTime.days * targetTime.intervals.day;
        targetTime.hours = Math.floor(diff / targetTime.intervals.hour);
        diff -= targetTime.hours * targetTime.intervals.hour;
        targetTime.minutes = Math.floor(diff / targetTime.intervals.minute);
        diff -= targetTime.minutes * targetTime.intervals.minute;
        targetTime.seconds = Math.floor(diff / targetTime.intervals.second);
    }

}


export {Timer}
