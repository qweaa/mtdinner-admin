<style scoped>
.adduser{width: 100%; max-width: 800px;}
.myBoxBox{display: flex;}
.myBox{margin-top: 15px; margin-bottom: 15px; margin-right: 15px;}
.myDate{width: 300px; border-left: 1px solid #eee; border-top: 1px solid #eee; display: flex; flex-wrap: wrap;}
.myDate-item{width: 33.33%; border-right: 1px solid #EEE; text-align: center; border-bottom: 1px solid #eee; line-height: 36px; cursor: pointer;}
.myDate-item:hover, .myDate-item.active{background-color: #409EFF; color: white;}
.day .myDate-item{width: 14.28%}

</style>

<template>
    <div class="adduser">
        <el-form ref="form" size="mini" :rules="formRules" :model="form" label-width="80px">
            <el-form-item prop="Store_ID" label="店铺">
                <select-store :storeid.sync="form.Store_ID"></select-store>
            </el-form-item>
            <el-form-item prop="MenuName" label="菜单名称">
                <el-input v-model="form.MenuName"></el-input>
            </el-form-item>
            <el-form-item prop="Price" label="价格">
                <el-input type="number" v-model="form.Price"></el-input>
            </el-form-item>
            <el-form-item prop="IsComment" label="使用日期">
                <el-radio v-for="(item, index) in typeArr" :key="index" v-model="form.IsComment" :label="item.value">{{item.label}}</el-radio>
                <div>
                    <div class="myBox" style="margin-bottom: 0;" v-if="form.IsComment === 5">
                        <el-date-picker value-format="yyyy" v-model="year" type="year" :clearable="false" placeholder="选择年"></el-date-picker>
                    </div>
                    <div class="myBoxBox">
                        <div v-if="form.IsComment === 1" class="myBox">所有日期均可使用</div>
                        <div v-if="form.IsComment === 2 || form.IsComment === 5" class="myBox myDate">
                            <div v-for="(item, index) in monthArr" @click="item.selected = !item.selected" :key="index" :class="['myDate-item', item.selected?'active':'']">{{item.label}}</div>
                        </div>
                        <div v-if="form.IsComment === 3" class="myBox">
                            <div class="myDate day">
                                <div v-for="(item, index) in weekArr" :key="index" @click="item.selected = !item.selected" :class="['myDate-item', item.selected?'active':'']">{{item.label}}</div>
                            </div>
                        </div>
                        <div v-if="form.IsComment === 4 || form.IsComment === 5" class="myBox">
                            <div class="myDate day">
                                <div v-for="(item, index) in dayArr" :key="index" @click="item.selected = !item.selected" :class="['myDate-item', item.selected?'active':'']">{{item.label}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="状态" v-if="!isUpdate">
                <el-select style="width: 100%;" v-model="form.Status" placeholder="店铺状态">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="禁用" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{isUpdate?'保存':'添加'}}</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import selectStore from '@/components/SelectStore'
export default {
    components: {
        selectStore,
    },
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
                this.form = Object.assign(this.form, v)
                this.resetTime()
            },
            deep: true,
        }
    },
    data() {
        function getWeekChinese(i){
            let arr = ['日','一','二','三','四','五','六']
            return arr[i]
        }
        let monthArr = []
        for(let i = 1; i < 13; i++){
            monthArr.push({
                label: i + '月',
                value: i,
                selected: false,
            })
        }
        let weekArr = []
        for(let i = 0; i < 7; i++){
            weekArr.push({
                label: '周' + getWeekChinese(i),
                value: i,
                selected: false,
            })
        }
        let dayArr = []
        for(let i = 1; i < 32; i++){
            dayArr.push({
                label: i + '号',
                value: i,
                selected: false,
            })
        }
        return {
            typeArr: [
                {
                    label: '通用',
                    value: 1,
                },{
                    label: '月份',
                    value: 2,
                },{
                    label: '每周星期几',
                    value: 3,
                },{
                    label: '每月几号',
                    value: 4,
                },{
                    label: '固定日期',
                    value: 5,
                },
            ],
            weekArr: weekArr,
            dayArr: dayArr,
            monthArr: monthArr,
            year: new Date(),
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
            formRules: {
                Store_ID: [{ required: true, trigger: 'blur', message: '请选择店铺' }],
                MenuName: [{ required: true, trigger: 'blur', message: '请填写菜单名称' }],
                Price: [{ required: true, trigger: 'blur', message: '请填写菜单价格' }],
            },
        }
    },
    methods: {
        onSubmit() {
            let year = '',
                month = [],
                week = [],
                day = [],
                form = Object.assign({}, this.form)
            
            for(let i of this.monthArr)
                if(i.selected) month.push(i.value)
            for(let i of this.weekArr)
                if(i.selected) week.push(i.value)
            for(let i of this.dayArr)
                if(i.selected) day.push(i.value)

            year = typeof this.year === 'String' ? this.year : this.year.getFullYear()

            form.Year = year
            form.Month = month.join(',')
            form.Week = week.join(',')
            form.Day = day.join(',')

            console.log(form)

            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$emit('onSubmit', form)
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },

        //初始化使用时间
        resetTime(){
            let Month = this.formData.Month.split(',')
            let Week = this.formData.Week.split(',')
            let Day = this.formData.Day.split(',')
            for(let i of this.monthArr) {
                if(Month.indexOf(i.value.toString()) !== -1) i.selected = true
                else i.selected = false
            }
            for(let i of this.weekArr) {
                if(Week.indexOf(i.value.toString()) !== -1) i.selected = true
                else i.selected = false
            }
            for(let i of this.dayArr) {
                if(Day.indexOf(i.value.toString()) !== -1) i.selected = true
                else i.selected = false
            }
        },
        //重置表单
        onReset(){
            this.form = Object.assign(this.form, this.formData)
            this.resetTime()
        }
    },
}
</script>
