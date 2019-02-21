<style scoped>
.adduser{width: 100%; max-width: 600px;}
</style>

<template>
    <div class="adduser">
        <el-form ref="form" size="mini" :rules="formRules" :model="form" label-width="80px">
            <el-form-item prop="StoreName" label="店铺名称">
                <el-input v-model="form.StoreName"></el-input>
            </el-form-item>
            <el-form-item prop="Phones" label="联系电话">
                <el-input v-model="form.Phones" placeholder="使用‘,’隔开，eg: 13700000000,87800000"></el-input>
            </el-form-item>
            <el-form-item label="状态" v-if="!isUpdate">
                <el-select style="width: 100%;" v-model="form.Status" placeholder="店铺状态">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="禁用" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="WeChat" label="微信">
                <el-input v-model="form.WeChat"></el-input>
            </el-form-item>
            <el-form-item prop="Address" label="地址">
                <el-input type="textarea" v-model="form.Address" resize="none" rows="3"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{isUpdate?'保存':'添加'}}</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: {
        formData: {
            type: Object,
        },
        isUpdate: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        formData: {
            handler: function(v){
                console.log('form: ', v)
                this.form = Object.assign(this.form, v)
            },
            deep: true,
        }
    },
    data() {
        const validateStorePhones = (rule, value, callback) => {
            if(!value){
                callback(new Error('请填写联系电话'))
            }else{
                let arr = value.split(',')
                let allow = true
                for(let i of arr){
                    if(isNaN(i)){
                        allow = false
                        break
                    }
                }
                if(allow){
                    callback()
                }else{
                    callback(new Error('电话格式错误；使用‘,’隔开，eg: 13700000000,87800000'))
                }
            }
        }
        return {
            form: {
                StoreName: '',
                Phones: '',
                Status: 1,
                WeChat: '',
                Address: '',
            },
            formRules: {
                StoreName: [{ required: true, trigger: 'blur', message: '请填写店铺名称' }],
                Phones: [{ required: true, trigger: 'blur', validator: validateStorePhones }],
            },
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$emit('onSubmit', this.form)
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        //重置表单
        onReset(){
            this.form = Object.assign(this.form, this.formData)
            // this.$refs['form'].resetFields();
        }
    },
}
</script>
