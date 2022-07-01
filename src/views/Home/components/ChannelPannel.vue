<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          size="small"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id"
          ><div
            class="inner"
            @click="onClick(index)"
            :style="{ color: index === active ? 'red' : '' }"
          >
            {{ item.name
            }}<van-icon
              v-show="isCloseShow"
              name="close"
              v-if="index !== 0"
            /></div
        ></van-col>
      </van-row>
      <!-- 频道推荐 -->
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="obj in recommendChannels" :key="obj.id"
          ><div class="inner van-ellipsis" @click="add(obj.id)">
            +{{ obj.name }}
          </div></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/localstorge'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChannels.findIndex(item => item.id)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        if (index === 0) return
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('changeActive', index)
      }
    }

  },
  computed: {},
  watch: {
    myChannelsList: {
      // 登陆过 把持久化放在后台服务器（用ajax）未登录 放本地存储
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          // 登陆过
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          // 处理频道数据
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else { // 未登录
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 0 24px;
  h3 {
    width: 133px;
    height: 32px;
    font-size: 32px;
    font-weight: normal;
    line-height: 36px;
    color: #333333;
  }
  .van-button {
    width: 104px;
    height: 48px;
    border-radius: 20px;
  }
}
.van-row {
  margin-top: 15px;
  .inner {
    position: relative;
    margin: 0 0 0 15px;
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: normal;
    color: #222222;
    line-height: 86px;
    text-align: center;
    .van-icon {
      color: red;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }
  .van-col {
    margin-bottom: 22px;
  }
}
</style>
