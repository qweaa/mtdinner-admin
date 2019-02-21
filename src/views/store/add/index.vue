<template>
  <box>
    <add-store-form :formData="form" @onSubmit="onSubmit"></add-store-form>
  </box>
</template>
<script>
import box from '@/components/LayoutBox'
import addStoreForm from '@/views/store/components/form'
import { AddStore } from '@/api/store'
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
    }
  },
  methods: {
    onSubmit(data) {
      AddStore(data).then(data=>{
        this.$message.success('添加成功');
      })
    },
  },
}
</script>
