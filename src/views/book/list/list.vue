<style scoped>
    .day{line-height: 60px; font-size: 16px;}

    .cell{display: flex; justify-content: space-between; font-size: 14px; line-height: 24px;}
    .cell-hd, .cell-ft{min-width: 40px; flex-shrink: 0;}
    .cell-ft{text-align: right;}
    .cell-bd{flex: 1;}
    
    .demo-table-expand {
        font-size: 0;
        display: flex;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        flex: 1;
        text-align: center;
    }

    .mar15{margin-right: 15px;}
    .menu__item::after{content: ',';}
    .menu__item:last-child::after{content: none;}
</style>
<template>
    <box>
        <div class="day">订单日期：{{$route.query.day}}</div>
        <!-- 表格 -->
        <el-table size="mini" @expand-change="onDetailClick" :data="tableData" border style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" v-if="props.row.Menus && props.row.Menus.length">
                        <!-- <el-form-item v-for="(item, index) in props.row.Menus" :key="index" :label="item.MenuType + ': '">
                            <span class="mar15 menu__item" v-for="(m, i) in item.Menus" :key="i">{{ m.MenuName + ' ￥' + m.Price }}</span>
                        </el-form-item> -->
                        <el-form-item v-for="(item, index) in props.row.Menus" :key="index">
                            <span class="mar15 menu__item">{{ item.MenuName + ' / ' + item.Price + '元' }}</span>
                        </el-form-item>
                    </el-form>
                    <div style="text-align: center;">
                        <el-button type="text" @click="changeMenus(props.$index)" size="mini">重新选择菜单</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="ID" label="ID" width="60"></el-table-column>
            <el-table-column prop="UserName" label="下单人" width="100"></el-table-column>
            <el-table-column prop="CreateTime" label="下单时间"></el-table-column>
            <el-table-column prop="TotalPrice" label="订单金额（元）"></el-table-column>
            <el-table-column prop="Remark" label="留言"></el-table-column>
            <!-- <el-table-column label="状态">
                <template slot-scope="scope">
                    <status-tag :Status="scope.row.Status"></status-tag>
                </template>
            </el-table-column> -->
            <!-- <el-table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.Status === 1" @click="forbiddenUser(scope.$index)" size="mini">修改菜单</el-button>
                </template>
            </el-table-column> -->
        </el-table>

        <el-dialog title="重新选择菜单" :visible.sync="menuVisible">
            <select-menu @onsubmit="onSubmitChangeMenu"></select-menu>
        </el-dialog>

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
    </box>
</template>
<script>
import { GetBookListByDay, UpdateBookMenus } from '@/api/book'
import { GetMenuListByIds, GetMenuByStoreid } from '@/api/menu'
import box from '@/components/LayoutBox'
import selectMenu from '@/components/SelectMenus'
import StatusTag from '@/components/StatusTag'
export default {
    components: {
        StatusTag,
        box,
        selectMenu,
    },
    data() {
        return {
            tableData: [],
            tableDataIndex: 0,

            Current_Page: 1,
            Current_Size: 100,

            menuList: null,

            menuVisible: false,

            // 详情弹窗
            detailVisible: false,
        };
    },
    methods: {
        getList(day){
            if(!day){
                this.$message.warning('getList参数day不能为空');
                return
            }
            GetBookListByDay({
                Current_Page: this.Current_Page,
                Current_Size: this.Current_Size,
                Day: day
            }).then(data=>{
                for(let i of data.data){
                    i.Menus = null
                }
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
        GetMenu(id){
            GetMenuByStoreid(id).then(data=>{
                this.menuList = data.data
            })
        },

        //---------------------------------- action -----------------------------------
        changeMenus(index){
            this.tableDataIndex = index
            this.menuVisible = true
        },
        onSubmitChangeMenu(value){
            if(value.Menus.length){
                console.log('修改', value)
                UpdateBookMenus({
                    Book_ID: this.tableData[this.tableDataIndex].ID,
                    MenuList: value.MenuList
                }).then(data=>{
                    this.$message.success('修改成功');
                    this.tableData[this.tableDataIndex].Menus = value.Menus
                    this.tableData[this.tableDataIndex].TotalPrice = data.data.TotalPrice
                    this.menuVisible = false
                })
            }else{
                this.$message.warning('请选择菜单');
            }
        },

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

        onDetailClick(value){
            if(!value.Menus){
                GetMenuListByIds(value.MenuList).then(data=>{
                    console.log('菜单：',data)
                    value.Menus = data.data
                })
            }
        }
    },
    created(){
        if(this.$route.query.day){
            console.log(this.$route.query.day)
            this.getList(this.$route.query.day)
        }
        console.log(this.$store.getters.rules)
    }
};
</script>