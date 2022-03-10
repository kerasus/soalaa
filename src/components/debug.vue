<template>
  <div>
    <vue-tiptap-katex
        ref="editor"
      :loading="false"
      :options="{ poem: true, reading: true, bubbleMenu: false, floatingMenu: false, uploadServer: { url: '/api/v1/question/upload/620e09bd2079aa7c1b00cf8d', headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYjJjYThmNTQ5YTRiYThjODBkMjBmYzVhMDNjN2Y3MjJjNzhjY2NiMjI2NTIyNzRmMzQzYWVhYWRlNGRlY2E0ODBiZjk0OWQ5OTRiNGZiNGYiLCJpYXQiOjE2NDI2NzQ1MzYuNzAxNDcyLCJuYmYiOjE2NDI2NzQ1MzYuNzAxNDc1LCJleHAiOjE2NzQyMTA1MzYuNzAwMTg3LCJzdWIiOiIxNjYzMDIiLCJzY29wZXMiOltdfQ.MTKkljpODVJVP7JyhJgC7wK7wObtjK0aEZOYgDHPB5qLDecay-Nc6zQ7If3R8qmjxlRO7qDBtZZZ-z7Y0w0ZKHNpSb64AkSoMKvAFEzvZzb3-rYHR-aNVqI5L3o6LHbi_l5fusd6z90lPjdKh7qLbgkzW4H97iAMcEfJ1MA5aItgeJQvrKZI1ex4R3OoQnvLKIUtfAmCVSyY-hc3_Kh9wDDcWKmWL42CMOAmqxDduPXb09h1v_3JbMzgzR_gQU0omvNmIeEymMONRdYjUUTTNeSCsQ4uUICpXP5Z1KBPhYePbHDGtuIG-ZTK5RVha5PJkPbm6Kegw3uLpUSDgcR-5mLqQRxnrzvyLTv_YWyO4K542uoQNqMCCzJSOA1iMrXlOZSw-VkFsC1WJ-w46a6GuBDa2r3JSaoKhPOAwAw1nH8fdmmF-TfmjuZsogTzvPohIMphkqV4Sp3up7QIq_Die8IoBsag8mMfcl7IcKWLqr0yP3MfSya2Fhy_sMrr7CKAkA0I0oWEIyD0uEckT6nYDS-cJ35wLmX6_MHFG0P_DTtcvnRR2bHKRLBz2GaCfeLCdqGxIi1shytwu2FknChKkbo7QgqxH89Fu1mG2h6qxV5s9yHAGSIk0OWsXOvHFN94SbH0NVu8uFYtyC0O28444bOg9F8ht0B97pJKzMNYUxs' } } }"
    />
    <v-btn @click="print">
      test
    </v-btn>
    <v-btn
      :disabled="!isRecording"
      @click="toggleRecording"
    >
      {{ isRecording ? 'Stop Recording' : 'DONE' }}
    </v-btn>
    <v-btn
      :disabled="isRecording"
      @click="play"
    >
      Play
    </v-btn>
    <v-btn @click="add">
      dummy
    </v-btn>
    <p>{{ clickCounter }}</p>
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
import vueTiptapKatex from 'vue-tiptap-katex'

export default {
  components: {
    vueTiptapKatex
  },
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
    this.$refs.editor.setContent("test")
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
    // this.html = this.convertToTiptap(this.html)
    // this.setSocket()
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
