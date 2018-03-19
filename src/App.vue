<template>
  <div id="app">
    <Nav :propType='false'/>
    <router-view/>
  </div>
</template>

<script>
import Nav from './view/Nav'
export default {
  name: 'App',
  components: { Nav },
  created(){
  }
}
</script>

<style lang="scss">
html{
  font-size: 62.5%
}
body,ul{
  margin: 0;
  padding: 0;
}
body{
  color: #05161c;
  background-color: #fbf7f0;
}
a:active{
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
@font-face {
  font-family: 'iconfont';  /* project id 587710 */
  src: url('//at.alicdn.com/t/font_587710_9ghquqnu50rltyb9.eot');
  src: url('//at.alicdn.com/t/font_587710_9ghquqnu50rltyb9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_587710_9ghquqnu50rltyb9.woff') format('woff'),
  url('//at.alicdn.com/t/font_587710_9ghquqnu50rltyb9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_587710_9ghquqnu50rltyb9.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    }
    a{
      text-decoration: none;
    }
</style>
