<template>
  <div id="map">
    <div id="container">
      <Mapmenu></Mapmenu>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import AMap from '@/assets/amap.ts'
import Mapmenu from '@/components/Mapmenu.vue'
import { Component,Vue } from 'vue-property-decorator';

@Component({
  components: {
    Mapmenu
  }
})


export default class Map extends Vue {
  map: any = null
  
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

    
   mounted() {
     this.initAMap();
  }
}

</script>

<style scoped lang="scss">
 *{
   margin: 0;
   padding: 0;
 }
#container{
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
