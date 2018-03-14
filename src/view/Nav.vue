<template>
  <div class="Nav" :class="{open:sideShow}">
      <nav>
        <ul>
          <li class="item" v-for="(item,i) in data" :key='i' @touchstart.stop="getGroup(Object.keys(item).toString(),i,1)">
            <a  v-for=" (val,index) in item" :key="index">{{val.name}}</a>
            <div v-if="i ==group.index" class="sub_nav">
            <ul>
              <li class="item sub_item" v-for="(todo,j) in group.data1" :key="j" @touchstart.stop="getGroup(Object.keys(todo).toString(),j,2)">
                <a href="javascript:;" v-for="(val,g) in todo" :key="g">{{val}}</a>
                {{j}}-{{group.index}}
                {{j==group.index}}
                <div v-if="j==group.index">
                  <ul>
                    <li class="item sub_item" v-for="(todos,k) in group.data2" :key="k">
                      <a href="javascript:;" v-for="(vals,z) in todos" :key="z">{{vals}}</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            </div>
          </li>
        </ul>
      </nav>
      <div class="mask" @touchstart="hidePannel"></div>
    <div class="warp">
      <a class="iconfont menu" href="javascript:;" @touchstart="openNav">&#xe62f;</a>
      <div id="title">
          <img class="logo" alt="Sid Meier's Civilization VI " src="../assets/civ6rf_marquee_logo_light.png" /> 
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nav",
  data() {
    return {
      data: null,
      sideShow: false,
      active: false,
      group: {
        status: 0,
        index: "",
        data1: null,
        data2:null,
      }
    };
  },
  props: ["propType"],
  methods: {
    openNav() {
      this.sideShow = true;
    },
    hidePannel() {
      this.sideShow = false;
    },
    getGroup(arg, i,sub){
      let that = this;
      this.$http.get("/api/api/home?" + arg).then(res => {
        console.log(i,arg)
        that.group.status = 0;
        that.group.index = i;
        if(sub==1){
          that.group.data1 = res.data;
        }else{
          that.group.data2 = res.data;
        }
        console.log(that.group)
      });
    }
  },
  created() {
    let that = this;
    this.$http.get("/api/api/home?INDEX").then(res => {
      that.data = res.data;
    });
  }
};
</script>
<style lang="scss" scoped>
.Nav .warp {
  display: flex;
  align-items: center;
}
.Nav.open nav,
.Nav.open .mask {
  transform: translate(0, 0);
}
.Nav nav,
.Nav .mask {
  position: fixed;
  top: 0;
}
.Nav {
  nav {
    padding-left: 1rem;
    width: 70vw;
    height: 100vh;
    background: #f9f9f9;
    z-index: 1;
    box-shadow: 0 0 5px rgba(142, 98, 86, 0.3);
    overflow-y: scroll;
    overflow-x: hidden;
    transition: all 0.4s;
    transform: translate(-74vw, 0);
    ul {
      padding-left: 1rem;
    }
    .item {
      padding: 1rem 0;
      list-style: none;
      a {
        color: #232323;
      }
      .sub_item {
        padding-left: 2rem;
      }
    }
    .sub_nav {
    }
  }
  .mask {
    width: 100vw;
    height: 100vh;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.1);
    transform: translate(-100vw, 0);
  }
}
.menu {
  padding-left: 1rem;
  position: absolute;
  font-size: 2rem;
  color: #fff;
}
#title {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/civ6rf_marquee_1.jpg");
  background-size: cover;
  .text {
    font-size: 2.2rem;
    color: #fbf8ec;
    text-shadow: 0 0 5px #8e6256;
  }
  .logo {
    width: 60%;
    box-shadow: 0 1px 5px rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
}
</style>
