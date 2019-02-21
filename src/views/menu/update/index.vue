<template>
  <box>
    <add-store-form :isUpdate="true" :formData="form" @onSubmit="onSubmit"></add-store-form>
  </box>
</template>
<script>
import box from '@/components/LayoutBox'
import addStoreForm from '@/views/menu/components/form'
import { UpdateMenu, GetMenuModel } from '@/api/menu'
export default {
  components: {
    box,
    addStoreForm,
  },
  data() {
    return {
        form: {
          Store_ID: '',
          MenuName: '',
          IsComment: 1,
          Status: 1,
          Month: '',
          Week: '',
          Day: '',
          Price: '',
        },

        menuid: '',
    }
  },
  methods: {
    onSubmit(data) {
        let form = Object.assign({
            Menu_ID: this.menuid,
        }, data)    
        UpdateMenu(form).then(data=>{
            this.$message.success('修改成功');
        })
    },
  },
  created(){
    if(this.$route.query.menuid){
        this.menuid = Number(this.$route.query.menuid)
        GetMenuModel(this.menuid).then(data=>{
            this.form = Object.assign(this.form, data.data)
            console.log('this.form: ', this.form)
        })
    }
  },
}
</script>
