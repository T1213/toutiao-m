<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.go(-1)"
        @search="onSearch"
        autofocus
        @focus="isSearch = false"
      />
      <SearchHistroy v-if="searchText === ''" @search='onSearch'></SearchHistroy>
      <template v-else>
        <SearchResult v-if="isSearch" :searchText='searchText'></SearchResult>
        <SearchSuggest
          v-else
          :searchText="searchText"
          @search="onSearch"
        ></SearchSuggest>
      </template>
    </form>
  </div>
</template>

<script>
import SearchHistroy from './SearchHistroy.vue'
import SearchResult from './SearchResult.vue'
import SearchSuggest from './SearchSuggest.vue'
export default {
  name: 'Search',
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false
    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setSearchHistroyLsit', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistroy, SearchSuggest, SearchResult }
}
</script>

<style scoped lang='less'>
</style>
