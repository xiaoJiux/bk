<template>
  <div id="Visitor">
    <h4>最近访客</h4>
    <ul>
      <li
        v-for="item in visitorList"
        :style="{backgroundImage:`url(${urlBase}${item.user.tx})`}"
        :title="item.user.user"
      >
        <p>{{item.user.user}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Visitors",
  data(){
    return {
      urlBase: process.env.NODE_ENV === "development"?"http://localhost:3000":"",
      visitorList: []
    }
  },
  methods:{
    async getVisitor(){
      let {data} = await this.$axios({
        method: "get",
        url: "/visit"
      })
      this.visitorList = data.data
    }
  },
  created() {
    this.getVisitor()
  }
}
</script>

<style scoped lang="less">
#Visitor{
  box-sizing: border-box;
  overflow: hidden;
  background-color: #fff;
  width: 100%;
  margin-top: 15px;
  box-shadow: 0 0 4px #ddd;
  padding: 20px;
  > h4 {
    line-height: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e8e9e7;
    color: #383937;
    font-size: 16px;
  }
  ul{
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    li{
      position: relative;
      float: left;
      width: 53px;
      height: 53px;
      margin-right: 6px;
      margin-bottom: 6px;
      background: none no-repeat center center/cover;
      &:nth-child(4n){
        margin-right: 0;
      }
      p{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 16px;
        background-color: rgba(0,0,0,.5);
        color: #fff;
        text-align: center;
        line-height: 16px;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
