<template>
  <box>
    <add-store-form :isUpdate="true" :formData="form" @onSubmit="onSubmit"></add-store-form>
  </box>
</template>
<script>
import box from '@/components/LayoutBox'
import addStoreForm from '@/views/store/components/form'
import { UpdateStore, GetStoreModel } from '@/api/store'
export default {
  components: {
    box,
    addStoreForm,
  },
  data() {
    return {
        form: {
            StoreName: '',
            Phones: '',
            Status: 1,
            WeChat: '',
            Address: '',
        },

        storeid: '',
    }
  },
  methods: {
    onSubmit(data) {
        let form = Object.assign({
            Store_ID: this.storeid,
        }, data)    
        UpdateStore(form).then(data=>{
            this.$message.success('修改成功');
        })
    },
  },
  created(){
    if(this.$route.query.storeid){
        this.storeid = Number(this.$route.query.storeid)
        GetStoreModel(this.storeid).then(data=>{
            this.form = Object.assign(this.form, data.data)
            console.log('this.form: ', this.form)
        })
    }
  },
}
</script>
