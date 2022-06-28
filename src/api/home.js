import request from '@/utils/request'
export const getUserChannels = () => {
  return request({
    url: 'user/channels'
  })
}
