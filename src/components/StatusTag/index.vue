<template>
    <el-tag :size="size" v-if="Status === 1 || Status === '1'" type="success">启用</el-tag>
    <el-tag :size="size" v-else type="danger">禁用</el-tag>
</template>
<script>
export default {
    props: {
        Status: {
            type: Number,
            default: 0
        },
        size: {
            type: String,
            default: 'small'
        }
    }
}
</script>

