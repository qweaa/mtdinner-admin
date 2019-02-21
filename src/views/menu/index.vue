<template>
  <box>
    <router-view slot="main" />
  </box>
</template>
<script>
import box from '@/components/LayoutBox'
export default {
  components: {
    box,
  }
}
</script>
