//异步加载地图
export default function MapLoader(): Promise<void>{
  return new Promise((resolve, reject) => {
    // TypeScript在编译时对window类型做了判断,不允许使用window.xx，先改成any即可使用
    const win: any = window  
    if (win.AMap) {
      resolve(win.AMap)
    } else {
      const url='https://webapi.amap.com/maps?v=1.4.15&key=ba6c5cc2366f96d5beb9e1025c6d88aa&callback=onLoad'
      const script: HTMLScriptElement = document.createElement('script')
      script.src = url
      script.onerror = reject
      document.head.appendChild(script)
    }
    win.onLoad = () => {
      resolve(win.AMap)
    }
  })
}
