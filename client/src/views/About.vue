<template>
  <div id="About">
    <article>
      <h2>About me</h2>
      <p>这是我做的第一个完整项目，当快要完成的时候我是很激动的~~ 这是自己辛苦做出来的~</p>
      <p>由于经验的不足，很多地方可能会有问题！大佬们手下留情捏</p>
    </article>
    <article>
      <h2>学习时长两年半</h2>
      <p>
        在此之后我又学习了React，TS，以及一些框架，和了解了一些我所不知道新的知识，新的框架，轮子，我感觉现在所学的还是太少了，还需要多多锻炼~~</p>
    </article>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style lang="less" scoped>
#About {
  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand", "Microsoft YaHei", sans-serif;

    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }

    p {
      font-size: 16px;
      line-height: 28px;
    }
  }
}
</style>














