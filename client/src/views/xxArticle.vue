<template>
  <div id="xxArticle" v-if="doc.title">
    <h1>{{ doc.title }}</h1>
    <p class="author-time">
      作者：{{ doc.author.user }} 时间：{{ doc.time | fmtTime }}
    </p>
    <div id="article-content" ref="mdToHTML"></div>
  </div>
</template>

<script>
export default {
  name: "xxArticle",
  data() {
    return {
      doc: {}
    }
  },
  watch: {
    "$route": function () {
      this.refresh()
    }
  },
  methods: {
    async refresh() {
      // 知道文章的id，以便于向后端查询数据
      let id = this.$route.params.id
      //向后端查询文章id对应的信息
      let res = await this.$axios({
        method: 'get',
        url: "/art/id",
        params: {id}
      })

      this.doc = res.data.data

      let {data} = await this.$axios({
        method: 'get',
        url: this.doc.src
      })
      this.$refs.mdToHTML.innerHTML = ""
      editormd.markdownToHTML("article-content", {
        markdown: data,
        toc: false,
        emoji: true,
        taskList: true,
        tex: true,
        flowChart: true,
        sequenceDiagram: true
      })
    }
  },
  mounted() {
    this.refresh()
  },
}
</script>

<style scoped lang="less">
#xxArticle {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  margin-bottom: 15px;
  box-shadow: 0 0 4px #ddd;
  padding: 15px;
  background-color: #fff;
  font-family: "Quicksand", "Microsoft YaHei", sans-serif;

  h1 {
    text-align: center;
  }

  .author-time {
    text-align: center;
    font-size: 12px;
    font-family: "Microsoft YaHei", "sans-serif";
    color: #aaa;
  }

  #article-content {
    max-width: 100% !important;
    padding: 0 !important;
  }
}
</style>