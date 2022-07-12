<template>
  <div class="home">
    <h1>项目中遇到的问题</h1>
    <ol class="issue-list">
      <li class="issue-item"
        v-for="item in issueList"
        :key="item.name"
        @click="onGoPage(item.path)">
        {{ item.name }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      issueList: [
        {
          name: 'img标签onerror事件',
          path: '/imgOnerror'
        },
        {
          name: 'videoPlay',
          path: '/videoPlay'
        }
      ]
    }
  },
  methods: {
    onGoPage (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .issue-list {
    appearance: none;
    text-align: left;
    .issue-item {
      line-height: 50px;
      color: #318bf5;
      cursor: pointer;
    }
  }
}
</style>
