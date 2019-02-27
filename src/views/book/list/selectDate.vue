<style lang="scss" scoped>
/deep/.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item{background-color: #409EFF; color: white; border-radius: 4px;}
/deep/.full-calendar-body .weeks{line-height: 30px; font-weight: lighter;}
.calendar{-webkit-box-sizing: content-box !important;}
.calendar .weeks{line-height: 24px;}
</style>
<template>
    <box>
        <full-calendar :events="fcEvents" class="calendar" @dayClick="dayClick" lang="zh"></full-calendar>
    </box>
</template>
<script>
import box from '@/components/LayoutBox'
import FullCalendar from 'vue-fullcalendar'
export default {
    components: {
        FullCalendar,
        box,
    },
    data(){
        return {
            fcEvents: []
        }
    },
    methods: {
        dayClick(date){
            let day = new Date(date).toLocaleDateString()
            this.$router.push({name: 'BookList', query: {day: day}})
        }
    }
}
</script>
