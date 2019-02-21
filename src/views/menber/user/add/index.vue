<style scoped>
.adduser{width: 100%; max-width: 600px;}
</style>

<template>
  <div>
    <div class="adduser">
      <el-form ref="addUserForm" size="mini" :rules="formRules" :model="form" label-width="80px">
        <el-form-item prop="NickName" label="昵称">
          <el-input v-model="form.NickName"></el-input>
        </el-form-item>
        <el-form-item prop="UserName" label="姓名">
          <el-input v-model="form.UserName"></el-input>
        </el-form-item>
        <el-form-item prop="Password" label="密码">
          <el-input v-model="form.Password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { validateUsername, validateChinesename, validatePass } from '@/utils/formRules'
import { Register } from '@/api/user'
export default {
  data() {
    return {
      form: {
        NickName: '',
        UserName: '',
        Password: '888888',
      },
      formRules: {
        NickName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        UserName: [{ required: true, trigger: 'blur', validator: validateChinesename }],
        Password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
    }
  },
  methods: {
    onSubmit() {
      this.$refs.addUserForm.validate(valid => {
        console.log('valid', valid)
        if (valid) {
          Register(this.form).then(data=>{
            this.$message.success('添加成功');
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
