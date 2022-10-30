<template>
  <div id="AdminArticle">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="日期"
        width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time | fmtTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="姓名"
        width="200">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="hover">
            <p>标题: {{ scope.row.title }}</p>
            <p>介绍: {{ scope.row.des }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.author.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdminArticle",
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log (index, row);
    },
    async handleDelete (index, row) {
      console.log (this.tableData[index]);
      let { _id, src } = this.tableData[index]
      let { data } = await this.$axios ({
        method: 'get',
        url: '/art/delete',
        params: {
          _id, src
        }
      })
      if ( data.code === 200 ) {
        this.$message ({
          message: data.msg,
          type: 'success'
        });
        await this.getAllArt ()
      }

    },
    async getAllArt () {
      let { data } = await this.$axios ({
        url: '/art/all',
        method: 'get'
      })
      this.tableData = data.data
    }
  },

  async mounted () {
    await this.getAllArt ()
  }

}
</script>

<style lang="less" scoped>
#AdminArticle {

}
</style>
