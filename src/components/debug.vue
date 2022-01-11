<template>
  <div>
    <v-btn @click="print">test</v-btn>
    <v-btn @click="toggleRecording" :disabled="!isRecording">{{ isRecording ? 'Stop Recording' : 'DONE' }}</v-btn>
    <v-btn :disabled="isRecording" @click="play">Play</v-btn>
    <v-btn @click="add">dummy</v-btn>
    <p>{{clickCounter}}</p>
    <div :style="{ border: '10px red solid', width: '500px', height: '500px' }" />
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      events: ["mouseup", "keydown", "scroll", "mousemove"],
      startTime: null,
      endTime: null,
      initialWait: 3000,
      intervalWait: 10000,
      totalTime: 0,
      eventLog: [],
      mouseMoveCounter: 0,
      isRecording: true,
      clickCounter: 0
    }
  },
  mounted() {
    this.startTime = Date.now()
    this.endTime = this.startTime + this.initialWait
    // setInterval(function () {
    //   if (!document.hidden && this.startTime <= this.endTime) {
    //     this.startTime = Date.now();
    //     this.totalTime += 1000;
    //     document.getElementById("timer").innerHTML = this.formatTime(this.totalTime);
    //   }
    // }, 1000);
    let that = this
    this.events.forEach(function (e) {
      document.addEventListener(e, function (event) {
        this.endTime = Date.now() + 10000;
        if (e === "mouseup") {
          const time = that.getTime()
          that.eventLog.push({ clickEvent: event, time })
        }
        else if (e === "keydown") {
          const time = that.getTime()
          that.eventLog.push({ keyPressEvent: event, time })
        }
        else if (e === "scroll") {
          const time = that.getTime()
          that.eventLog.push({ scrollEvent: event, time })
        }
        else if (e === "mousemove") {
          that.mouseMoveCounter++
          if (that.mouseMoveCounter % 2 === 0) {
            const time = that.getTime()
            console.log(event)
            that.eventLog.push({ mouseMoveEvent: event, time })
          }
        }
      });
    });
    this.drawCircle(400, 400, "test")
  },

// {
//   mouseMoveEvent: ,
//   scrollEvent,
//   keyPressEvent,
//   clickEvent
//
// }
  created() {

  },
  methods: {
    add () {
      this.clickCounter++
    },
    toggleRecording () {
      this.isRecording = !this.isRecording
      if (this.isRecording === false) {
        this.events.forEach(e => {
          window.addEventListener(e, function(event) {
            event.stopImmediatePropagation();
          }, true);
        })
      }
    },
    play() {
      this.isRecording = true
      this.clickCounter = 0
      this.drawMouse()
      let mouse = document.getElementById("mouse-cursor")
      let startPlayTime = Date.now()
      let that = this
      let playInterval = setInterval(() => {
        let i
        for (i = 0; i < that.eventLog.length; i++) {
          if (that.eventLog[i].time < Date.now() - startPlayTime) {
            if (that.eventLog[i].mouseMoveEvent) {
              mouse.style.top = that.eventLog[i].mouseMoveEvent.clientY + "px"
              mouse.style.left = that.eventLog[i].mouseMoveEvent.clientX + "px"
            } else if (that.eventLog[i].clickEvent) {
              that.eventLog[i].clickEvent.originalTarget.click()
              that.drawCircle(that.eventLog[i].clickEvent.x, that.eventLog[i].clickEvent.y, "circle" + that.eventLog[i].clickEvent.timeStamp)
            }
          } else break
        }
        that.eventLog = that.eventLog.slice(i, that.eventLog.length)
        if (!that.eventLog.length) {
          clearInterval(playInterval)
        }
      }, 100)
    },
    drawCircle (x, y, id) {
      let circle = document.createElement('div')
      let radius = 10
      circle.style.position = "absolute"
      circle.style.width = radius + "px"
      circle.style.height = radius + "px"
      circle.style.borderRadius = "50%"
      circle.style.backgroundColor = "red"
      circle.style.opacity = "0.2"
      circle.style.top = y - radius / 2 + "px"
      circle.style.left = x - radius / 2 + "px"
      circle.setAttribute('id', id)
      document.querySelector('body').appendChild(circle)
      let counter = 0
      const circleInterval = setInterval(() => {
        let circleDOM = document.getElementById(id)
        radius += 3
        circleDOM.style.width = radius + "px"
        circleDOM.style.height = radius + "px"
        circleDOM.style.top = y - radius/ 2 + "px"
        circleDOM.style.left = x - radius / 2 + "px"
        counter++
        if (counter === 20) {
          clearInterval(circleInterval)
          document.querySelector('body').removeChild(circleDOM)
        }
      }, 20)
    },
    drawMouse () {
      let img = document.createElement('img')
      img.src = "https://nodes.alaatv.com/upload/MouseCursor.png"
      img.setAttribute("id", "mouse-cursor")
      document.querySelector('body').appendChild(img)
    },
    print() {
      this.eventLog.forEach(item => {
        console.log(item)
      })
    },
    getTime() {
      return Math.floor((Date.now() - this.startTime) / 100) * 100
    }
  }
}
</script>

<style>
#mouse-cursor {
  position: fixed;
  top: 100px;
  left: 100px;
  width: 16px;
}
</style>
