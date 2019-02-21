<template>
  <box>
    <add-form :formData="form" @onSubmit="onSubmit"></add-form>
  </box>
</template>
<script>
import box from '@/components/LayoutBox'
import addForm from '@/views/menu/components/form'
import { AddMenu } from '@/api/menu'
export default {
  components: {
    box,
    addForm,
  },
  data() {
    return {
      form: {
        MenuName: '',
        IsComment: 1,
        Status: 1,
        Month: '',
        Week: '',
        Day: '',
        Price: '',
        Store_ID: '',
      },
    }
  },
  methods: {
    onSubmit(data) {
      AddMenu(data).then(data=>{
        this.$message.success('添加成功');
      })
    },
  },
}
</script>
