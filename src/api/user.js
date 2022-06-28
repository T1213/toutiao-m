import request from '@/utils/request'
import axios from 'axios'
import store from '@/store'
export const getSmsCode = function (mobile) {
  return request({
    url: `/sms/codes/${mobile}`
  })
}
export const login = ({ mobile, code }) => {
  return request({
    method: 'post',
    url: '/authorizations',
    data: {
      mobile,
      code
    }

  })
}
// 获取用户个人资料
export const getUserinfo = () => {
  return request({
    url: 'user'

  })
}
