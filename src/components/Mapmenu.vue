<template>
    <div id="menu">
      <div class="menuIcon" @click="showDialog">
          <icon name="about" :w="30" :h="30" ></icon>
      </div>
      <div class="menuIcon">
          <icon name="school" :w="30" :h="30" ></icon>
      </div>
      <div class="menuIcon" @click="schoolBus">
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
import { Component,Vue,Prop,Emit } from 'vue-property-decorator';
import markers from '@/config/markers.ts'

@Component
export default class Mapmenu extends Vue {
  
  YunVR = "https://720yun.com/t/79f26j8Ounf?scene_id=8751914"
  show = true

  //接收父组件传来的值
  @Prop()
  private map: any

  //向父组件传值
  @Emit()
  private showDialog(){
    return this.show
  }

  // methods
  //不同item选项
  switchItem(command: string):  void{
    const win: any = window
    this.map.clearMap()
    //商业街绘制路线
    if(command == "商业街"){
       const polygonPath = [
         //贝瑟尔曲线
        [113.171845,23.434300],
        [113.17200,23.433215,113.171310,23.432625]
       ];
       // 创建线覆盖物
      const polygon = new win.AMap.BezierCurve({
        path: polygonPath,
        isOutline: true,
        outlineColor: '#ffeeff',
        borderWeight: 3, //边框大小
        strokeColor: "#41ACE0",  //边框颜色
        strokeOpacity: 4,
        strokeWeight: 12,
        // 折线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50,
      });
      this.map.add(polygon)
      this.map.setZoomAndCenter(19,[113.171811,23.433564])
      const marker = new win.AMap.Marker({
          position: new win.AMap.LngLat(113.171688,23.433279),   
       })
      marker.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
          offset: new win.AMap.Pixel(0, -3),  //设置文本标注偏移量
          content:"商业街", //设置文本标注内容
          direction: 'top' //设置文本标注方位
      }); 
      this.map.add(marker)
      return
    }
    //非商业街
    const i = markers()
    for(let z = 0; z< i.length;z++){
      if(i[z].type ==  command){
          this.map.setZoomAndCenter(i[z].zoom,[i[z].centerLongitude,i[z].centerLatitude])
          const p = i[z].data
          for(let k = 0; k<p.length;k++){
              const marker = new win.AMap.Marker({
                  position: new win.AMap.LngLat(p[k].longitude, p[k].latitude),   
              })
              marker.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
                  offset: new win.AMap.Pixel(0, -3),  //设置文本标注偏移量
                  content:p[k].name, //设置文本标注内容
                  direction: 'top' //设置文本标注方位
              }); 
          this.map.add(marker)
        }
        break 
      }
    }
  }
  //VR网页
  toPageVR(): void{
    window.location.href = this.YunVR
  }
  //显示校巴路线
  schoolBus(): void{
    this.map.clearMap()
    const win: any = window
    //行驶路线标点
    const path = [
      [113.173348,23.429987], //校门口
      [113.173189,23.430175],
      [113.17173,23.429122],
      [113.171145,23.429742],
      [113.171145,23.429742],
      [113.171145,23.429742], //图书馆
      [113.170934,23.430076],
      [113.170505,23.431164],
      [113.170397,23.431572],
      [113.170135,23.43455],
      [113.170215,23.434954],
      [113.170408,23.435539],
      [113.170489,23.435672],
      [113.170655,23.43581],
      [113.170811,23.435844],
      [113.170837,23.435854],
      [113.17103,23.435889],
      [113.171545,23.435864], //三饭
      [113.170934,23.437759],
      [113.172393,23.43771] //四饭
    ];
    //添加折线
    const polyline = new win.AMap.Polyline({
        path: path,
        isOutline: true,
        outlineColor: '#049DF1',
        borderWeight: 2,
        strokeColor:'#ffeeff', 
        strokeOpacity: 1,
        strokeWeight: 2,
        // 折线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50,
    })
    this.map.add(polyline) //将折线添加到地图
    this.busPoint(); //添加上下车点
    this.map.setZoomAndCenter(17,[113.172247,23.43199])
  }
  //显示校巴上下车点
  busPoint(): void{
    const win: any = window
    //中途下车点
    const getOffPoint = [
      [113.170508,23.43118], //图书馆/一饭
      [113.17025,23.43306], //c3
      [113.170229,23.433405], //c4
      [113.171545,23.435864], //三饭
      [113.171361,23.436451], //c8
      [113.171141,23.437101], //c9
      [113.171436,23.437736], //c16门口
    ]
    //上下车点
    const getOnPoint = [
      [113.173348,23.429987], //校门口
      [113.172393,23.43771] //四饭
    ]
    //添加下车点
    for(let k = 0; k<getOffPoint.length;k++){
          const marker = new win.AMap.Marker({
              position: getOffPoint[k],   
          })
          marker.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
              offset: new win.AMap.Pixel(0, -3),  //设置文本标注偏移量
              content:"下", //设置文本标注内容
              direction: 'left' //设置文本标注方位
          }); 
      this.map.add(marker)
    }
    //添加上车点
    for(let k = 0; k<getOnPoint.length;k++){
          const marker = new win.AMap.Marker({
              position: getOnPoint[k],   
          })
          marker.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
              offset: new win.AMap.Pixel(0, -3),  //设置文本标注偏移量
              content:"上/下", //设置文本标注内容
              direction: 'right' //设置文本标注方位
          }); 
      this.map.add(marker)
    }
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