import {Model} from 'js-abstract-model'
import {TimerInfo} from "@/models/TimerInfo";

class Timer extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'passedTime',
                relatedModel: TimerInfo
            },

            {
                key: 'remainingTime',
                relatedModel: TimerInfo
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


    }

    updateTimer() {
        this.updateDiffs(Date.now(), this.start.getTime(), this.passedTime)
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

        let second = 1000
        let minute = 1000 * 60
        let hour = 1000 * 60 * 60
        let day = 1000 * 60 * 60 * 24

        let diff = Math.abs(upperTime - lowerTime);
        targetTime.days = Math.floor(diff / day);
        diff -= targetTime.days * day;
        targetTime.hours = Math.floor(diff / hour);
        diff -= targetTime.hours * hour;
        targetTime.minutes = Math.floor(diff / minute);
        diff -= targetTime.minutes * minute;
        targetTime.seconds = Math.floor(diff / second);
    }

}


export {Timer}
