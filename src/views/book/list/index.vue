<template>
  <box>
    <div>
        <!-- 表格 -->
        <el-table size="mini" :data="tableData" border style="width: 100%">
            <el-table-column prop="ID" label="ID" width="100"></el-table-column>
            <el-table-column prop="NickName" label="下单人" width="180"></el-table-column>
            <el-table-column prop="Status" label="订单状态"></el-table-column>
            <el-table-column prop="BookStatus" label="订餐状态"></el-table-column>
            <el-table-column prop="CreateTime" label="下单时间"></el-table-column>
            <el-table-column prop="StoreName" label="店铺"></el-table-column>
            <el-table-column prop="TotalPrice" label="订单金额"></el-table-column>
            <el-table-column prop="Remark" label="备注"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <status-tag :Status="scope.row.Status"></status-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                    <!-- <el-button type="text" @click="showDetail(scope.$index)" size="mini">详情</el-button> -->
                    <el-button type="text" size="mini" @click="gotoUpdate(scope.row.ID)">编辑</el-button>
                    <el-button type="text" class="color-danger" v-if="scope.row.Status === 1" @click="forbidden(scope.$index)" size="mini">禁用</el-button>
                    <el-button type="text" class="color-success" v-else @click="legal(scope.$index)" size="mini">启用</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
  </box>
</template>
<script>
import box from '@/components/LayoutBox'
import StatusTag from '@/components/StatusTag'
import { GetBookList } from '@/api/book'
export default {
  components: {
    box,
    StatusTag,
  },
  data(){
    return {
      tableData: [],

      Current_Page: 1,
      Current_Size: 10,
      Status: '',
    }
  },
  methods: {
    getList(){
      GetBookList({
        Current_Page: this.Current_Page,
        Current_Size: this.Current_Size,
      }).then(data=>{
        this.tableData = data.data
      })
    },
    changeStatus(Status, onsuccess){
        let cur = this.tableData[this.tableDataIndex]
        UpdateStoreStatus({
            Store_ID: cur.ID,
            Status: Status,
        }).then(data=>{
            if(typeof onsuccess === 'function') onsuccess()
            this.$message.success('设置成功');
        })
    },

    //---------------------------------- action -----------------------------------
    legal(index){
        this.tableDataIndex = index
        this.changeStatus(1, ()=>{
            this.tableData[index].Status = 1
        })
    },
    forbidden(index){
        this.tableDataIndex = index
        this.changeStatus(0, ()=>{
            this.tableData[index].Status = 0
        })
    },

    //--------------------------------- 交互函数 --------------------------------------
    gotoUpdate(id){
      this.$router.push({path: '/store/update', query: {storeid: id}})
    },
  },
  created(){
    this.getList()
  }
}
</script>