<template>
    <div id="menu">
      <div class="menuIcon">
          <icon name="about" :w="30" :h="30" ></icon>
      </div>
      <div class="menuIcon">
          <icon name="school" :w="30" :h="30" ></icon>
      </div>
      <div class="menuIcon">
          <icon name="bus" :w="30" :h="30" ></icon>
      </div>
      <div class="menuIcon" @click="toPageVR">
          <icon name="VR" :w="30" :h="30" ></icon>
      </div>
    <el-dropdown :hide-on-click="false" @command="switchItem">
      <div class="menuIcon">
          <icon name="more" :w="30" :h="30" ></icon>
      </div>
     <el-dropdown-menu slot="dropdown">
       <el-scrollbar>
        <el-dropdown-item command="校门">校门</el-dropdown-item>
        <el-dropdown-item command="饭堂">饭堂</el-dropdown-item>
        <el-dropdown-item command="教学楼">教学楼</el-dropdown-item>
        <el-dropdown-item command="行政楼">行政楼</el-dropdown-item>
        <el-dropdown-item command="图书馆">图书馆</el-dropdown-item>
        <el-dropdown-item command="商业街">商业街</el-dropdown-item>
        <el-dropdown-item command="学生宿舍">学生宿舍</el-dropdown-item>
        <el-dropdown-item command="活动中心">活动中心</el-dropdown-item>
        <el-dropdown-item command="生活服务">生活服务</el-dropdown-item>
        <el-dropdown-item command="体育场所">体育场所</el-dropdown-item>
       </el-scrollbar>
     </el-dropdown-menu>
    </el-dropdown>
    </div>
</template>

<script lang="ts">
import { Component,Vue,Prop } from 'vue-property-decorator';
import markers from '@/config/markers.ts'


@Component
export default class Mapmenu extends Vue {
  
  YunVR = "https://720yun.com/t/79f26j8Ounf?scene_id=8751914"
  
  @Prop()
  private map: any
  // methods
  switchItem(command: string):  void{
    const win: any = window
    let i = markers()[0];
    console.log(i);
    this.map.setZoomAndCenter(i.zoom,[i.centerLongitude,i.centerLatitude])
    i = markers()[0].data
    for(let k = 0; k<i.length;k++){
      const marker = new win.AMap.Marker({
      position: new win.AMap.LngLat(i[k].longitude, i[k].latitude),   
    });
    marker.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
        offset: new win.AMap.Pixel(0, -1),  //设置文本标注偏移量
        content:i[k].name, //设置文本标注内容
        direction: 'top' //设置文本标注方位
    });
    this.map.add(marker)
    }  
  }
  toPageVR(): void{
    window.location.href = this.YunVR
  }
    
  
}

</script>

<style scoped lang="scss">
#menu{
  z-index: 1;
  background: #ECECEC ;
  border-radius: 10px;
  width: 45px; 
  height:210px;
  position:absolute;
  top:0;
  right:0;
  filter:alpha(Opacity=80);-moz-opacity:0.6;opacity: 0.6;
  margin-top: 10px;
  margin-right: 10px;
}
.menuIcon{
  margin-top: 10px;
  
}
.el-scrollbar{
   height:250px;
}

</style>