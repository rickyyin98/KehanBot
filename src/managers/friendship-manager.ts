import { Friendship } from 'wechaty'
import { FileBox }  from 'file-box'

const NEW_FRIEND_GREETING = [
  '您好！这里是奇绩创坛小助手。\n奇绩创坛前身是YC中国。希望通过【一笔标准化投资、三个月陆奇博士亲自参与的加速营、触达上千位一线投资人的路演日】的方式，用投资的方式帮助创业者越过早期创业的艰难。', '如果您是创业者，可以具体介绍一下您的项目。比如项目发展到什么阶段了、是否有融资需求等，我们会尽我所能提供帮助。',
]

export class FriendshipManager {

  public static async autoProcessFriendship (friendship: Friendship) {
    const friendshipType = friendship.type()
    if (friendshipType === Friendship.Type.Receive) {
      await friendship.accept()
    } else if (friendshipType === Friendship.Type.Confirm) {
      const contact = friendship.contact()
      for (const greeting of NEW_FRIEND_GREETING) {
        await contact.say(greeting)
      }
      const fileBox = FileBox.fromUrl('https://phaedodata-1253507825.cos.ap-beijing.myqcloud.com/YCCooperate/WechatIMG9.jpeg')
      await contact.say(fileBox)
    }
  }

}
