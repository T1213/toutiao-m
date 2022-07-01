/* eslint-disable camelcase */
import request from '@/utils/request'
export const getUserChannels = () => {
  return request({
    url: 'user/channels'
  })
}

export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}

export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}

// channels数据持久化
export const saveChannels = (channels) => request({
  url: '/user/channels',
  method: 'PUT',
  data: {
    channels
  }
})
