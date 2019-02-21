<style scoped>
    .cell{display: flex; justify-content: space-between; font-size: 14px; line-height: 24px;}
    .cell-hd, .cell-ft{min-width: 40px; flex-shrink: 0;}
    .cell-ft{text-align: right;}
    .cell-bd{flex: 1;}
</style>

<template>
    <div>
        <!-- 表格 -->
        <el-table size="mini" :data="tableData" border style="width: 100%">
            <el-table-column prop="ID" label="ID" width="100"></el-table-column>
            <el-table-column prop="NickName" label="昵称" width="180"></el-table-column>
            <el-table-column prop="UserName" label="姓名"></el-table-column>
            <!-- <el-table-column prop="Status" label="状态"></el-table-column> -->
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <status-tag :Status="scope.row.Status"></status-tag>
                    <!-- <el-tag size="small" v-if="scope.row.Status === 1" type="success">启用</el-tag>
                    <el-tag size="small" v-else type="danger">禁用</el-tag> -->
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" @click="showDetail(scope.$index)" size="mini">详情</el-button>
                    <!-- <el-button type="text" size="mini">编辑</el-button> -->
                    <el-button type="text" class="color-danger" v-if="scope.row.Status === 1" @click="forbiddenUser(scope.$index)" size="mini">禁用</el-button>
                    <el-button type="text" class="color-success" v-else @click="legalUser(scope.$index)" size="mini">启用</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 详情弹窗 -->
        <el-dialog title="用户详情" :visible.sync="detailVisible">
            <div class="detail" v-if="tableData && tableData[tableDataIndex]">
                <div class="cell">
                    <div class="cell-hd">昵称</div>
                    <div class="cell-ft">{{tableData[tableDataIndex].NickName}}</div>
                </div>
                <div class="cell">
                    <div class="cell-hd">姓名</div>
                    <div class="cell-ft">{{tableData[tableDataIndex].UserName}}</div>
                </div>
                <div class="cell">
                    <div class="cell-hd">状态</div>
                    <div class="cell-ft">
                        <status-tag :Status="tableData[tableDataIndex].Status"></status-tag>
                    </div>
                </div>
                <div class="cell">
                    <div class="cell-hd">常登录IP</div>
                    <div class="cell-ft">{{tableData[tableDataIndex].DefaultIP}}</div>
                </div>
                <div class="cell">
                    <div class="cell-hd">曾登录IP</div>
                    <div class="cell-ft">{{tableData[tableDataIndex].IPs}}</div>
                </div>
                <div class="cell">
                    <div class="cell-hd">创建时间</div>
                    <div class="cell-ft">{{tableData[tableDataIndex].CreateTime}}</div>
                </div>
            </div>
            <div v-else class="tips">
                <p>没有数据</p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="detailVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { GetUserList, UpdateStatus } from '@/api/user'
import StatusTag from '@/components/StatusTag'
export default {
    components: {
        StatusTag,
    },
    data() {
        return {
            tableData: [],
            tableDataIndex: 0,

            Current_Page: 1,
            Current_Size: 10,

            // 详情弹窗
            detailVisible: false,
        };
    },
    methods: {
        getList(){
            GetUserList({
                Current_Page: this.Current_Page,
                Current_Size: this.Current_Size,
            }).then(data=>{
                console.log(data)
                this.tableData = data.data
            })
        },
        changeUserStatus(Status, onsuccess){
            let user = this.tableData[this.tableDataIndex]
            UpdateStatus({
                User_ID: user.ID,
                Status: Status,
            }).then(data=>{
                if(typeof onsuccess === 'function') onsuccess()
                this.$message.success('设置成功');
            })
        },

        //---------------------------------- action -----------------------------------
        legalUser(index){
            this.tableDataIndex = index
            this.changeUserStatus(1, ()=>{
                this.tableData[index].Status = 1
            })
        },
        forbiddenUser(index){
            this.tableDataIndex = index
            this.changeUserStatus(0, ()=>{
                this.tableData[index].Status = 0
            })
        },

        //查看详情
        showDetail(index){
            this.tableDataIndex = index
            this.detailVisible= true
        },
    },
    created(){
        this.getList()
    }
};
</script>