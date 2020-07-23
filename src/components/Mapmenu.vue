<template>
    <div id="menu">
         <icon name="about" :w="30" :h="30" class="menuIcon"></icon>
         <icon name="school" :w="30" :h="30" class="menuIcon"></icon>
         <icon name="bus" :w="30" :h="30" class="menuIcon"></icon>
         <icon name="VR" :w="30" :h="30" class="menuIcon"></icon>
         <icon name="more" :w="30" :h="30" class="menuIcon"></icon>
    </div>
</template>

<script lang="ts">
import { Component,Vue } from 'vue-property-decorator';

@Component
export default class Mapmenu extends Vue {
  

  // methods
 
    
  
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
</style>