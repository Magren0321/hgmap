<template>
  <div id="map">
    <div id="container">
      <Mapmenu :map='map' @show-dialog="handleChildValue" @get-place-name="getPlaceName"></Mapmenu>
       <el-dialog
          title="介  绍"
          :visible.sync="placeIntroduction"
          :fullscreen = true
          center>
        <PlaceDetails style="margin-top:54px" :placeName ='placeName' :placeBackground ='placeBackground' :placeDetail ='placeDetail'></PlaceDetails>
       </el-dialog>
      <el-dialog
          title="关  于"
          :visible.sync="dialog"
          :fullscreen = true
          center>
        <div class="about">  
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
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import AMap from '@/config/amap.ts'
import Mapmenu from '@/components/Mapmenu.vue'
import PlaceDetails from '@/components/PlaceDetails.vue'
import { Component,Vue } from 'vue-property-decorator';
import { AxiosPromise } from 'axios';
import request from '../utils/request';

@Component({
  components: {
    Mapmenu,
    PlaceDetails
  }
})


export default class Map extends Vue {
  map: any = null
  dialog = false
  
 
  //dialog信息
  icon = require('../assets/img/icon.png')
  hmicon = require('../assets/img/hmicon.png')
  name = "星空学生创新中心"

  placeIntroduction = false
  placeName = ''
  placeBackground = ''
  placeDetail = ''
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
     this.personOptions(this.map)
    }catch (err) {
      console.error(err);
    } 
  }
  //添加定位
  personOptions(map: any): void{
    const win: any = window 
    const options = {
    'enableHighAccuracy': true,//是否使用高精度定位，默认:true
    'showButton': true,//是否显示定位按钮
		'buttonPosition': 'LB',//定位按钮的位置
		/* LT LB RT RB */
		'buttonOffset': new win.AMap.Pixel(20, 30),//定位按钮距离对应角落的距离
		'showMarker': true,//是否显示定位点
		'markerOptions':{//自定义定位点样式，同Marker的Options
		  'offset': new win.AMap.Pixel(0, -5), //marker相对定位点的距离
		  'content':'<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
		},
		'showCircle': true,//是否显示定位精度圈
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

   //获取地点的详细信息
    getPlacedetal(place: string): Promise<any>{
        return request({
         url:'/down?place='+place,
         method: 'get'
     }).then((response)=>{
       if(response.data.errorcode == 0){
          this.placeIntroduction = true
          this.placeDetail = response.data.data.introduction
          const bg = "http://119.23.17.233:8080/storage/"+response.data.data.img.substring(6)
          this.placeBackground = bg
       }
     }).catch((error)=>{
       console.log(error)
     })
   }
 
  //显示Dialog，信息
  private handleChildValue(val: boolean): void {
        // val: 子组件传过来的值
      this.dialog = val;
  }
  //显示地点，信息
  private handleIntroduction(val: boolean): void{
    // val: 子组件传来的值
    this.placeIntroduction = val
  }
  private getPlaceName(val: string): void{
    this.placeName = val
    this.getPlacedetal(this.placeName)
  }
   mounted(): void{
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
.about{
  margin-top:54px;
  max-width: 550px;
  margin: auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
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
.el-dialog__wrapper{
  z-index:99999!important;
}


</style>
