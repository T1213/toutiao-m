<template>
  <div>
    <van-nav-bar title="标题">
      <template #title>
        <van-button type="info" icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in UserChannels" :key="item.id"
        >内容{{ item.id }}</van-tab
      >
      <!-- 右侧汉堡图标 -->
      <template #nav-right>
        <div class="menu">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/home'
export default {
  created () { this.getUserChannels() },
  data () {
    return {
      active: 0,
      UserChannels: []
    }
  },
  methods: {
    async getUserChannels () {
      try {
        const res = await getUserChannels()
        console.log(res)
        this.UserChannels = res.data.data.channels
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 70px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  background-color: #3296fa;
  border-radius: 3px;
}
.menu {
  position: fixed;
  right: 0;
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 40px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
