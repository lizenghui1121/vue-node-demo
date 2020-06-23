const { use } = require('bcrypt/promises')

module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')

  const router = express.Router({
    mergeParams: true
  })

  // 创建资源
  router.post('/', async (req, res) => {
    assert(req.user.username === 'admin', 422, '非管理员不能进行此操作！')
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 更新资源
  router.put('/:id', async (req, res) => {
    const newModel = await req.Model.findById(req.params.id)
    if(req.Model == AdminUser){
      if (req.user.username === 'admin') {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
      }
      assert(req.user.username === newModel.username, 422, '非管理员不能进行此操作！')
      const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
      res.send(model)
    }
    assert(req.user.username === 'admin', 422, '非管理员不能进行此操作！')
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除资源
  router.delete('/:id', async (req, res) => {
    assert(req.user.username === 'admin', 422, '非管理员不能进行此操作！')
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 资源列表
  router.get('/', async (req, res) => {
    let queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = "parent"
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  // 资源获取中间件
  const resourceMiddleware =  require('../../middleware/resource')

  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })


  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.use('/admin/api/upload',authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    // file.url = `http://localhost:3000/uploads/${file.filename}`
    file.url = `http://101.200.226.252/uploads/${file.filename}`
    res.send(file)
  })


  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')

    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    const id = user._id
    res.send({ token, id })
  })

  app.post('/admin/api/registry', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找同名用户
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(!user, 422, '用户名已存在')

    // 2. 创建新用户
    const modelName = require('inflection').classify('admin_users')
    req.Model = require(`../../models/${modelName}`)
    const model = await req.Model.create(req.body)

    // 3.返回token
    const newUser = await AdminUser.findOne({ username }).select('+password')
    const token = jwt.sign({ id: newUser._id }, app.get('secret'))
    const id = newUser._id
    res.send({ token, id })
  })


  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}