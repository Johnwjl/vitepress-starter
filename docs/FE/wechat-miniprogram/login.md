# 微信小程序 登录

## 获取code

### 何为code(微信登录凭证)

> `wx.login` 生成一个带有时效性的凭证 (就像是一个会过期的临时身份证一样，在 wx.login 调用时，会先在微信后台生成一张临时的身份证，其有效时间仅为5分钟) 。
> 然后把这个临时身份证返回给小程序方，这个临时的身份证我们把它称为`微信登录凭证code`。
> 如果5分钟内小程序的后台不拿着这个临时身份证来微信后台服务器换取微信用户id的话，那么这个身份证就会被作废，需要再调用wx.login重新生成登录凭证。

## 发送code到开发者服务器

> 在 `wx.login` 的 success 回调中拿到了微信登录凭证code，紧接着会通过 `wx.request` 把 code 传到开发者服务器，为了后续可以换取微信用户身份id。
> 如果当前微信用户还没有绑定当前小程序业务的用户身份，那在这次请求应该顺便把用户输入的`帐号密码`一起传到后台，然后开发者服务器就可以校验账号密码之后再和微信用户id进行绑定。

```js
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: 'https://test.com/login',
            data: {
              username: 'zhangsan', // 用户输入的账号
              password: 'pwd123456', // 用户输入的密码
              code: res.code
            },
            success: function(res) {
              // 登录成功
              if (res.statusCode === 200) {
               console.log(res.data.sessionId)// 服务器回包内容
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
```

## 到微信服务器换取微信用户身份id

> 微信服务器为了确保拿code过来换取身份信息的人就是刚刚对应的小程序开发者，到微信服务器的请求要同时带上`AppId`和`AppSecret`。
> 这两个信息在小程序管理平台的开发设置界面可以看到，由此可以看出，`AppId`和`AppSecret`是微信鉴别开发者身份的重要信息，AppId是公开信息，泄露AppId不会带来安全风险，但是AppSecret是开发者的隐私数据不应该泄露，如果发现泄露需要到小程序管理平台进行重置AppSecret。
> 而code在成功换取一次信息之后也会立即失效，即便凭证code生成时间还没过期。
> 开发者服务器和微信服务器通信也是通过HTTPS协议，微信服务器提供的接口地址是：

```js
https://api.weixin.qq.com/sns/jscode2session?appid=<AppId>&secret=<AppSecret>&js_code=<code>&grant_type=authorization_code
```

> `jscode2session`接口返回字段:

- openid: 微信用户的唯一标识
- session_key: 会话密钥
- unionid: 用户在微信开放平台的唯一标识符。本字段在满足一定条件的情况下才返回。

## 参考

- [小程序开发指南-微信登录](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=000cc48f96c5989b0086ddc7e56c0a)