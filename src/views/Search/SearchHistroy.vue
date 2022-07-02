<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDelete">
        <span @click="$store.commit('deleteAllHistroy')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </template>
      <van-icon name="delete" @click="isDelete = true" v-else />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in SearchHistroyLsit"
      :key="index"
      @click.stop="$emit('search', item)"
    >
      <van-icon name="close" @click="$store.commit('deleteHistroy', index)" />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDelete: false
    }
  },
  computed: {
    ...mapState(['SearchHistroyLsit'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
