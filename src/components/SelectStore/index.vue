<template>
    <div class="color-gray" v-if="storeList === null">请求店铺列表中...</div>
    <div class="color-gray" v-else-if="storeList === false">店铺列表请求失败，<span class="color-primary" @click="GetStoreList">点击重试</span></div>
    <el-select v-else v-model="id" @change="change" style="width: 100%;" placeholder="请选择店铺">
        <el-option v-for="(item, index) in storeList" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
    </el-select>
</template>
<script>
import { GetStoreList } from '@/api/store'
export default {
    data(){
        return{
            storeList: null,

            Current_Page: 1,
            Current_Size: 100000,
            Status: '',

            id: '',
        }
    },
    props: {
        storeid: {
            type: [Number, String]
        }
    },
    watch: {
        storeid(v){
            this.id = v
        }
    },
    methods: {
        //-------------------------- 请求 ---------------------------
        GetStoreList(){
            GetStoreList({
                Current_Page: this.Current_Page,
                Current_Size: this.Current_Size,
                Status: this.Status,
            }).then(data=>{
                let storeList = []
                for(let i of data.data){
                    storeList.push({
                        label: i.StoreName,
                        value: i.ID,
                        disabled: i.Status === 0
                    })
                }
                this.storeList = storeList
            }).catch(data=>{
                this.storeList = false
            })
        },
        change(value){
            this.$emit('update:storeid', value)
        },
    },
    created(){
        this.GetStoreList()
    },
}
</script>
