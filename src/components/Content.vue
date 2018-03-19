<template>
<div id="Content">
  <article>
    <h1></h1>
    <p>{{text}}</p>
  </article>
</div>  
</template>
<script>
import Nav from "../view/Nav";
export default {
  name: "Content",
  data() {
    return {
      data: "默认",
      text: ""
    };
  },
  components: { Nav },
  watch: {
    $route(to, from) {
      this.data = `${to}/${from}`;
      console.log(to, from);
    }
  },
  created() {
    let _that = this;
    this.$http.get("/api/api/home?start").then(res => {
      _that.text = res.data[0].text;
    });
  }
};
</script>
<style lang="scss" scoped>
article {
  padding: 0 1rem;
  p {
    text-indent: 1em;
  }
}
</style>



