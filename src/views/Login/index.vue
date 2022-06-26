<template>
  <div>
    <van-nav-bar title="登陆">
      <!-- <template #left>
        <van-icon name="cross"></van-icon>
      </template> -->
      <template #left> <MyIcon icon="cross"></MyIcon> </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '请输入正确的手机号哦',
          },
        ]"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          {
            pattern: /^\d{6}$/,
            message: '请输入正确的验证码哦',
          },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDown"
            @finish="isCountDown = false"
          />
          <van-button
            size="small"
            class="yzm"
            native-type="button"
            v-else
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>

import { getSmsCode, login } from '@/api/user'
import MyIcon from '@/components/MyIcon.vue'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111', // 手机号
      code: '246810', // 短信验证码
      time: 5 * 1000,
      isCountDown: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDown = true// 让倒计时显示
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          this.$toast.fail('发送失败')
          console.log(err)
        }
      } catch (error) {
        console.log(error)
        console.log('校验失败')
        this.$toast.fail('手机号格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { MyIcon }
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  font-size: 22px;
  color: #666;
  background-color: #ededed;
  border-radius: 23px;
  position: fixed;
  right: 10px;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #fff;
}
.van-count-down {
  position: fixed;
  right: 20px;
}
</style>
