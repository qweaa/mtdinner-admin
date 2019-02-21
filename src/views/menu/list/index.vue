<template>
  <box>
    <div>
        <!-- 表格 -->
        <el-table size="mini" :data="tableData" border style="width: 100%">
            <el-table-column prop="ID" label="ID" width="100"></el-table-column>
            <el-table-column prop="MenuName" label="菜单名称" width="180"></el-table-column>
            <el-table-column prop="Price" label="价格(元)"></el-table-column>
            <el-table-column prop="IsComment" label="是否通用"></el-table-column>
            <el-table-column label="使用日期">
                <template slot-scope="scope">
                    <p v-if="scope.row.IsComment === 1">全日期通用</p>

                    <p v-else-if="scope.row.IsComment === 2">{{scope.row.Month}}月使用</p>

                    <p v-else-if="scope.row.IsComment === 3">每周{{scope.row.Week}}使用</p>

                    <p v-else-if="scope.row.IsComment === 4">每月{{scope.row.Week}}号使用</p>

                    <p v-else-if="scope.row.IsComment === 5">{{scope.row.Year + '年中' + scope.row.Month + '月' + scope.row.Day}}日使用</p>
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
import { GetMenuList, UpdateMenuStatus } from '@/api/menu'
import { GetRules } from '@/api/rules'
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
      IsComment: '',
    }
  },
  methods: {
    getList(Store_ID){
      GetMenuList({
        Store_ID: Store_ID,
        Current_Page: this.Current_Page,
        Current_Size: this.Current_Size,
        Status: this.Status,
        IsComment: this.IsComment,
      }).then(data=>{
          this.tableData = data.data
      })
    },
    changeStatus(Status,callback){
        UpdateMenuStatus({
            Menu_ID: this.tableData[this.tableDataIndex].ID,
            Status: Status,
        }).then(data=>{
            if(typeof callback === 'function') callback(data)
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
      this.$router.push({path: '/menu/update', query: {menuid: id}})
    },
  },
  created(){
    GetRules().then(data=>{
        this.getList(data.data.ActiveStoreID)
    })
  }
}
</script>