<template>
  <article class="work" style="height: 560px">
    <div class="left">
      <ul>
        <li class="time">2020</li>
        <li class="time">2021</li>
        <li class="time">2022</li>
      </ul>
    </div>
    <div style="height: 420px;" class="content">
      <el-steps direction="vertical" :active="2">
        <el-step></el-step>
        <el-step></el-step>
        <el-step></el-step>
      </el-steps>
    </div>
    <div class="right">
      <ul>
        <li class="work-content">
          <h2>First acquaintance with WEB</h2>
          <p>On the network</p>
          <p>Still remember when I still couldn't do anything. It was very interesting to see the web course on the
            Internet, so I participated in the online training course and began to learn the WEB content
            systematically</p>
        </li>
        <li class="work-content">
          <h2>First acquaintance with WEB</h2>
          <p>On the network</p>
          <p>Still remember when I still couldn't do anything. It was very interesting to see the web course on the
            Internet, so I participated in the online training course and began to learn the WEB content
            systematically</p>
        </li>
        <li class="work-content">
          <h2>First acquaintance with WEB</h2>
          <p>On the network</p>
          <p>Still remember when I still couldn't do anything. It was very interesting to see the web course on the
            Internet, so I participated in the online training course and began to learn the WEB content
            systematically</p>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
export default {
  name: "Work"
}
</script>

<style scoped lang="less">
.work {
  display: flex;

  div.left {
    padding-bottom: 140px;
    ul {
      width: 180px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      li.time {
        position: relative;
        top: 0;
        width: 160px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-weight: 700;
        background-color: #bfe2e6;

        &::after {
          position: absolute;
          top: 0;
          right: -30px;
          content: "";
          width: 0;
          height: 0;
          border: 15px solid transparent;
          border-left-color: #bfe2e6;
        }
      }
    }

  }


  div.right {
    margin-left: 10px;
    ul{
      li{
        height: 197px;
        overflow: hidden;
        line-height: 25px;
      }
      li:nth-child(1) {
        margin-top: 0;
      }
      .work-content {
        > p:nth-child(2) {
          font-size: 36px;
          padding: 10px 0;
        }

        > p:nth-child(3) {
          font-size: 18px;
        }
      }
    }
  }
}
</style>