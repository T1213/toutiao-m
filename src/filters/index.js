import dayJs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayJs.locale('zh-cn')
dayJs.extend(relativeTime)
export const dataFormat = (time) => {
  return dayJs(time).fromNow()
}
