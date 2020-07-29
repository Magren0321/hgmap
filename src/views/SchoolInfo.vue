<template>
<div class="content">
<div class="swiper" >
   <img v-bind:src="img2">
</div>
  <div class="header">
      <img v-bind:src="schoolIcon">
      <P>华南理工大学广州学院</P>
  </div>
  <hr>
  <div class="contact">
      <div class="place">
      <icon name="place" :w="15" :h="15"></icon>
      </div>
      <p id="placetext">广州市花都区学府路1号华南理工大学广州学院</p>
      <div class="phonecall">
      <icon name="phonecall" :w="15" :h="15"></icon>
      </div>
      <p id="phonetext">020-66609166</p>
  </div>
  <hr style="background-color:#F2F4F4;height:10px;border:none;margin-top:10px">
  <div class="introduction">
      <h2>简介</h2>
      <hr>
      <div class="info">
      <p>华南理工大学广州学院坐落于广东省广州市，是教育部批准设立的一所以工科为主，经济、管理、文学、理学、艺术协调发展的多科性大学。由举办方华南理工大学和投资方广州珠江云峰投资控股有限公司合作创办，是数据中国“百校工程”项目建设院校、广东省大学生创新创业教育示范学校、广州市知识产权试点学校、中国第一所IACBE国际认证大学。</p>
      </div>
      <div class="video">
          <video controls="controls">
              <source v-bind:src="movie" type="video/mp4" />
          </video>
      </div>
  </div>
</div>

</template>

<script lang="ts">
import { Component,Vue } from 'vue-property-decorator'
import SwiperClass, { SwiperOptions } from 'swiper'


export default class SchoolInfo extends Vue {
 
    img2 = require('../assets/img/swiper2.png')
    schoolIcon = require('../assets/img/headerIcon.png')
    movie = "https://vdse.bdstatic.com/b8e43010cbe84f9073b89922af6e740b.mp4?authorization=bce-auth-v1%2Ffb297a5cc0fb434c971b8fa103e8dd7b%2F2017-05-11T09%3A02%3A31Z%2F-1%2F%2Fcb6633d96cd1ef0e83cfc99e038c12779e68083e36a72129d56af50947155ebe"
    

    //methods
    
}
</script>

<style scoped lang="scss">
.content{
    position: absolute;
    margin: auto;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
    max-width: 600px;
    
}
.swiper img{
    width: 100%;
    height: 200px;
}
.header{
    position: relative;
    width: 100%;
    height: 100px;
    z-index: 1;
    margin-top: -50px;
}
.header img{
    width:90px;
    border-radius: 100px;
    left: 0;
    margin-left: 5%;
    position: absolute;
}
.header p{
    position:absolute;
    bottom: 0;
    margin-bottom: 15px;
    margin-left: 35%;
    font-size: 120%;
    width: 200px;
}
.contact{
    width: 100%;
    position: relative;
    text-align: left;
    margin-top: 5px;    
}
#placetext{
    margin-left: 25px;
    height: 20px;
    font-size:13px;
    display: block;
    line-height: 20px;
    text-align: center;
    width:280px
}
#phonetext{
    margin-left: 23px;
    height: 20px;
    font-size:13px;
    display: block;
    line-height: 20px;
    text-align: center;
    width:100px
}
.place{
    position: absolute;
    left: 0;
    margin-left: 10px;
}
.phonecall{
    position: absolute;
    left: 0;
    margin-left: 10px;
}
.introduction{
    text-align: left;
    margin-top: 10px;
}
.introduction h2{
    margin-left: 10px;
}
.introduction hr{
    margin-top:5px
}
.info{
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: left;
}
.info p{
    text-indent:2em; 
}
.video video{
    margin-left: 5%;
    width: 90%;
    height: 250px;
}
</style>