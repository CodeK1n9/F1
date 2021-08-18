<template>
  <div id="start">
    <div class="animation-wrapper">
    <div class="title top">
      <img src="./src/assets/slogan.png" alt="Slogan">
    </div>
  <div class="content">
    <div class="swiper-container">
      <div class="swiper-wrapper top">
        <div
          v-for="(pic, index) in array"
          :key="index"
          class="swiper-slide"
        >
          <img :src="pic">
        </div>
      </div>
    </div>
  </div>
  <div class="bottom">
    <button
      v-show="isShowPre"
      class="btn1 left"
      @click="pre"
    >
    <img src="./src/assets/left-arrow.png">
    </button>
    <button
      class="btn2 down"
      @click="fly"
    >
    <img src="./src/assets/start.png">
    </button>
    <button
      v-show="isShowNext"
      class="btn3 right"
      @click="next"
    >
    <img src="./src/assets/right-arrow.png">
    </button>
  </div>
  </div>
</div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css';
import gsap from 'gsap';
// import {car} from '../assets/car.json';

const { fetchInfo, redirectToLoginV2 } = window.TencentSports.mlogin;

export default {
  name: "App",
  data() {
    return {
      teamIndex:1,
      orderId: [
        '36de01e2f163216fe4f78bc38b9dd21b',
        'd08383a3d4f853a385582470711e2ad0',
        '0f2fb37c1a782b1e4b00464ccaf18df6',
        '076d6ca37683d934f40a5e014a81d208',
        '6eedfb717cabb72740193fdfbe4aee86',
        '2e76fc414795522287c86259be4a54b1',
        '50d98598740c8c4c4f11f361d557bcd9',
        '7f826908377f618c6bd150cb05566b48',
        'bb398f7e2341d0a29952b57e27efffe0',
        '6f0b8f871b862d9854e18a3ebc359aa1',
        ],
      array: [
        'https://new.inews.gtimg.com/tnews/593d56ab/cb10/593d56ab-cb10-4cf9-a755-740e6230bfe7.png',
        'https://new.inews.gtimg.com/tnews/164394d7/cd1b/164394d7-cd1b-4f13-af18-c13e13d86761.png',
        'https://new.inews.gtimg.com/tnews/fed016a7/5125/fed016a7-5125-4b98-b4b6-abdf8598084d.png',
        'https://new.inews.gtimg.com/tnews/dabd45c0/2f00/dabd45c0-2f00-4215-a698-fabeffb8859d.png',
        'https://new.inews.gtimg.com/tnews/5981d669/d822/5981d669-d822-4a43-aeeb-4eb19c246a40.png',
        'https://new.inews.gtimg.com/tnews/7e072959/ec56/7e072959-ec56-44c9-97ee-9819d85403a2.png',
        'https://new.inews.gtimg.com/tnews/7ecf5c6c/69ff/7ecf5c6c-69ff-4e4c-ab2b-92ff98438c54.png',
        'https://new.inews.gtimg.com/tnews/e0edef94/17f4/e0edef94-17f4-4f76-945b-8acb28a693e8.png',
        'https://new.inews.gtimg.com/tnews/ae722a9d/75cf/ae722a9d-75cf-4cbd-8549-24e0fd4c5303.png',
        'https://new.inews.gtimg.com/tnews/8cc4d5cd/d139/8cc4d5cd-d139-4009-bb0b-0bf180278b2d.png',
      ],
    }
  },
  mounted() {
    this.login();
    this.initSwiper();
  },
  computed:{
      isShowPre() { // 当前索引不是第一个时，显示
      return this.teamIndex !== 0;
      },
      isShowNext() { // 当前索引不是最后一个时，显示
      return this.teamIndex !== this.array.length - 1;
      },
    },

  methods: {
    fly(){
      const tl = gsap.timeline();

      tl.to('.top', { y: -2000, duration: 0.3 }, 0);
      tl.to('.left', { x: -300, duration: 0.3 }, 0);
      tl.to('.right', { x: 300, duration: 0.3 }, 0);
      tl.to('.bottom', { y: 300, duration: 0.3, onCompleteParams:['.bottom'], onComplete:this.start }, 0, );
      tl.to('.disappear',{opacity: 0, duration: 0.2}, 0)
    },


    initSwiper () {
      const vm = this;
      const swiper = new Swiper('.swiper-container', {
        centeredSlides: true, // 设定为true时，active slide会居中
        slidesPerView: '3', // 'auto'则自动根据slides的宽度来设定数量
        initialSlide: vm.teamIndex, // 初始化索引
        on: {
          slideChange() { // 滑动时，实时改变索引
            vm.teamIndex = this.activeIndex;
          },
        },
      })

      this.swiper = swiper;
    },

    pre() { // 滑前一个
      this.swiper.slideTo(this.teamIndex - 1, 500, true);
    },
    next() { // 滑后一个
      this.swiper.slideTo(this.teamIndex + 1, 500, true);
    },
    start(){
      window.location.href="http://omgfront.sports.qq.com:3000/pages/game/index.html" 
    },


    login() {
      fetchInfo(({ isLogin, isStrong }) => {
        if (!(isLogin && isStrong)) { // 未登录
          redirectToLoginV2({});
          return;
        }
        // this.getData();
      });
    },
    getData() {
      // https://axios-http.com/docs/intro 文档地址
      this.axios(
        {
          method: 'get',
          url: 'https://matchweb.sports.qq.com/active/f1Entrance',
          params: {
            isRetry: 0,
            teamName: '梅赛德斯'
          },
          withCredentials: true
        }
      ).then((response) => {
        console.log(response.data)
      })
    },
  },
};
</script>

<style>
body{
  background-image: url('./src/assets/home-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.title{
  text-align: center;
}
.content{
  text-align: center;
}
.btn1{
  border-radius: 1000px;
  position: absolute;
  left: 300px;
}
.btn2{
  border-radius: 1000px;
  position: absolute;
  left: 600px;
}
.btn3{
  border-radius: 1000px;
  position: absolute;
  right: 300px;
}  
.code {
  text-align: center;
  margin-bottom: 0px;
  color: white;
}
.animation-wrapper {
  overflow: hidden;  
}
.swiper-container{
  height: 500px;
  width: 100%;
}
.swiper-slide {
      text-align: center;
      
    
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
	    transition: 300ms;
	    transform: scale(0.3);
    }
	.swiper-slide-active,.swiper-slide-duplicate-active{
      transform: scale(0.5);
  }


</style>
