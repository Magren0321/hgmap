<template>
  <div id="map">
    <div id="container">
      <Mapmenu :map='map' @show-dialog="handleChildValue"></Mapmenu>
      <el-dialog
          title="关  于"
          :visible.sync="dialog"
          :fullscreen = true
          center>
        <div class="headericon">
            <img id="staricon" v-bind:src="icon">
        </div>
        <div class="titilename">
          <p>{{name}}</p>
        </div>
        <div class="info">
          <p>华广地图是由星空学生创新中心开发运营，用于服务华广师生更全面了解学校场所以及帮助新生快速熟悉校园的一款产品。</p>
          <p>该网站有基本的定位功能并且可用于显示常用校巴路线以及上下车点，和标记大部分学校场所所在地点，同时用户可通过全景功能看到学校整体面貌。</p>
          <p>其中,学校全景由华广航模协会授权予星空学生创新中心使用。</p>
        </div>
        <div class="hm">
          <img v-bind:src="hmicon">
          <p>华广航模协会</p>
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
  hmicon = require('../assets/img/hmicon.png')
  name = "星空学生创新中心"

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
     this.personOptions(this.map,true)
    }catch (err) {
      console.error(err);
    } 
  }
  //添加定位
  personOptions(map: any,showOptions: boolean): void{
    const win: any = window 
    const options = {
    'showButton': showOptions,//是否显示定位按钮
		'buttonPosition': 'LB',//定位按钮的位置
		/* LT LB RT RB */
		'buttonOffset': new win.AMap.Pixel(20, 30),//定位按钮距离对应角落的距离
		'showMarker': true,//是否显示定位点
		'markerOptions':{//自定义定位点样式，同Marker的Options
		  'offset': new win.AMap.Pixel(18, -36),
		  'content':'<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
		},
		'showCircle': false,//是否显示定位精度圈
		'circleOptions': {//定位精度圈的样式
			'strokeColor': '#0093FF',
			'noSelect': true,
			'strokeOpacity': 0.5,
			'strokeWeight': 1,
			'fillColor': '#02B0FF',
			'fillOpacity': 0.25
		}
    }
    map.plugin(["AMap.Geolocation"], function() {
        const geolocation = new win.AMap.Geolocation(options);
        map.addControl(geolocation);
        //添加上下面这句话后打开地图中心便会转移到用户定位点
        // geolocation.getCurrentPosition()
    });
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
#staricon{
  margin-top: 30px;
  width: 200px;
  clear: both;
  display: block;
  margin: auto;
}
.titilename{
  text-align: center;
}
.titilename p{
  margin-top: 40px;
  font-size: 23px
}
.info{
  text-align: center;
}
.info p{
  margin-top: 20px;
  font-size: 17px;
}
.hm{
  height: 100px;
  display: flex;
}
.hm img{
  margin-top: 20px;
  margin-left: 9%;
  border-radius: 100px;
  width: 80px;
  
}
.hm p{
  margin-left: 10px;
  margin-top:40px;
  font-size: 20px;
}

</style>
