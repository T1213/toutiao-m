<template>
  <div>
    父页面
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/home">
        <span>首页</span>
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video">
        <span>视频</span>
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/question">
        <span>问答</span>
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item badge="99+" replace to="/my">
        <span>我的</span>
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 40px;
}
/deep/ .van-tabbar-item__icon {
  font-size: 20px;
}
</style>
