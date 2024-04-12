const { defineConfig } = require('@vue/cli-service')
const mock = require('mockjs')
const bodyParser = require('body-parser') // 转json中间件
const users = [
  { username: 'admin', password: '0000' },

]
const { list } = mock.mock({
  "list|40": [
    {
      "id": "@id",
      "name": "@cname",
      "remark": "@cparagraph(1,3)",
      "identity": "@ctitle(3,6)",
      "status": "@boolean",
      "createtime": "@datetime"
    }
  ]
})

const { tabList } = mock.mock({
  "tabList|60": [
    {
      "id": "@id",
      'title': '@ctitle(15,25)',
      "desc": "@cparagraph(1,12)",
      "name": "@cname",
      "viewnum|1-100": 1,
      "likesnum|1-1000": 1,
      "image": "@image(100x100,@color)",
    }
  ]
})

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 定义接口地址
    setupMiddlewares: (mid, { app }) => {
      app.use(bodyParser.json())
      app.post('/api/login', (req, res) => {
        console.log(req.body, 'body')
        const { username, password, code } = req.body;
        const user = users.find(item => item.username === username && item.password === password)
        if (user) {
          if (code == '1234') {
            res.send({
              code: 200,
              token: 'yijingdengluchenggong'
            })
          } else {
            res.send({
              code: 0,
              message: '验证码错误'
            })
          }
        } else {
          res.send({
            code: 0,
            message: '用户名不存在或密码错误'
          })
        }
      })
      // 角色列表
      app.get('/api/list', (req, res) => {
        const { pagination, pageNum, name, identity, status } = req.query;
        const arr = list.filter(item => {
          return (
            (name ? item.name.indexOf(name) !== -1 : true) &&
            (identity ? item.identity == identity : true) &&
            (status ? item.status + '' == status : true)
          )
        })
        res.send({
          code: 200,
          data: arr.slice((pagination - 1) * pageNum, pagination * pageNum),
          total: arr.length
        })
      })
      // 新增
      app.post('/api/add', (req, res) => {
        const { name, remark, identity } = req.body;
        const newData = {
          id: mock.Random.guid(),
          name,
          remark,
          identity,
          status: true,
          createtime: mock.Random.datetime()
        }
        list.unshift(newData)
        res.send({
          code: 200,
          data: newData
        })
      })
      // 修改
      app.post('/api/edit', (req, res) => {
        const { id, name, remark, identity } = req.body;
        const index = list.findIndex(item => item.id === id)
        if (index !== -1) {
          list[index].name = name;
          list[index].remark = remark;
          list[index].identity = identity;
          res.send({
            code: 200,
            data: list[index]
          })
        }
      })
      // 删除
      app.post('/api/delete', (req, res) => {
        const { id } = req.body;
        const index = list.findIndex(item => item.id === id)
        if (index !== -1) {
          list.splice(index, 1)
          res.send({
            code: 200,
            data: list
          })
        }
      })
      // 综合列表
      app.get('/api/tabList', (req, res) => {
        const { pagination, pageNum } = req.query;
        res.send({
          code: 200,
          data: tabList.slice((pagination - 1) * pageNum, pagination * pageNum),
          total: tabList.length
        })
      })
      return mid
    }
  }
})
