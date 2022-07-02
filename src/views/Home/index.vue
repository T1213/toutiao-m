<template>
  <div>
    <van-nav-bar title="标题" fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in UserChannels" :key="item.id"
        ><ArticleList :channelId="item.id"></ArticleList
      ></van-tab>

      <!-- 右侧汉堡图标 -->
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '95%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-panel
        :channels="UserChannels"
        :active="active"
        @changeActive="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      ></channel-panel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from '@/views/Home/components/ChannelPannel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getUserChannels } from '@/api/home'
import { getItem } from '@/utils/localstorge'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () { this.getUserChannels() },
  data () {
    return {
      active: 0,
      UserChannels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    async getUserChannels () {
      const channels = getItem('CHANNELS')
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.UserChannels = channels
      } else {
        try {
          const res = await getUserChannels()
          console.log(res)
          this.UserChannels = res.data.data.channels
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: { ArticleList, ChannelPanel }
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
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
