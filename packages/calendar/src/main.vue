<template>
  <div class="calendar">
    <div class="calendar_body">
      <table cellspacing="0" cellpadding="0" class="calendar-table">
        <thead>
          <th v-for="week in weekList" :key="week">
            {{ week }}
          </th>
        </thead>
        <tbody>
          <tr v-for="(row,index) in dataList" :key="index">
            <td v-for="(col,indexCol) in row" :key="indexCol" class="td-row" @click="calendarClick(col)" :class="col.isSameDay == true ? col.type + ' is-same-day' : col.type ">
              <div class="calendar_day">
                {{ col.day }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CalendarPanel',
  props: {
    // 点击单元格是否切换日历
    clickChangeCalendar: {
      type: Boolean,
      required:false,
      default:true
    }
  },
  data() {
    return {
      date:'',
      dataList: [],
      weekList: ['一', '二', '三', '四', '五', '六', '日'],
    }
  },
  created(){
    this.getDataList()
  },
  methods: {
    // 获取日历数据
    getDataList() {
      let date = new Date(this.date || new Date())
      let year = date.getFullYear() // 当年年份
      let month = date.getMonth() // 当前月份
      this.setDateList(year, month + 1)
    },
    // 单元格点击事件
    calendarClick(row){
      if(this.clickChangeCalendar === true){
        this.date = row.date
        this.getDataList()
      }
      console.log(row,"---")
    },
    // 返回当前日历面板数据
    setDateList(year, month) {
      let dateList = []
      // 头部补齐的天数 = 本月第一天是星期几
      let headerDays = new Date(year, month - 1, 1).getDay() - 1
      if (headerDays === -1) { // -1 表示星期天
        headerDays = 6
      }
      // 上个月最后一天
      const MonthLastDate = new Date(year, month - 1, 0).getDate()
      // 本月总天数
      const MonthDate = new Date(year, month, 0).getDate()
      // 下个月需要补位的天数
      const fillFooterDays = 42 - MonthDate - headerDays
      // 上月天数
      for (let i = headerDays; i > 0; i--) {
        let date = this.parseTime((month - 1 === 0 ? year - 1 : year) + '-' + (month - 1 === 0 ? 12 : month - 1) + '-' + (MonthLastDate - i + 1), '{y}-{m}-{d}')
        let json = {
          type: 'prev',
          day: MonthLastDate - i + 1,
          date: date
        }
        dateList.push(json)
      }
      let sameDay = this.parseTime(new Date(), '{y}-{m}-{d}')
      // 当前月天数
      for (let i = 0; i < MonthDate; i++) {
        let date = this.parseTime(year + '-' + month + '-' + (i + 1), '{y}-{m}-{d}')
        let json = {
          type: 'current',
          day: i + 1,
          date: date
        }
        if (sameDay === date) {
          json.isSameDay = true
        }
        // list.forEach(item => {
        //   let schedulDate = this.parseTime(item.schedulDate, '{y}-{m}-{d}')
        //   if (schedulDate === date) {
        //     json.list = item.groupShifts
        //     return
        //   }
        // })
        dateList.push(json)
      }
      // 下个月补充天数
      for (let i = 0; i < fillFooterDays; i++) {
        let date = this.parseTime((month + 1 >= 13 ? year + 1 : year) + '-' + (month + 1 >= 13 ? 1 : month + 1) + '-' + ( i + 1), '{y}-{m}-{d}')
        let json = {
          type: 'next',
          day: i + 1,
          date: date
        }
        dateList.push(json)
      }
      let tableList = []
      for (let i = 0; i < 6; i++) {
        tableList.push(dateList.slice(i * 7, (i + 1) * 7))
      }
      this.dataList = tableList
    },
    parseTime(time, pattern) {
      if (arguments.length === 0 || !time) {
        return null
      }
      const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
          time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
          time = time * 1000
        }
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return time_str
    }

  }
}
</script>
<style lang="scss">
.calendar{
  background-color: #fff;
  padding:20px;
  .calendar_body{
    .calendar-table{
      table-layout: fixed;
      width:100%;
      thead{
        th{
          border-top: 1px solid #dfe6ec;
          padding: 12px 0;
          font-size: 12px;
          color: #061032;
          font-weight: normal;
        }
      }
      thead th:first-child{
        border-left: 1px solid #dfe6ec;
      }
      td,th{
        border-bottom: 1px solid #dfe6ec;
        border-right: 1px solid #dfe6ec;
        vertical-align: top;
        transition: background-color 0.2s ease;
        flex:1;
      }
      // tr:first-child td{
      //   border-top: 1px solid #dfe6ec;
      // }
      tr td:first-child{
        border-left: 1px solid #dfe6ec;
      }
      .td-row{
        &:hover,&.is-same-day{
          cursor: pointer;
          background-color: #F2F8FE;
        }
      }
      .calendar_day{
        box-sizing: border-box;
        padding: 8px;
        min-height:110px;
      }
      td.prev,td.next{
        color: #C0C4CC;
      }
    }
  }
}
</style>