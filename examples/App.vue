<template>
  <div id="app">
    {{ date }}
    <calendar-panel v-model="date">
      <template v-slot:th="th">
        星期{{ th.week }}
      </template>
      <template v-slot:td="dataList">
        {{ dataList.date }}
      </template>
    </calendar-panel>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      date: '2020-07-07'
    }
  },
  components: {
  },
  created() {
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
