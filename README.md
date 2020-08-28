# vue-calendar-panel
### 简约的日历插件

## npm 安装
```
npm i vue-calendar-panel -S
```

## 全局引入
```
import Vue from 'vue'
import App from './App.vue'
import CalendarPanel from 'vue-calendar-panel'

Vue.use(CalendarPanel)
```

## 使用
```
<template>
  <div id="app">
    {{ date }}
    <calendar-panel v-model="date"></calendar-panel>
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
```
## 自定义标题及内容
```
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
```

---

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 打包组件
```
npm run lib
```

### 发布到npm 需修改版本号，不能和历史版本号相同
#### 如果以前改过 npm 的镜像地址，比如使用了淘宝镜像，就先改回来
```
npm config set registry http://registry.npmjs.org 
```

### 准备就绪 发布
```
npm publish
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
