<template>
    <article class="hello">
      <h2>HELLO!</h2>
      <p class="des">嘿嘿！欢迎到来这里，参观我的博客！目前我还是一位在校的大学生，在学习前端。热衷于JavaScript，HTML，CSS，VUE，同时现在以及未来会对Uni-app，nodejs，React，微信小程序进行学习....这是我的主页！我将在这里记录下我的浅薄的技术文章和日常。博客目前使用的技术是Vue+Element+Node+Koa+MongDB搭建的。欢迎大家来
        <a href="">这里</a>多多指教，我这个菜鸟。</p>
      <div class="info">
        <div class="personal">
          <h3>personal information</h3>
          <ul>
            <li>
              <p class="dt">NICKNAME</p>
              <p class="dd">flycat</p>
            </li>
            <li>
              <p class="dt">ADDRESS</p>
              <p class="dd">浙江省杭州市</p>
            </li>
            <li>
              <p class="dt">EMAIL</p>
              <p class="dd">2565104767@qq.com</p>
            </li>
            <li>
              <p class="dt">GITHUB</p>
              <p class="dd"><a href="https://github.com/xiaoJiux" target="_blank">https://github.com/flycatso</a></p>
            </li>
          </ul>
        </div>
        <div class="skills">
          <h3>skills</h3>
          <ul>
            <li>
              <p class="lang">
                <span class="s1">HTML5 & CSS3</span>
                <span class="s2">90%</span>
              </p>
              <p class="level">
                <span style="width: 90%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Javascript</span>
                <span class="s2">65%</span>
              </p>
              <p class="level">
                <span style="width: 65%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">NodeJs</span>
                <span class="s2">50%</span>
              </p>
              <p class="level">
                <span style="width: 50%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Vue & React & 小程序</span>
                <span class="s2">70%</span>
              </p>
              <p class="level">
                <span style="width: 70%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">git</span>
                <span class="s2">15%</span>
              </p>
              <p class="level">
                <span style="width: 15%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">React</span>
                <span class="s2">50%</span>
              </p>
              <p class="level">
                <span style="width: 50%"></span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </article>
</template>

<script>
export default {
  name: "Hello"
}
</script>

<style scoped lang="less">
.hello {
  div.info {
    display: flex;
    width: 100%;

    > div {
      display: flex;
      flex-direction: column;
    }
  }

  div.personal {
    overflow: hidden;
    width: 50%;

    ul {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      li {
        display: flex;

        p.dt {
          width: 40%;
          font-weight: 700;
        }

        p.dd {
          width: 60%;
        }
      }
    }
  }

  div.skills {
    overflow: hidden;
    width: 50%;

    ul {
      li {
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }

        p.lang {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          letter-spacing: 2px;

          span.s1 {
            font-size: 14px;
          }

          span.s2 {
            font-size: 12px;
            color: #999;
          }
        }

        p.level {
          width: 100%;
          height: 5px;
          background-color: #ececec;

          span {
            display: block;
            height: 100%;
            background-color: #bfe2e6;
          }
        }
      }
    }
  }

  h3 {
    margin-bottom: 30px;
    font-weight: 400;
    font-size: 22px;
    color: #666;
  }

}
</style>
