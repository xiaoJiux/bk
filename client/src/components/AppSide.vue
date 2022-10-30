<template>
  <div id="AppSide">
    <!--个人信息-->
    <Personal/>

    <!--吸附大盒子-->
    <div
      class="sticky"
      :class="{
        'fixed': ifFixed
      }"
    >
      <!--热门文章-->
      <HotArticle></HotArticle>
      <!--最新访客-->
      <Visitor></Visitor>
    </div>

  </div>
</template>

<script>
import Personal from "@/components/Personal";
import HotArticle from "@/components/HotArticle";
import Visitor from "@/components/Visitor";

export default {
  name: "AppSide",
  components: {
    Personal,HotArticle,Visitor
  },
  data(){
    return {
      ifFixed: false
    }
  },
  methods: {
    //滚动吸顶
    fixed(){
      window.addEventListener("scroll",()=>{
        let scrollTop = document.documentElement.scrollTop
        this.ifFixed = scrollTop >= 240
      })
    }
  },
  mounted() {
    this.fixed()
  }
}
</script>

<style scoped lang="less">
#AppSide {
  width: 270px;
  margin-right: 15px;

  .sticky{
    width: 270px;
    &.fixed{
      position: fixed;
      top: 65px;
    }
  }
}
</style>














