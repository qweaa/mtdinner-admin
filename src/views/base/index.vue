<style scoped>
.adduser{width: 100%; max-width: 600px;}
</style>
<template>
    <box>
        <div class="adduser">
            <el-form ref="form" size="mini" :rules="formRules" :model="form" label-width="140px">
                <el-form-item prop="MaxCost" label="个人最大订餐金额">
                    <el-input type="number" v-model="form.MaxCost"></el-input>
                </el-form-item>
                <el-form-item prop="ActiveStoreID" label="使用店铺">
                    <select-store :storeid.sync="form.ActiveStoreID"></select-store>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </box>
</template>
<script>
import box from '@/components/LayoutBox'
import selectStore from '@/components/SelectStore'
import { GetStoreList } from '@/api/store'
import { GetRules, UpdateRules } from '@/api/rules'
export default {
    components: {
        box,
        selectStore,
    },
    data(){
        return {
            form: {
                MaxCost: '',
                ActiveStoreID: '',
            },
            formRules: {
                MaxCost: [{ required: true, trigger: 'blur', message: '请填写最大订餐金额，0为不限制' }],
                ActiveStoreID: [{ required: true, trigger: 'blur', message: '请选择使用店铺' }],
            },
            
            Current_Page: 1,
            Current_Size: 10,
            Status: '',

            storeList: null,
        }
    },
    methods: {
        //取规则信息
        getRules(){
            GetRules().then(data=>{
                this.form = Object.assign(this.form, data.data)
            })
        },
        UpdateRules(){
            UpdateRules(this.form).then(data=>{
                this.$message.success('保存成功');
            })
        },

        //------------------------------ 交互函数 -------------------------
        onSubmit() {
            this.$refs.form.validate(valid => {
                console.log('valid', valid)
                if (valid) {
                    this.UpdateRules()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
    },
    created(){
        this.getRules()
    }
}
</script>
