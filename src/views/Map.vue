<template>
  <div id="map">
    <div id="container">
      <Mapmenu :map='map' @show-dialog="handleChildValue"></Mapmenu>
      <el-dialog
          title="关  于"
          :visible.sync="dialog"
          :fullscreen = true
          center>
        <div class="header">
            <img id="icon" v-bind:src="icon">
            <p>{{name}}</p>
        </div>
        <div class="info">
          <span>华广地图是基于Vue全家桶 + TypeScript + Element-UI以及ES6和高德地图Api技术栈的网站。源码已发布在Github上:
            <a href="https://github.com/Magren0321/hgmap">华广地图</a></span><br><br>
          <span>该网站用于服务华广师生更全面的了解学校各场所位置，帮助新生更快熟悉校园。</span><br><br>
          <span>目前该项目还在完善中</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import AMap from '@/config/amap.ts'
import Mapmenu from '@/components/Mapmenu.vue'
import { Component,Vue } from 'vue-property-decorator';

@Component({
  components: {
    Mapmenu
  }
})


export default class Map extends Vue {
  map: any = null
  dialog = false
  //dialog信息
  icon = require('../assets/img/icon.png')
  name = "MAGREN"

  // methods
  //初始化地图
  async initAMap(): Promise<void> {
   try {
    const res: any = await AMap();
    this.map = new res.Map("container", {
      viewMode:'3D', // 地图模式,手机下只有2d效果
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom: 17, //初始化地图层级
      center: [113.172847,23.43399], //初始化地图中心点
      pitch:40, // 地图俯仰角度，有效范围 0 度- 83 度
      buildingAnimation:true, //3d地图显示动画
     });
    }catch (err) {
      console.error(err);
    } 
  }
  
  //显示Dialog，信息
  private handleChildValue(val: boolean) {
        // val: 子组件传过来的值
      this.dialog = val;
  }

   mounted() {
     this.initAMap();
  }
}

</script>

<style lang="scss">
 *{
   margin: 0;
   padding: 0;
 }
#container{
  position: absolute;
  width: 100%;
  height: 100%;
}
.amap-marker-label{ 
  padding: 5px;
  border-radius: 3px;
  border-color: #54B7E7;
  border-width: 0px;
  color:#54B7E7;
}
#icon{
  width: 30%;
  height: 30%;
  border-radius: 100px;
}
.header{
  text-align: center;
}
.info{
  margin-top: 20px;
  text-align: center;
}


</style>
