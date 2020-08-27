<template>
<div class="content">
<div class="swiper" >
   <img v-bind:src="placeBackground">
</div>
  <div class="header">
      <h2>{{placeName}}</h2>
  </div>
  <hr style="background-color:#F2F4F4;height:10px;border:none;margin-top:10px">
  <div class="introduction">
      <h2>简介</h2>
      <div class="info">
      <p>{{placeDetail}}</p>
      </div>
  </div>
</div>

</template>

<script lang="ts">
import request from '@/utils/request.ts'
import { Component,Vue,Prop,Emit,Watch } from 'vue-property-decorator';

@Component
export default class PlaceDetails extends Vue {

    //接收父组件传来的值
    @Prop()
    placeName!: string;
    
    @Prop()
    placeBackground!: string;

    @Prop()
    placeDetail!: string;
   

}
</script>

<style lang="scss" scoped>
.content{
    max-width: 550px;
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
.header h2{
    position:absolute;
    bottom: 0;
    margin-bottom: 10px;
    margin-left: 10px;
    width: 200px;
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
// .info p{
//     text-indent:2em; 
// }
</style>