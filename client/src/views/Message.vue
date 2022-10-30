<template>
  <div id="Message">
    <div class="top">
      <img src="../../src/assets/img/message/card.png" alt="">
      <div class="right">
        <h2>留言板</h2>
        <p>请文明发言哦！不然小心禁言、拉黑套餐>.<</p>
        <el-input :rows="10"
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="textarea"
                  maxlength="120"
                  show-word-limit
        >
        </el-input>
        <div class="btn">
          <i
            class="iconfont icon-biaoqing"
            @click.stop="handleToggleEmoji"
          ></i>
          <el-button type="primary" size="mini"
          @click="handleMsgSubmit"
          >发表</el-button>
          <div
            v-show="showEmoji"
            @click.stop
            class="emoji">
            <ul>
              <li
                v-for="item in emoji"
                @click="handleEmojiClick(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>

    <article class="content">
      <ul>
        <li v-for="item in msgData">
          <!--父留言-->
          <div class="parent">
            <!--留言-->
            <div class="left">
              <img :src="urlBase+item.user.tx" alt="">
            </div>
            <div class="right">
              <div class="name-time">
                <span>{{ item.user.username }}</span>
                <span>{{ item.time | fmtTime }}</span>
              </div>
              <div class="message">
                {{ item.msg }}
              </div>
              <div class="like-reply">
                <i
                  class="like iconfont icon-xinaixin"
                  :class="{
                    isLike: item.likes.indexOf(userInfo._id) !== -1
                  }"
                  @click="handleLikesClick(item, item)"
                ></i>
                <span>{{ item.likes.length }}</span>
                <i
                  class="reply iconfont icon-huifu"
                  @click="handleReplyClick(item, item)"
                ></i>
              </div>
            </div>
          </div>
          <!--子留言-->
          <div class="child" v-for="(childItem,childIndex) in item.children">
            <div class="left">
              <img :src="urlBase+childItem.user.tx" alt="">
            </div>
            <div class="right">
              <div class="name-time">
                <span>{{ childItem.user.username }}</span>
                <span>{{ childItem.time | fmtTime }}</span>
              </div>
              <div class="message">
                <span>@{{ childItem.reply.username }}</span>
                {{ childItem.msg }}
              </div>
              <div class="like-reply">
                <i
                  class="like iconfont icon-xinaixin"
                  :class="{
                    isLike: childItem.likes.indexOf(userInfo._id) !== -1
                  }"
                  @click="handleLikesClick(item, childItem, childIndex)"
                ></i>
                <span>{{ childItem.likes.length }}</span>
                <i
                  class="reply iconfont icon-huifu"
                  @click="handleReplyClick(item, childItem)"
                ></i>
              </div>
            </div>
          </div>
          <!--回复框-->
          <div
            class="replyInput"
            :class="{
              'show': item.isShowReply
            }"
          >
            <el-input
              v-model="item.replyTxt"
              :placeholder="'@'+item.replyUser.username"
              size="mini"
            ></el-input>
            <el-button
              class="replyBtn"
              type="primary"
              size="mini"
              @click="handleReplyInputClick(item)"
            >回复
            </el-button>
            <div class="clear"></div>
          </div>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Message",
  data() {
    return {
      textarea: "",
      showEmoji: false,
      showEmail: [],
      emoji: [
        "😃", "😁", "😂", "😊", "🙃", "🥰", "😘", "🤭", "🤔", "😏",
        "😵", "😟", "🙁", "😳", "😰", "😭", "😖", "😡", "😠", "😈",
        "🤡", "☠️", "👻", "🙈", "🙉", "❤️", "💖", "💢", "💣", "💤",
        "👋", "👍", "👌", "🤞", "🤟", "🤙", "👊", "🖕", "🤝", "🙏",
        "🙅", "🙅‍♂️", "👨‍✈️", "👩‍✈️", "👷", "👷‍♀️", "🤦", "🤦‍♂️", "👴", "🧓",
        "🐴", "🐮", "🐖", "🐑", "🐓", "🦚", "🐲", "🐳", "🐟", "🐌",
      ],
      msgData: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    //切换emoji的显示与隐藏
    handleToggleEmoji() {
      this.showEmoji = !this.showEmoji
    },

    //点击每一个emoji的时候，加入input
    handleEmojiClick(item) {
      this.textarea += item
      this.showEmoji = false
    },

    //留言提交

    async handleMsgSubmit() {

      let msg = this.textarea.trim()
      let userId = this.userInfo._id
      //检测用户是否登录
      if (!userId) {
        return this.$message.error("请先登录")
      }
      //检测留言内容是否为空
      if (!msg) {
        return this.$message.error("请先输入留言内容")
      }

      //向后端发请求
      let {data} = await this.$axios({
        method: 'post',
        url: "/msg",
        data: {msg, userId}
      })

      if (data.code !== 0) {
        return this.$message.error(data.msg)
      }

      //留言成功
      this.$message({
        type: "success",
        message: "留言发表成功",
        duration: 1000,
        onClose() {
          window.location.reload()
        }
      })

    },

    //请求留言数据
    async getMsgList() {
      let {data: {data}} = await this.$axios({
        method: 'get'
        , url: "/msg"
      })

      data.filter(item => {
        //用来表示每一条留言的回复输入框的内容
        item.replyTxt = ""
        //用来表示回复的是哪个
        item.replyUser = {...item.user}
        //用来表示当前留言的回复框要不要打开
        item.isShowReply = false
      })

      // console.log(data);

      this.msgData = data
    },

    //like点击
    async handleLikesClick(item, thisItem, childIndex) {
      //是否登录
      let userId = this.userInfo._id
      if (!userId){
        return this.$message.error("请先登录")
      }
      //是点赞还是取消赞
      let likes = thisItem.likes
      let index = likes.indexOf(userId)
      if (index !== -1){
        //取消赞
        likes.splice(index,1)
      }else{
        //点赞
        likes.push(userId)
      }

      //发送到后端
      await this.$axios({
        method: "post",
        url: "/msg/like",
        data: {
          parentId: item._id,
          childId: thisItem._id,
          likes,
          childIndex
        }
      })

    },

    //回复按钮点击
    async handleReplyClick(item, thisItem) {

      //要收起来的情况
      if (
        thisItem.user._id === item.replyUser._id
        && item.isShowReply
      ) {
        item.isShowReply = false
        return
      }

      item.replyUser = thisItem.user
      item.isShowReply = true
    },

    //回复框提交
    async handleReplyInputClick(item) {

      //回复的内容
      let msg = item.replyTxt.trim()
      //当前登录的用户id -- 回复人id
      let user = this.userInfo._id
      //回复的是谁
      let reply = item.replyUser._id
      if (!msg) {
        return this.$message.error("请先输入回复内容")
      }
      if (!user) {
        return this.$message.error("请先登录！")
      }

      let msgId = item._id,
        child = {msg, user, reply}

      let {data} = await this.$axios({
        method: "post",
        url: "/msg/reply",
        data: {msgId, child}
      })

      if (data.code !== 0) {
        return this.$message.error(data.code)
      }

      //回复成功
      this.$message({
        type: "success",
        message: "回复成功",
        duration: 1000,
        onClose() {
          window.location.reload()
        }
      })
    }
  },

  mounted() {
    document.addEventListener("click", () => {
      this.showEmoji = false
    })

    this.getMsgList()
  }
}
</script>

<style scoped lang="less">
#Message {

  .top {
    display: flex;
    justify-content: space-between;

    .right {
      margin-left: 5px;
      padding: 15px 10px 5px;
      background-color: #fff;
      flex: 1;

      h2 {
        border-left: 5px solid rgb(115, 184, 153);
        padding-left: 15px;
      }

      p {
        padding: 20px 0 20px 30px;
        color: #aba9a9;
      }

      .btn {
        position: relative;
        padding-top: 25px;

        > i {
          float: left;
          font-size: 20px;
          margin-top: 5px;
          cursor: pointer;
        }

        .el-button {
          float: right;
        }

        .emoji {
          position: absolute;
          top: 30px;
          background-color: #fff;
          padding: 8px;
          box-shadow: 0 0 3px #aaa;
          user-select: none;

          &::before {
            content: "";
            position: absolute;
            z-index: 3;
            top: -10px;
            left: 5px;
            width: 0;
            height: 0;
            border: 5px solid transparent;
            border-bottom-color: #ccc;
          }

          ul {
            width: 250px;
            height: 150px;
            border-left: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;

            li {
              box-sizing: border-box;
              float: left;
              width: 25px;
              height: 25px;
              border-right: 1px solid #e5e5e5;
              border-top: 1px solid #e5e5e5;
              font-size: 18px;
              line-height: 25px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  article {
    margin-top: 15px;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand", "Microsoft YaHei", sans-serif;

    &.content {
      user-select: none;
      ul {
        li {
          padding-bottom: 5px;
          margin-bottom: 10px;
          border-bottom: 1px dashed #ddd;
          font-size: 12px;
          font-family: "Microsoft YaHei", "sans-serif";

          div.parent, div.child {
            display: flex;
          }

          div.child {
            margin-left: 55px;
            margin-top: 3px;
          }

          div.left {
            overflow: hidden;
            width: 40px;
            height: 40px;
            margin-right: 15px;
            border-radius: 50%;

            img {
              width: 100%;
              height: 100%;
            }
          }

          div.right {
            flex: 1;

            div.name-time {
              font-size: 12px;
              margin-bottom: 3px;

              span:nth-child(1) {
                color: #73b899;
              }

              span:nth-child(2) {
                color: #aaa;
                margin-left: 10px;
                font-family: "Microsoft YaHei", "sans-serif";
              }
            }

            div.message {
              color: #666;
              letter-spacing: 2px;
              margin-bottom: 3px;
              word-break: break-word;

              span {
                color: #409eff;
                margin-right: 5px;
              }
            }

            div.like-reply {
              i {
                cursor: pointer;
                font-size: 14px;
                color: #aaa;
              }
              i.isLike{
                color: #f30606;
              }

              span {
                display: inline-block;
                width: 43px;
                font-size: 12px;
                color: #aaa;
              }
            }
          }
        }
      }
    }

    .replyInput {
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-left: 55px;
      transition: height .3s;

      &.show {
        height: 50px;
      }

      .replyBtn {
        padding: 4px 9px !important;
        float: right;
      }
    }}
}
</style>














