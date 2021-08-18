<template>
  <button id="game" @click="show()">
    赛车游戏页面
  </button>
  <div class="content">
    <div class="f1 show">
      <img src="./src/assets/f1-text.png">
    </div>
    <div class="logo show">
      <img src="./src/assets/tengxun-logo.jpg">
    </div>
    <div class="animation-wrapper">
      <div class="car move">
        <div class="fly"
        v-for="(pic, index) in cars" 
        :key="index">
          <img :src="pic">
        </div>
      </div>
    <div class="box left-to-right done">
      <div class="text">
        换胎倒计时
      </div>  
        <div class="num">
          <img class="num3" src="./src/assets/num/3.png">
          <img class="num2" src="./src/assets/num/2.png">
          <img class="num1" src="./src/assets/num/1.png">
      </div>
      <div class="start done">
        开始！
      </div>
    </div>
    <div class="timer">
      <div class="timer-title">
        换胎耗时
      </div>
      <div class="time-wrapper center">
        <div class="f48" id="min">
          {{minute}}
        </div>
        <div class="unit f30">
        :
      </div>
      <div id="second" class="f48">
        {{ second }}
      </div>
      <div class="unit f30">
        .
      </div>
      <div id="millisecond" class="f48">
        {{ millisecond }}
      </div>
      </div>
    </div>
    <div class="oldWheel">
      <div class="oldFrontLeft move left1">
        <img src="./src/assets/wheels/left_front_old.png">
      </div>
      <div class="oldFrontRight move right1">
        <img src="./src/assets/wheels/left_front_old.png">
      </div>
      <div class="oldBackLeft move left2">
        <img src="./src/assets/wheels/left_back_old.png">
      </div>
      <div class="oldBackRight move right2">
        <img src="./src/assets/wheels/left_back_old.png">
      </div>
    </div>
    <div class="newWheel">
      <div class="frontLeft fly">
        <img src="./src/assets/wheels/front_new.png">
      </div>
      <div class="frontRight fly">
        <img src="./src/assets/wheels/front_new.png">
      </div>
      <div class="backLeft fly">
        <img src="./src/assets/wheels/back_new.png">
      </div>
      <div class="backRight fly">
        <img src="./src/assets/wheels/back_new.png">
      </div>
      <div class="buttom">
        <button 
        class="change"
        @click="bigger(); random()">
          抬起车身
        </button>
        <button 
        class="btn1"
        @click="left1"
        >
          卸载左前轮
        </button>
        <button 
        class="btn2 "
        @click="right1"
        >
          卸载右前轮
        </button>
        <button 
        class="btn3"
        @click="left2"
        >
          卸载左后轮
        </button>
        <button 
        class="btn4"
        @click="right2"
        >
          卸载右后轮
        </button>
        <button 
        class="btn5"
        @click="show5"
        >
          安装左前轮
        </button>
        <button 
        class="btn6"
        @click="show6"
        >
          安装右前轮
        </button>
        <button 
        class="btn7"
        @click="show7"
        >
          安装左后轮
        </button>
        <button 
        class="btn8"
        @click="show8"
        >
          安装右后轮
        </button>
        <button 
        class="end"
        @click="smaller(); pause()"
        >
          放下车身
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mySetInterval, clearMysetInterval } from './requestAnimationFrameInterval';

const wheel = ['fl', 'fr', 'bl', 'br'];
const number = [0, 1, 2, 3];
export default {
  name: "App",
  data() {
    return {
      cars:[
        'https://new.inews.gtimg.com/tnews/bfca8501/c985/bfca8501-c985-4358-b39d-ccf020258ada.png',
        // 'https://new.inews.gtimg.com/tnews/4a86a3d3/b8a9/4a86a3d3-b8a9-4031-a80a-2070769fc299.png',
      ],
      array: [...number],
      minute: '00',
      second: '00',
      millisecond: '000',
      secondCounter: 0,
      minuteCounter: 0,
      timer: null,
      isStarted: false,
    }
  },
  mounted() {
    const tl = gsap.timeline();
    this.tl = tl;
  },
  computed: {

  },

  methods: {
    show(){
        const tl = gsap.timeline();
        tl.to('.show', {opacity: 1, duration: 0.1}, 0);
        tl.to('.move', {y: -3750, duration: 0.6, delay: 1.6, onCompleteParams:['.left-to-right'], onComplete: this.leftToright}, 0);
        tl.to('.change', {opacity: 1, duration: 0.1, delay: 5});
    },
    leftToright(){
      const tl = gsap.timeline();
      tl.to('.left-to-right', {left: 0, duration: 0.2}, 0);
      tl.fromTo('.num3', {scale: 1}, {delay:0.2, duration: 1, scale: 1.5, opacity: 0});
      tl.fromTo('.num2', {opacity: 0}, {duration: 1, opacity: 1, scale: 1.5, onCompleteParams:['.num2'], onComplete:this.disappear});
      tl.fromTo('.num1', {opacity: 0}, {duration: 1, opacity: 1, scale: 1.5, onCompleteParams:['.num1'], onComplete:this.disappear});
      tl.fromTo('.start', {opacity: 0}, {duration: 1, opacity: 1, scale: 1.5, onCompleteParams:['.done'], onComplete:this.disappear});
    },
    disappear(){
      const tl = gsap.timeline();
      tl.to('.num2', {opacity: 0, duration: 0.00001}, 0);
      tl.to('.num1', {opacity: 0, duration: 0.00001}, 0);
      tl.to('.text', {opacity: 0, delay: 1}, 0);
      tl.to('.done', {opacity: 0, delay: 1, duration: 0.1, onCompleteParams:['.timer'], onComplete:this.start});
    },
    bigger(){
      const tl = gsap.timeline();
      tl.to('.change', {opacity: 0, duration: 0.0001, onCompleteParams:['.btn1'], onComplete:this.btn1});
      tl.fromTo('.car', {scale: 1}, {scale: 1.1, duration: 0.00001});
      tl.fromTo('.oldFrontLeft', {scale: 1}, {scale: 1.2, duration: 0.00001});
      tl.fromTo('.oldFrontRight', {scale: 1}, {scale: 1.2, duration: 0.00001});
      tl.fromTo('.oldBackLeft', {scale: 1}, {scale: 1.2, duration: 0.00001});
      tl.fromTo('.oldBackRight', {scale: 1}, {scale: 1.2, duration: 0.00001});
    },
    left1(){
      const tl = gsap.timeline();
      tl.to('.left1', { x: -1000, duration: 0.2}, 0);
      tl.to('.btn1', {opacity: 0, duration: 0.1}, 0);
      tl.to('.btn2', {opacity: 1, duration: 0.001}, 0);
    },
    left2(){
      const tl = gsap.timeline();
      tl.to('.left2', { x: -1000, duration: 0.2}, 0);
      tl.to('.btn3', {opacity: 0, duration: 0.1}, 0);
      tl.to('.btn4', {opacity: 1, duration: 0.1}, 0);
    },
    right1(){
      const tl = gsap.timeline();
      tl.to('.right1', { x: 1000, duration: 0.2}, 0);
      tl.to('.btn2', {opacity: 0, duration: 0.1}, 0);
      tl.to('.btn3', {opacity: 1, duration: 0.1}, 0);
    },
    right2(){
      const tl = gsap.timeline();
      tl.to('.right2', { x: 1000, duration: 0.2}, 0);
      tl.to('.btn4', {opacity: 0, duration: 0.1}, 0);
      tl.to('.btn5', {opacity: 1, duration: 0.1}, 0);
    },
    random() {
      return this.array.sort(() => 0.5 - Math.random());
    },
    btn1(){
      const tl = gsap.timeline();
      tl.to('.btn1', {opacity: 1, duration: 0.001});
    },
    show5(){
      const tl = gsap.timeline();
      tl.fromTo('.frontLeft', {scale: 1.2, opacity: 0}, {opacity:1});
      tl.to('.btn5', {opacity: 0, duration: 0.1}, 0);
      tl.to('.btn6', {opacity: 1, duration: 0.1}, 0);
    },
    show6(){
      const tl = gsap.timeline();
      tl.fromTo('.frontRight', {scale: 1.2, opacity: 0}, {opacity:1});
      tl.to('.btn6', {opacity: 0, duration: 0.1}, 0);
      tl.to('.btn7', {opacity: 1, duration: 0.1}, 0);
    },
    show7(){
      const tl = gsap.timeline();
      tl.fromTo('.backLeft', {scale: 1.2, opacity: 0}, {opacity:1});
      tl.to('.btn7', {opacity: 0, duration: 0.1}, 0);
      tl.to('.btn8', {opacity: 1, duration: 0.1}, 0);
    },
    show8(){
      const tl = gsap.timeline();
      tl.fromTo('.backRight', {scale: 1.2, opacity: 0}, {opacity:1});
      tl.to('.btn8', {opacity: 0, duration: 0.1}, 0);
      tl.to('.end', {opacity: 1, duration: 0.1}, 0);
    },
    smaller(){
      const tl = gsap.timeline();
      tl.to('.end', {opacity: 0, duration: 0.0001});
      tl.fromTo('.car', {scale: 1.1}, {scale: 1, duration: 0.00001});
      tl.fromTo('.frontLeft', {scale: 1.2}, {scale: 1, duration: 0.00001});
      tl.fromTo('.frontRight', {scale: 1.2}, {scale: 1, duration: 0.00001});
      tl.fromTo('.backLeft', {scale: 1.2}, {scale: 1, duration: 0.00001});
      tl.fromTo('.backRight', {scale: 1.2}, {scale: 1, duration: 0.00001});
      tl.to('.fly', {y: -3750, duration: 1, delay: 0.5}, 0);
    }, 
    setTime({ minute, second, millisecond, secondCounter, minuteCounter }) {
      this.minute = minute;
      this.second = second;
      this.millisecond = millisecond;

      this.secondCounter = secondCounter;
      this.minuteCounter = minuteCounter;
    },
    startTimer() {
      this.isStarted = true;

      this.startSecond();
      this.startMillisecond();
    },
    stopTimer() {
      clearMysetInterval(this.timer); // 停止秒计时器
    },
    startSecond() {

      clearMysetInterval(this.timer); // 先清理

      this.timer = mySetInterval(() => {
        this.secondCounter = this.secondCounter + 1; // 秒累加
        this.second = String(this.secondCounter % 60).padStart(2, '0'); // 秒对 60 取模

        if (this.second === '00') { // 当是 00 时，表示需要进位到分钟
          this.minuteCounter = this.minuteCounter + 1; // 分累加
          this.minute = String(this.minuteCounter % 60).padStart(2, '0'); // 分对 60 取模
        }
         // 当是 00 时，且minuteCounter > 59 时，表示需要进位到小时
        if (this.minute === '00' && this.minuteCounter > 59) {
          this.stop(); // 调动停止方法
        }

      }, 1000);
    },
    startMillisecond() {
      const millisecond = { value: 0 };

      this.tl.resume(); // 恢复毫秒动画

      this.tl.to(millisecond, { // 毫秒动画
        duration: 1,
        repeat: -1,
        value: 999,
        onUpdate: () => {
          this.millisecond = millisecond.value.toFixed(0).padStart(3, '0')
        },
      }, 0);
    },
    pauseMillisecond() {
      this.tl.pause(); // 暂停毫秒动画
    },
    resumeMillisecond() {
      this.tl.resume(); // 恢复毫秒动画
    },
    pauseSecond() {
      this.stopTimer(); // 停止秒计时器
    },
    resumeSecond() {
      this.startTimer(); // 启动秒计时器
    },
    start() { // 开始
      this.setTime({ minute: '00', second: '00', millisecond: '000', secondCounter: 0, minuteCounter: 0 });
      this.startTimer();
    },
    stop() { // 停止
      this.isStarted = false;

      this.setTime({ minute: '59', second: '59', millisecond: '999', secondCounter: 60, minuteCounter: 60 }); // 设置显示时间

      this.pauseMillisecond(); // 停止毫秒动画
      this.stopTimer(); // 停止秒计时器
    },
    pause() { // 暂停
      this.pauseSecond();
      this.pauseMillisecond();
    },
    resume() { // 恢复
      this.resumeSecond();
      this.resumeMillisecond();
    },
    getData() {
      // https://axios-http.com/docs/intro 文档地址
      this.axios(
        {
          method: 'post',
          url: 'https://matchweb.sports.qq.com/active/f1RetDetail',
          params: {
            orderId: 'a92c63dd06fc61fb0e2d227288cb8bf6',
          },
          withCredentials: true
        }
      ).then((response) => {
        console.log(response.data)
      })

      this.axios(
        {
          method: 'post',
          url: 'https://matchweb.sports.qq.com/active/f1RetDetail',
          params: {
            orderId: 'd08383a3d4f853a385582470711e2ad0',
          },
          withCredentials: true
        }
      ).then((response) => {
        console.log(response.data)
      })
    }
  },
};
</script>

<style>
body{
  background-image: url('./src/assets/car-bg.png');
  background-repeat: no-repeat;
  background-size:cover
}
.content{
  text-align: center;
}
.timer{
  color: white;
  margin-top: -3500px;
  font-size: 100px;
  opacity: 1;
}
.time-wrapper {
  display: flex;
  flex-direction: row;
}
.animation-wrapper{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 1880px;
  height: 4000px;

  overflow: hidden;
}
.f1{
  position: absolute;
  top: 2000px;
  left: 800px;
  opacity: 0;
}
.logo{
  position: absolute;
  top: 2000px;
  left: 750px;
  opacity: 0;
}
.car{
  position: absolute;
  left: 650px;
  top: 5030px;
}
.box{
  width: 100px;
  height: 100px;
  background-color: red;
  background-image: linear-gradient(to right, #e74c3c, #c0392b, black);
  opacity: 0.7;
  border: 2px solid red;
}
.left-to-right{
  position: absolute;
  width: 1880px;
  height: 250px;
  box-sizing: border-box;
  left: -1880px;
}
.text{
  color: white;
  font-size: 60px;
  position: absolute;
  left: 800px;
}
.num3{
  position: absolute;
  left: 900px;
  top: 100px
}
.num2{
  position: absolute;
  left: 900px;
  top: 100px;
  opacity: 0;
}
.num1{
  position: absolute;
  left: 900px;
  top: 100px;
  opacity: 0;
}
.start{
  color: white;
  font-size: 80px;
  position: absolute;
  left: 850px;
  top: 70px
}
.oldFrontLeft{
  position: absolute;
  top: 5250px;
  left: 650px;
}
.oldFrontRight{
  position: absolute;
  top: 5250px;
  right: 640px;
}
.oldBackLeft{
  position: absolute;
  top: 6350px;
  left: 620px;
}
.oldBackRight{
  position: absolute;
  top: 6350px;
  right: 610px;
}
.frontLeft{
  position: absolute;
  top: 1500px;
  left:640px;
  opacity: 0;
}
.frontRight{
  position: absolute;
  top: 1500px;
  right: 635px;
  opacity: 0;
}
.backLeft{
  position: absolute;
  top: 2600px;
  left: 620px;
  opacity: 0;
}
.backRight{
  position: absolute;
  top: 2600px;
  right: 610px;
  opacity: 0;
}
.btn1{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  left: 500px;
  top: 1600px;
  opacity: 0;
}
.btn2{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  right: 500px;
  top: 1600px;
  opacity: 0;
}
.btn3{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  left: 500px;
  top: 2700px;
  opacity: 0;
}
.btn4{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  right: 500px;
  top: 2700px;
  opacity: 0;
}
.btn5{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  left: 500px;
  top: 1500px;
  opacity: 0;
}
.btn6{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  right: 500px;
  top: 1500px;
  opacity: 0;
}
.btn7{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  left: 500px;
  top: 2600px;
  opacity: 0;
}
.btn8{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  right: 500px;
  top: 2600px;
  opacity: 0;
}
.change{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  right: 900px;
  top: 2000px;
  opacity: 0;
}
.end{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  right: 900px;
  top: 2100px;
  opacity: 0;
}
</style>
