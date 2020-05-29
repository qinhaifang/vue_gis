<template>
  <div id="app">
    <div class="nav">
      <ul class="list">
        <li @click="zonghe">综合</li>
        <li @click="Modulethree">区域</li>
        <li @click="Kong">安全</li>
      </ul>
    </div>

<!--        <ces class="ces"></ces>-->
      <router-view class="module"></router-view>


  </div>
</template>

<script>
  // import ces from "./components/CesiumExample/No01-init.vue"
export default {

  name: "App",
  components: {
    // HelloWorld
    // ces
  },
  methods:{
    zonghe(){
      this.$router.push('/')
    },
    Modulethree(){
      this.$router.push('Modulethree');
      // this.$initCesium.removeAll();
    },
    Kong(){
      this.$router.push('Kong')
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0px;
}
body{
  width: 100%;
  height: 100%;
}
.m1{
  width: 100px;
  height: 50px;
  background-color: gray;
  cursor: pointer;
  border-radius: 8px;
  z-index: 3;
}
.nav{
  width:50px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  background-color: #fff;
}
.nav .list{
  width: 50px;
  height: 100%;
  /*background-color: cyan;*/
  list-style: none;
}
.list li{
  width: 50px;
  height: 50px;
  line-height: 50px;
  background-color:rgb(14,36,67);
  color:gray;
  /*border-radius: 5px;*/
  text-decoration:none;
  cursor: pointer;
}
.list li:hover{
  color:white;
}
  .module{
    width: 100%;
    height: 100%;
    z-index: 2;
    /*margin-top: 120px;*/
  }
</style>
