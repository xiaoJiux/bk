<template>
  <div id="Link">
    <div class="friend-link">
      <h2>友情链接</h2>
    </div>
    <div class="link-list">
      <ul>
        <li>
          <a href="#">还没有秃😀</a>
        </li>
        <li>
          <a href="#">永远18岁</a>
        </li>
        <li>
          <a href="#">还是一个大学生</a>
        </li>
        <li>
          <a href="#">二次猿😚</a>
        </li>
        <li>
          <a href="#">妖魔鬼怪快离开</a>
        </li>
        <li>
          <a href="#">程序员🤣</a>
        </li>
        <li>
          <a href="#">嘻嘻🤨</a>
        </li>
        <li>
          <a href="#">我命由我不由天😏</a>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Link",
  data () {
    return {}
  },
  methods: {}

}
</script>

<style scoped lang="less">
#Link{
  .friend-link {
    margin-bottom: 1em;
    padding-bottom: 1em;
    transition: border 0.3s;
    border-bottom: 1px solid #ddd;
    h2 {
      color: #6e8aad;
      font-size: 24px;
      font-weight: normal;
    }

  }
  .link-list{
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        border-radius: 2em;
        padding: 0.5em 0.75em;
        margin: 0 1em 1em 0;
        display: inline-block;
        transition: border .3s;
        border: 2px solid rgba(228,228,227);
        a{
          color: inherit;
        }
      }
    }
  }
}
</style>
