<template>
  <div>
    <van-cell-group>
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        ref="pullrefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-cell
            v-for="(item, index) in ArticleList"
            :key="index"
            :title="item.title"
            label="描述信息"
          /> -->
          <ArticleItem
            v-for="(item, index) in ArticleList"
            :key="index"
            :article="item"
          ></ArticleItem>
        </van-list>
      </van-pull-refresh>
    </van-cell-group>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
let ele = null
let srcollTop = 0
export default {
  name: 'ArticleList',
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  mounted () {
    ele = this.$refs.pullrefresh.$el
    ele.addEventListener('scroll', function () {
      srcollTop = ele.srcollTop
    })
  },
  activated () {
    ele.srcollTop = srcollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      ArticleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) {
        this.ArticleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.channelId, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.ArticleList.push(...res.data.data.results)
        // 数据加载完毕 让loading再变为false
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      this.finished = false
      this.loading = true// 确保重新加载数据
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
