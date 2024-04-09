const { defineConfig } = require('@vue/cli-service')
const mock = require('mockjs')
const bodyParser = require('body-parser') // 转json中间件
const users = [
  { username: 'admin', password: '0000' },

]
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 定义接口地址
    setupMiddlewares: (mid, { app }) => {
      app.use(bodyParser.json())
      app.post('/api/login', (req, res) => {
        console.log(req.body, 'body')
        const { username, password } = req.body;
        const user = users.find(item => item.username === username && item.password === password)
        if (user) {
          res.send({
            code: 200,
            token: 'yijingdengluchenggong'
          })
        } else {
          res.send({
            code: 0,
            message: '用户名不存在或密码错误'
          })
        }
      })
      return mid
    }
  }
})
