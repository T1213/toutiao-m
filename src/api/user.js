import request from '@/utils/request'
import axios from 'axios'
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
