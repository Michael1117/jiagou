## OAuth

https://zhufengnodejs.github.io/doc/html/%E5%BE%AE%E4%BF%A1/OAuth%E7%90%86%E8%AE%BA.html

![1560241197266](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560241197266.png)

### 1. 什么是OAuth
开放式授权协议

### 2. 应用场景
比如现在有一个微信应用朝夕日历想获取你的微信呢称和头像，那么这个应用如何获得用户授权呢?

你可以把你的用户名和密码告诉这个朝夕日历，但它有以下问题

    1.朝夕日历会保存你的用户名和密码，如果朝夕日历数据泄露，则你的账户不安全
    2.如果你修改了密码还需要实时通知朝夕日历，如果不通知则此应用无法继续获取资料
    3.朝夕日历获得了你账户的所有能力，我们没法限定朝夕日历的授权访问的信息和有效期 4. OAuth就是为了解决上面这些问题而诞生的。
### 3. OAuth设计思路
    OAuth在朝夕日历与微信之间设置了一个授权层，朝夕日历不能直接登录微信，只能访问授权层， 用户在授权层进行登录，然后发放给此用户一个令牌，指定授权层的权限范围和有效期。 此应用登陆授权层后，此应用就可以根据令牌的权限范围和有效期，向此用户开放用户呢称和头像 

### 4. OAuth工作流程
        1.用户启动朝夕日历后，朝夕日历会跳转到授权层要求用户登录。
        2.用户同意授权
        3.朝夕日历使用上一步得到的授权向微信申请令牌
        4.微信对朝夕日历认证后发送令牌
        5.此应用使用令牌，向微信请求呢称和头像在在
        6.微信确认令牌元误，向朝夕日历发回此用户的呢称和头像
### 5. 授权码模式
    授权码模式是功能最完整、流程最严密的授权模式。它的特点是通过朝夕日历的后台服务器与微信的认证服务器进行互动。 它的步骤如下
    
        1. 用户访问朝夕日历，朝夕日历将页面跳转换微信认证服务器
        2. 用户选择是否要授权
        3. 假设用户同意授权，认证服务器将用户导向到朝夕日历事先指定的"重定向URL"中，并且会提供一个授权码。
        4. 客户端收到授权码并追加"重定向URL"，向认证服务器申请令牌。
        5. 认证服务器核对授权码和"重定向URL"，确认无误后，向客户端发送访问令牌和更新令牌。 
### 6. QQ

 qq互联 http://wiki.connect.qq.com/%E7%BD%91%E7%AB%99%E6%8E%A5%E5%85%A5%E6%A6%82%E8%BF%B0

 开发者

 http://open.qq.com/regv2/mailprove?checkcode=19e9LyEImAOX5lDumDKHZT%2FCEw%2Frav%2FBdon8FbRg%2BYBiDpjCCixE7Kta6dyZZFt217mrLOgOGyI8

![1560244491849](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560244491849.png)

![1560244522449](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560244522449.png)

![1560244782092](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560244782092.png)


![1560244734841](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560244734841.png)

![1560244864619](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560244864619.png)

![1560244930206](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560244930206.png)

![1560244958841](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560244958841.png)



> 阮一峰老师  <http://www.ruanyifeng.com/blog/2019/04/github-oauth.html>
>
> <http://www.ruanyifeng.com/blog/2019/04/oauth_design.html>