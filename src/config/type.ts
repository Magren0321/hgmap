export interface PointData{
    name: string; //坐标名
    latitude: number;  //纬度
    longitude: number;  //经度
}
export interface Point{
    type: string;  //点击item的类型
    centerLatitude: number;  //地图中心纬度
    centerLongitude: number;  // 地图中心经度
    zoom: number;  //层级
    data: PointData[];  //坐标
}