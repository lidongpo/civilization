<template>
  <div class="Nav">
    <header>
      <div class="menu">
      <nav>
        <ul>
          <li v-for="(item,i) in nav.sub1" :key="i">
            <router-link :to="{path:'/',query:{type:item.type}}" exact>{{item.text}}</router-link>
          </li>
        </ul>
        
      </nav>
      </div>
        <nav class="sub-menu">
          <ul>
            <li v-for="(item,i) in nav.sub2" :key="i">
              <a href="">{{item.text}}</a>
            </li>
          </ul>
        </nav>
      </header>
  </div>
</template>
<script>
export default {
  name: "Nav",
  data() {
    return {
      nav: {
        sub1: null,
        sub2: null
      }
    };
  },
  props: ["propType"],
  created() {
    let _that = this;
    this.$http
      .all([
        this.$http.get("/api/api/home?index"),
        this.$http.get("/api/api/home?CONCEPTS")
      ])
      .then(
        _that.$http.spread(function(index, concepts) {
          [_that.nav.sub1, _that.nav.sub2] = [index.data, concepts.data];
        })
      );
  }
};
</script>
<style lang="scss" scoped>
.Nav {
  .menu {
    width: 100%;
    height: 3rem;
    position: relative;
    background-color: #e0dfdd;
    overflow: hidden;
    nav {
      height: 3.46rem;
      overflow-x: auto;
      white-space: normal;
      ul {
        display: flex;
        padding: 0 1rem;
        width: 105em;
        li {
          margin-right: 1rem;
          list-style: none;
          a {
            display: block;
            color: inherit;
            line-height: 3rem;
          }
        }
      }
    }
  }
  .menu::after{
    position: absolute;
    content: "";
    height: 1px;
    width: 100%;
    border-top: 1px solid #b1babb;
    bottom: 2px;
  }
  .menu::before{
    position: absolute;
    content: "";
    height: 1px;
    width: 100%;
    border-top: 1px solid #b1babb;
    top: 2px;
  }
  .sub-menu {
    // background-image: url('../assets/bg3.jpg');
    ul{
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto auto auto;
      li{
        padding: 1rem;
        list-style:none;
        text-align: center;
        a{
          color: lightcoral;
        }
      }

    }
  }
}
</style>
