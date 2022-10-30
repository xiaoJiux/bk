<template>
  <div id="Article">
    <article class="hello">
      <h2>欢迎来到我的文章页~</h2>
    </article>
    <article v-for="item in articleList">
        <img :src="`${urlBase}${item.cover}`"  alt="">
        <div class="right">
          <p class="title">{{ item.title }}</p>
          <p class="content">{{ item.des }}</p>
          <div>
            <span>1111</span>
            <router-link :to="`/article/${item._id}`">阅读全文</router-link>
          </div>
        </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Article",
  data(){
    return {
      articleList: [],
      url: require("@/assets/img/article/1.jpg")
    }
  },
  async created(){
    let {data} = await this.$axios({
      method: "get",
      url: "/art/all"
    })
    console.log(data.data);
    this.articleList = data.data
  }
}
</script>

<style scoped lang="less">

#Article{
  font-family: "Quicksand","Microsoft YaHei",sans-serif;
  article{
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    max-height: 200px;
    display: flex;
    overflow: hidden;
    img:hover{
      box-shadow: 1px 1px 3px 3px #afadad;
      cursor: pointer;
    }
    .right{
      flex-grow: 1;
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title{
        font-weight: 600;
        font-size: 24px;
        cursor: pointer;
      }
      .content{
        font-weight: 200;
        font-size: 18px;
      }
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        a{
          padding: 10px 20px;
          background-color: #409eff;
          color: #fff;
          transition: opacity .3s;
        }
      }
    }
  }
}
</style>














