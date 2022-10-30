<template>
  <article>
    <h2>ARTICLE</h2>
    <p class="des">热门文章推荐。
      <router-link to="/article">更多文章</router-link>
      请访问文章页&gt;.&lt;
    </p>
    <div class="content">
      <div class="left">
        <div class="art">
          <img src="../../assets/img/article/l1.jpg" alt="">
          <p class="title">标题标题标题标题标题标题标题标题标</p>
          <div class="cover">
            <a href="">
              <p>Tag: HTML</p>
              <p>View More</p>
            </a>
          </div>
        </div>
        <div class="art">
          <img src="../../assets/img/article/l2.jpg" alt="">
          <p class="title">标题标题标题标题标题标题标题标题标</p>
          <div class="cover">
            <a href="">
              <p>Tag: HTML</p>
              <p>View More</p>
            </a>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="art">
          <img src="../../assets/img/article/r1.jpg" alt="">
          <p class="title">标题</p>
          <div class="cover">
            <a href="">
              <p>Tag: HTML</p>
              <p>View More</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "Article",
}
</script>

<style scoped lang="less">

.content{
  display: flex;
  div.left {
    box-sizing: border-box;
    width: 50%;
    padding-right: 1px;

    .art:nth-child(1) {
      box-sizing: border-box;
      padding-bottom: 1px;
    }

    .art:nth-child(2) {
      box-sizing: border-box;
      padding-top: 1px;
    }
  }

  div.right {
    box-sizing: border-box;
    width: 50%;
    padding-left: 1px;
  }
  .left,.right{
    width: 50%;
    box-sizing: border-box;
    padding:1px;

    img {
      display: block;
      width: 100%;
    }
    .art {
      overflow: hidden;
      position: relative;

      p.title {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30px;
        background-color: rgba(0, 0, 0, .1);
        font-weight: 700;
        line-height: 30px;
        color: #fff;
        text-align: center;
        transition: bottom .3s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      div.cover {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;

        a {
          display: block;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, .5);
          opacity: 0;
          transition: opacity .6s;

          p {
            position: absolute;
            transition: .3s;
            font-weight: 700;
          }

          p:nth-child(1) {
            top: 20%;
            width: 100%;
            text-align: center;
            color: #fff;
            font-size: 22px;
            text-transform: uppercase;
          }

          p:nth-child(2) {
            left: 50%;
            bottom: 20%;
            width: 30%;
            height: 32px;
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
            transform: translateX(-50%);
            color: #000;
            background-color: #bfe2e6;
          }
        }
      }

      &:hover {
        p.title {
          bottom: -30px;
        }

        div.cover a {
          opacity: 1;

          p:nth-child(1) {
            top: 32%;
          }

          p:nth-child(2) {
            bottom: 32%;
          }
        }
      }
    }
  }
}
</style>