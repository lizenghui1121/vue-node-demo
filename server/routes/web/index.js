module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  const Hero = mongoose.model('Hero')
  const Video = mongoose.model('Video')
  const Strategy = mongoose.model('Strategy')

  // 新闻资讯初始化
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻分类"
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ["策划有话说丨聊聊荣耀战力计算规则的优化", "寻找“峡谷参谋”丨来线下玩家交流活动，见策划&amp;大神主播，赢专属局内称号", "云中君源·梦皮肤海报投票活动开启公告", "【预告】三雄会面，山雨欲来？", "【S20赛季皮肤爆料】醍醐杖·老夫子", "6月18日体验服停机更新公告", "6月17日净化游戏环境声明及处罚公告", "6月17日外挂专项打击公告", "6月17日“演员”惩罚名单", "腾讯游戏扩大人脸识别技术探索的公告", "恭喜TS夺得2020年KPL春季赛总冠军，多重福利来袭", "应援KPL春决得好礼，上官婉儿-天狼绘梦者即将开售", "【破浪前行吧英雄们】活动开启公告", "参与活动免费解锁KPL限定皮肤个人专属购买6折特权", "新英雄蒙恬上架，多重好礼等你解锁", "无惧挑战向阳而生，TS冠军之夜今日18:00惊喜来袭", "虎牙明星主播踢馆名校战队，峡谷高材生与学霸的荣耀对决", "2020年KPL春季赛常规赛最佳阵容及最佳选手评选方式公布", "2020年KPL春季赛季后赛赛程赛制公布，5月28日16:00热血开战", "【原创内容大赛音乐比赛】优秀作品合集（二）"]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title: title
      }
    })
    res.send(newsList)
    await Article.deleteMany({})
    await Article.insertMany(newsList)
  })

  // 获取新闻列表
  router.get('/news/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name: "新闻分类"
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    // res.send(parent)
    const parent = await Category.findOne({
      name: "新闻分类"
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: {
            $slice: ['$newsList', 5]
          }
        }
      }
    ])
    const subcats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subcats }
      }).populate('categories').limit(5).lean()
    })
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
        return news
      })
    })
    res.send(cats)
  })

  // 导入英雄
  router.get('/heroes/init', async (req, res) => {
    await Hero.deleteMany({})
    const raw_data_1 = [{ "name": "热门", "heroes": [{ "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "安琪拉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "妲己", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "伽罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" }] }, { "name": "战士", "heroes": [{ "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "曹操", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg" }, { "name": "典韦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" }, { "name": "宫本武藏", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg" }, { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "老夫子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg" }, { "name": "关羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg" }, { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "刘备", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg" }, { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "杨戬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg" }, { "name": "雅典娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg" }, { "name": "哪吒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "狂铁", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg" }, { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "李信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg" }, { "name": "盘古", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg" }, { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }, { "name": "曜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg" }, { "name": "马超", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" }, { "name": "蒙恬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg" }] }, { "name": "法师", "heroes": [{ "name": "小乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" }, { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "妲己", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "嬴政", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg" }, { "name": "高渐离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg" }, { "name": "孙膑", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "扁鹊", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg" }, { "name": "芈月", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "周瑜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg" }, { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "武则天", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg" }, { "name": "貂蝉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "安琪拉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "姜子牙", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "王昭君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg" }, { "name": "张良", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg" }, { "name": "不知火舞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "诸葛亮", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg" }, { "name": "干将莫邪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg" }, { "name": "女娲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg" }, { "name": "杨玉环", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "弈星", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg" }, { "name": "米莱狄", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg" }, { "name": "司马懿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "沈梦溪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg" }, { "name": "上官婉儿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "嫦娥", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }, { "name": "西施", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg" }] }, { "name": "坦克", "heroes": [{ "name": "廉颇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg" }, { "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "刘禅", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "白起", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg" }, { "name": "芈月", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "项羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg" }, { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "刘邦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "牛魔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "太乙真人", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "东皇太一", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "梦奇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" }, { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "嫦娥", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }, { "name": "猪八戒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg" }] }, { "name": "刺客", "heroes": [{ "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "阿轲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg" }, { "name": "李白", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg" }, { "name": "貂蝉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "兰陵王", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg" }, { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "不知火舞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "娜可露露", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg" }, { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "百里守约", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "百里玄策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg" }, { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "元歌", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg" }, { "name": "司马懿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "上官婉儿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }, { "name": "马超", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" }, { "name": "镜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg" }] }, { "name": "射手", "heroes": [{ "name": "孙尚香", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" }, { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "马可波罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg" }, { "name": "狄仁杰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg" }, { "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "李元芳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg" }, { "name": "虞姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg" }, { "name": "成吉思汗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg" }, { "name": "黄忠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg" }, { "name": "百里守约", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "公孙离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg" }, { "name": "伽罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" }, { "name": "蒙犽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg" }] }, { "name": "辅助", "heroes": [{ "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "刘禅", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "孙膑", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "姜子牙", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "牛魔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "蔡文姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg" }, { "name": "太乙真人", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "大乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg" }, { "name": "鬼谷子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg" }, { "name": "明世隐", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg" }, { "name": "杨玉环", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "盾山", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg" }, { "name": "瑶", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg" }, { "name": "鲁班大师", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg" }] }]
    // 根据name去重
    function unique(data){
      const nameSet = new Set()
      let res = []
      for(let item of data) {
        if(item.name === '热门'){
          res.push(item)
          continue
        }
        let tempheros = {
          name: item.name,
          heroes: []
        }
        for(let hero of item.heroes) {
          if (!nameSet.has(hero.name)) {
            nameSet.add(hero.name)
            tempheros.heroes.push(hero)
          }
        }
        res.push(tempheros)
      }
      console.log(res[res.length-1])
      return res
    }
    const raw_data = unique(raw_data_1)
    for (let cat of raw_data) {
      if (cat.name === "热门") {
        continue
      }
      // 找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name: cat.name
      })
      cat.heroes.map(hero => {
        hero.categories = [category]
        return hero
      })
      // 录入英雄
      await Hero.insertMany(cat.heroes)
    }
    res.send(await Hero.find())
  })


  // 英雄列表
  router.get('/heroes/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name: "新闻分类"
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    // res.send(parent)
    const parent = await Category.findOne({
      name: "英雄分类"
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      }
    ])
    const subcats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: { $in: subcats }
      }).limit(10).lean()
    })

    res.send(cats)
  })

  // 导入视频
  router.get('/videos/init', async (req, res) => {
    await Video.deleteMany({})
    const raw_data = [{"name":"精品栏目","videos":[{"title":"【狄仁杰封神榜】第四期：峡谷开挂 勿谓言之不预也","image":"https://itea-cdn.qq.com/file/tgl/2020062009/21c0cf8c88569b21ed5be726034b7e03.1592617960.24dc1145faeaa2113501062e44e1ba4f.640x272_147975.jpg","num":5172349},{"title":"【峡谷460】04: 拖米遭遇“非法”组队？孤影上演正道的光！","image":"https://shp.qpic.cn/cfwebcap/0/02c3fd5876c336ee85af00a6c56ce7a8/0/?width=230&height=140","num":5899090},{"title":"【百星王者带你飞】第140期赵云：贯穿乱世的雷霆，赵子龙参见","image":"https://itea-cdn.qq.com/file/tgl/2020061510/a8f73a12cdddf0f835c47d97c73a52de.1592188633.15e72c082819a0786ed173da018bbb04.230x140_13164.jpg","num":8152711},{"title":"【狄仁杰封神榜】第三期：某峡谷治安官 为何立下自裁Flag","image":"https://shp.qpic.cn/cfwebcap/0/e41680ea8e6d6f6aedcafa5a3d0521f8/0/?width=230&height=140","num":9462880}]},{"name":"英雄攻略","videos":[{"title":"王者荣耀s16边路上分英雄首选是谁？职业玩家都玩的英雄橘子！","image":"https://puui.qpic.cn/qqvideo_ori/0/p0904oeyu12_1280_720/0","num":1268591},{"title":"王者荣耀排位日常：功能型法师张良，更偏向于控制，多游走支援！","image":"https://itea-cdn.qq.com/file/tgl/20190831/34ba14d7e74b333126620db8148b7a4a.1567236016.96cfd48480b6f569f5deb0869ddd8925.230x140_43156.jpg","num":3302031},{"title":"在这个模式玩钟馗，不想成辅助都难哦！","image":"https://itea-cdn.qq.com/file/tgl/20190828/c81e728d9d4c2f636f067f89cc14862c.1566979174.49877d84db3db2e7e7c9dec467347647.230x140_16202.jpg","num":6850459},{"title":"猴子和兰陵王遇到神级马可，连续的反杀操作，打得两人没有脾气","image":"https://itea-cdn.qq.com/file/tgl/20190829/0fed9150bb660fe087fc5b81a2b8d50b.1567084750.7a6176cf4229f5978f81c252e59b1c71.230x140_19614.jpg","num":8476189}]},{"name":"赛事精品","videos":[{"title":"【超神快讯1+1】英凯详细解刨TS 5S阵容，神秘嘉宾助阵超神快讯1+1","image":"https://shp.qpic.cn/cfwebcap/0/0e68efba7431c19681b564df1a3dae30/0/?width=230&height=140","num":7031461},{"title":"【荣耀宅急送】21：披荆斩棘不止奇迹，恭喜TS！","image":"https://itea-cdn.qq.com/file/tgl/2020061620/7e55c9c77a02ef6912881dea124e0e7c.1592310411.97d2328ffc87a769091ef540d39624ef.230x140_63922.jpg","num":5487784},{"title":"【王者炸麦了】成都AG超玩会&amp;TS 谁更会毒奶？","image":"https://shp.qpic.cn/cfwebcap/0/929f73b8140623ac10bc43dad86b09ea/0/","num":2842698},{"title":"【荣耀大话王V】第3期 狠话环节没看够？这次再多亿点点…","image":"https://shp.qpic.cn/cfwebcap/0/6b92e6705ba9d70e4f08f19fee9e16c6/0/?width=230&height=140","num":6866692}]},{"name":"赛事视频","videos":[{"title":"王者荣耀世冠：远游之枪华丽收割，花满楼世冠马可波罗击杀集锦","image":"https://puui.qpic.cn/qqvideo_ori/0/z092122i7uv_1280_720/0","num":6621640},{"title":"Djie一闪侧翼进场，梦奇小爪子疯狂乱舞！","image":"https://puui.qpic.cn/qqvideo_ori/0/g0921jhs0ha_1280_720/0","num":3921173},{"title":"花海云中君暴走时刻，这波三杀真的帅气！","image":"https://puui.qpic.cn/qqvideo_ori/0/r09212zlrm4_1280_720/0","num":948465},{"title":"世冠雨雨关羽集锦：这就是实力！千万雄兵莫敢当，单刀匹马斩四方","image":"https://puui.qpic.cn/qqvideo_ori/0/b0921yawkou_1280_720/0","num":7160710}]}]
    
    for (let cat of raw_data) {
      
      // 找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name: cat.name
      })
      cat.videos.map(video => {
        video.categories = [category]
        return video
      })
      // 录入英雄
      await Video.insertMany(cat.videos)
    }
    res.send(await Video.find())
  })

  // 视频列表
  router.get('/videos/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name: "新闻分类"
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    // res.send(parent)
    const parent = await Category.findOne({
      name: "视频分类"
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'videos',
          localField: '_id',
          foreignField: 'categories',
          as: 'videoList'
        }
      }
    ])
    // const subcats = cats.map(v => v._id)
    // cats.unshift({
    //   name: '热门',
    //   heroList: await Hero.find().where({
    //     categories: { $in: subcats }
    //   }).limit(10).lean()
    // })
    res.send(cats)
  })

  // 导入攻略
  router.get('/strategies/init', async (req, res) => {
    await Strategy.deleteMany({})
    const raw_data = [{"name":"最新","strategies":[{"title":"攻略篇|如何做才是真正的“帮优不帮劣”？","image":"https://itea-cdn.qq.com/file/tgl/2020062015/d9526b501f1db0c29bd079bee42b0b13.1592636939.89f927f0b8ae30cfc4f5c9bc20a0eec4.230x140_75882.png","description":"攻略篇|如何做才是真正的“帮优不帮劣”？"},{"title":"《战斗吧！世冠》今日19:00首播，世冠直播综艺等你来看！","image":"https://shp.qpic.cn/cfwebcap/0/a15a6d04b68a56f824bfc06f5491b9ed/0/?width=230&height=140","description":"顶尖队伍云集为你带来精彩对决，但是对世冠战队不够深入了解怎么办？别担心！《战队吧！世冠》来为大家指路啦，6月21日起每周一期，由你最喜爱的解说和嘉宾们带你看世冠！"},{"title":"是鱼是鲲只有你自己说了才算","image":"https://itea-cdn.qq.com/file/tgl/2020062013/527846af342e16db4e050725a7a8a3fb.1592630521.28fb7ad2e25786c0b2a02355eabbb77f.230x140_73582.png","description":"是鱼是鲲只有你自己说了才算"},{"title":"1级最强边路，不是铠，不是狂铁，不是程咬金，而是你嫌弃他！","image":"https://img.crawler.qq.com/lolwebvideo/0/52fb9d9c6988ba40c56e613e440311cc1592707069/0/","description":"1级最强边路，不是铠，不是狂铁，不是程咬金，而是你嫌弃他！"},{"title":"王者荣耀：下周更新或调整10位英雄，五位加强，小明射手体系削弱","image":"https://img.crawler.qq.com/lolwebvideo/0/7bcbaef99019cb884502a46ed2ea155e1592706967/0/","description":"王者荣耀：下周更新或调整10位英雄，五位加强，小明射手体系削弱"},{"title":"王者模拟战职业大师赛快讯：双末世射手阵容近乎无敌，三星后羿火力全开如入无人之境","image":"https://shp.qpic.cn/cfwebcap/0/cf43af04f09c7abab713da2d464f4d9b/0/?width=230&height=140","description":"王者模拟战职业大师赛突围赛正式启动，6月20日进行突围赛第二轮的对抗，以下为今日比赛的快讯。"},{"title":"峡谷端午上河图","image":"https://shp.qpic.cn/cfwebcap/0/3a82427568ed281fca5045bfedeaecea/0/?width=230&height=140","description":""},{"title":"体验服：王者荣耀再度加强，先是廉颇史诗级，这次轮到金属风暴了","image":"https://itea-cdn.qq.com/file/tgl/2020061610/d3d9446802a44259755d38e6d163e820.1592274503.f296685c34d9b84489e0026d40f3c259.230x140_45723.jpg","description":"体验服：王者荣耀再度加强，先是廉颇史诗级，这次轮到金属风暴了"},{"title":"皮肤爆料|马超五虎上将限定皮肤——神威，以雷霆之名，威震峡谷","image":"https://itea-cdn.qq.com/file/tgl/2020062016/dc5d17a94fcbb04904905887e7f5159f.1592640121.c069320fe77a99943fdcc0c5fc785bca.230x140_59430.jpg","description":"皮肤爆料|马超五虎上将限定皮肤——神威，以雷霆之名，威震峡谷"},{"title":"爆料：马超“神威”上线时间确定，特效炸裂，560即可拿下","image":"https://itea-cdn.qq.com/file/tgl/2020062013/712924289d866fb54fe2a792c72c435c.1592632529.c12cfe64f0337aa1d8f75fd95bf2cfa2.230x140_76037.png","description":"爆料：马超“神威”上线时间确定，特效炸裂，560即可拿下"},{"title":"最具性价比的六元皮肤，快看看你有几个？","image":"https://itea-cdn.qq.com/file/tgl/2020062017/7d483586ba3559ccd90c420e2c439174.1592644537.2840e54df0ef16b9d1b2e6c4a522ba62.230x140_76745.png","description":"最具性价比的六元皮肤，快看看你有几个？"},{"title":"【画师觉醒】也不知道该叫公孙婉儿还是该叫上官离","image":"https://itea-cdn.qq.com/file/tgl/2020062020/c93e1c2efb53b65f0d3c6aca5482e35d.1592655962.0107510a3fc1219e2e89256bae36f2f1.230x140_39707.jpg","description":"【画师觉醒】也不知道该叫公孙婉儿还是该叫上官离"},{"title":"王者荣耀：瑶受人欢迎？光给野王加buff这1点，就值得排T1","image":"https://itea-cdn.qq.com/file/tgl/2020061922/ea9610ab0327a24930761e8af66feb86.1592577148.770e4de8ecc7788bf83a207b08ad008c.230x140_45954.jpg","description":"王者荣耀：瑶受人欢迎？光给野王加buff这1点，就值得排T1"},{"title":"巅峰国服|国服弈星：听说你叫蒙恬，很是嚣张？","image":"https://itea-cdn.qq.com/file/tgl/2020061922/b7769e456952d8439ecc5ffe4269534e.1592576922.df779a5705516f66b253056f22de81e9.230x140_56375.jpg","description":"巅峰国服|国服弈星：听说你叫蒙恬，很是嚣张？"},{"title":"王者荣耀之最终幻想230章：无欢喝醉了（连载中）","image":"https://itea-cdn.qq.com/file/tgl/2020061614/c81e728d9d4c2f636f067f89cc14862c.1592287251.147b73afebd3276e91023077d7a6e90f.230x140_33990.jpg","description":"王者荣耀之最终幻想230章：无欢喝醉了（连载中）"},{"title":"辅助位全段位上分攻略，威哥教你利用阵容克制稳稳的上分策略","image":"https://itea-cdn.qq.com/file/tgl/2020062016/883146fd95be2e8cc51b2a698bc1d922.1592640416.667310932884412aebd38abb999f302a.230x140_58842.jpg","description":"辅助位全段位上分攻略，威哥教你利用阵容克制稳稳的上分策略"}]},{"name":"英雄","strategies":[{"title":"女王出品 | 为肉辅发声！辅助类型与肉辅玩法全解析","image":"https://itea-cdn.qq.com/file/tgl/20190827/4b9fb5615512ad71115ed062e599de01.1566889716.90134ab702c29ce46151b5a8654f999b.230x140_12605.jpg","description":"女王出品 | 为肉辅发声！辅助类型与肉辅玩法全解析"},{"title":"新赛季辅助上分优选，没有坦克选廉颇，选孙膑不用看阵容","image":"https://itea-cdn.qq.com/file/tgl/20190807/d3d9446802a44259755d38e6d163e820.1565174139.3a8f697382408c962d68db29594e8c43.184x124_66404.jpg","description":"新赛季辅助上分优选，没有坦克选廉颇，选孙膑不用看阵容"},{"title":"S16上分法师首选诸葛亮，安琪拉一控到死，她团控全场！","image":"https://itea-cdn.qq.com/file/tgl/20190807/b93e5dee4a244e287388983768cc9e0a.1565192507.db0887289226b225c731b9e837014842.230x140_23723.jpg","description":"S16上分法师首选诸葛亮，安琪拉一控到死，她团控全场！"},{"title":"世冠上路都用啥？孙策橘右京已经不是首选，最强势的根本猜不到","image":"https://itea-cdn.qq.com/file/tgl/20190803/9d70f1cf5e7587ab741eaef46597c305.1564839804.47e16b7bbe41d270aba329d78b45d22f.230x140_57850.jpg","description":"世冠上路都用啥？孙策橘右京已经不是首选，最强势的根本猜不到"},{"title":"S16一个合格辅助需要完成的六件事，能全部完成的不超过10%！","image":"https://shp.qpic.cn/cfwebcap/0/425196ebdeca54b84c54a20c0c5c7cae/0/?width=230&height=140","description":"俗话说“低分看打野，高分看辅助”，辅助作为一个团队的大脑，需要做的事情并不比打野少，有时候玩起来比打野还累。之所以有时候会被说成混分巨兽，这是因为有很多玩家都没有领悟到一个辅助到底该干什么。\n今天给大家讲解一下S16赛季辅助的六大任务，让大家快速对辅助这个位置有一个全新的认知。"},{"title":"Hero兵法讲堂：刺客篇","image":"https://shp.qpic.cn/cfwebcap/0/760ea7e6667ce5065b305b0134e8041a/0/?width=230&height=140","description":"Hero兵法讲堂：刺客篇"},{"title":"王者荣耀：射手遇到兰陵王都颤抖？，这几位却让他有来无回","image":"https://itea-cdn.qq.com/file/tgl/20190802/22348f642503adaf7d3641928e6ef285.1564728271.05622b4e034fc6ddd20662b94fc3444f.230x140_17371.jpg","description":"王者荣耀：射手遇到兰陵王都颤抖？，这几位却让他有来无回"},{"title":"营地数据榜：射手榜首易主，狄仁杰微调第二都没保住，他后来居上","image":"https://itea-cdn.qq.com/file/tgl/20190802/c8070d27b86aa1bc7489142aa8d82a55.1564753294.ef6375f0e332fb24e691953f741a5f05.230x140_19218.jpg","description":"营地数据榜：射手榜首易主，狄仁杰微调第二都没保住，他后来居上"}]},{"name":"新手","strategies":[{"title":"王者荣耀除了需要熟练度，常见细节技巧分享，高端局玩家都知道","image":"https://itea-cdn.qq.com/file/tgl/20190724/bf58dde0eae7ed9a9d0f34398114b549.1563953637.749d4f23ff7944ce316231955293f7f4.230x140_64704.jpg","description":"王者荣耀除了需要熟练度，常见细节技巧分享，高端局玩家都知道"},{"title":"王者荣耀：超强实战中路游走技巧，学好三大原则轻松上分","image":"https://itea-cdn.qq.com/file/tgl/20190715/02e74f10e0327ad868d138f2b4fdd6f0.1563167064.84d08c51c719aea1ab113f9b80921bb6.230x140_88394.jpg","description":"王者荣耀：超强实战中路游走技巧，学好三大原则轻松上分"},{"title":"全英雄铭文搭配思路，干货教程-战士篇","image":"https://itea-cdn.qq.com/file/tgl/20190713/22c25c4f633efd5c33709cc12e60ac9b.1562949914.01a72a26af86b805b1cbde5c6fda25fe.230x140_18586.jpg","description":"全英雄铭文搭配思路，干货教程-战士篇"},{"title":"全英雄铭文搭配思路，干货教程-刺客+辅助篇","image":"https://itea-cdn.qq.com/file/tgl/20190713/cd53d53ef16137b6446a595b0c09b808.1562950751.0786380e3ce07bee8ce71cd7ee82f1e3.230x140_16668.jpg","description":"全英雄铭文搭配思路，干货教程-刺客+辅助篇"}]},{"name":"官方","strategies":[{"title":"马超：兄弟的热血不会白流，西凉的纯洁我来守护","image":"https://shp.qpic.cn/cfwebcap/0/6a1420625349827f075de3b38d89ff3d/0/?width=230&height=140","description":""},{"title":"王者荣耀首批金牌特权门店现已上线","image":"https://shp.qpic.cn/cfwebcap/0/952e1b385c626f1a6f54bf12d974c25a/0/?width=230&height=140","description":""},{"title":"吃喝玩 赚一夏 来王者人生享暑期豪礼！","image":"https://shp.qpic.cn/cfwebcap/0/7cd4951fdcf9a47779a8175fa73c7af1/0/?width=230&height=140","description":"打游戏赚品牌优惠，承包你的吃喝玩乐；\n到店开黑，满级铭文、特权英雄、皮肤免费用；\n福利抽奖，百分百有奖；"},{"title":"英雄故事 | 孙膑：为了我的挚友，流动吧，时间之力！","image":"https://shp.qpic.cn/cfwebcap/0/b0bfa37d5549734d96debd154358888b/0/?width=230&height=140","description":""},{"title":"云中君vs瑶：隔着一颗眼泪，也看不清生死的羁绊","image":"https://shp.qpic.cn/cfwebcap/0/27cdca796c0f520fbce6f61536d1cb51/0/?width=230&height=140","description":""},{"title":"中二少年的独白：我就是想证明自己","image":"https://shp.qpic.cn/cfwebcap/0/0b2742a68d0c30046a9b751b2c1733ae/0/?width=230&height=140","description":""},{"title":"王者世界观体验站更新！绝密档案已曝光","image":"https://shp.qpic.cn/cfwebcap/0/b179d7510c7e2a1087c043766a972c3f/0/?width=230&height=140","description":""},{"title":"英雄故事 | 曜-星辰之子","image":"https://shp.qpic.cn/cfwebcap/0/8006f57e49f156441ca43784b8644d04/0/?width=230&height=140","description":""},{"title":"稷下学院 | 诸葛学长带你逛母校","image":"https://shp.qpic.cn/cfwebcap/0/9e5fbde7944361ae0a81c01142a11c1e/0/?width=230&height=140","description":""},{"title":"王者大陆行 | 云中漠地-都护府","image":"https://shp.qpic.cn/cfwebcap/0/baea4fbea5add7ab7404e23d7650e104/0/?width=230&height=140","description":""},{"title":"王者大陆行 | 云中漠地-千窟城","image":"https://shp.qpic.cn/cfwebcap/0/a75eca0408b2ef7a81f0ad4add6b611a/0/?width=230&height=140","description":""},{"title":"英雄故事 | 云中君：小鹿女，你的谎言我都懂","image":"https://shp.qpic.cn/cfwebcap/0/150adce63d4d8f0c7575f3e88d852255/0/?width=230&height=140","description":""},{"title":"王者荣耀：最考验意识的三位辅助，新手玩不好，大神当成宝！","image":"https://itea-cdn.qq.com/file/tgl/20190802/6da9003b743b65f4c0ccd295cc484e57.1564734748.c412f7ff79ce5118fc6c0f2dc7bc21f8.230x140_22324.jpg","description":"王者荣耀：最考验意识的三位辅助，新手玩不好，大神当成宝！"},{"title":"王者荣耀：射手出肉会更强？打惯了输出装的，不妨来看看吧！","image":"https://itea-cdn.qq.com/file/tgl/20190801/6da9003b743b65f4c0ccd295cc484e57.1564635606.8cf7fc5a37204778f7abb641d3396c36.230x140_22161.jpg","description":"王者荣耀：射手出肉会更强？打惯了输出装的，不妨来看看吧！"},{"title":"上分秘诀之射手，站桩射手的三件法宝！后羿实战打法简介！","image":"https://itea-cdn.qq.com/file/tgl/20190731/b0ca4eff978167e0f1953fcea8832d3f.1564566213.f0663874be6d1c54418f87519ae9c4b4.230x140_44966.jpg","description":"上分秘诀之射手，站桩射手的三件法宝！后羿实战打法简介！"},{"title":"草丛两个小可爱喜迎增强，妲己安琪拉下限再次提升，中路上分首选","image":"https://itea-cdn.qq.com/file/tgl/20190801/cfcd208495d565ef66e7dff9f98764da.1564663108.3ae6598382d0152ff4ecdeaff5c05109.230x140_23155.jpg","description":"草丛两个小可爱喜迎增强，妲己安琪拉下限再次提升，中路上分首选"},{"title":"鞋子作为6大神装之一，每人必出，但你真的对它研究过吗？","image":"https://itea-cdn.qq.com/file/tgl/20190713/ccb3d22a44e997e6b33296013a6383b3.1562987847.75d1dc343f85e661887755df3db8ef76.230x140_20839.jpg","description":"鞋子作为6大神装之一，每人必出，但你真的对它研究过吗？"},{"title":"王者荣耀：领悟装备中“唯一被动”的意思，别再被说不会出装了","image":"https://itea-cdn.qq.com/file/tgl/20190709/4134d9e2acb614ea98c12902490a8541.1562656487.ad2289a391fbeb879ae38941f82af8bf.230x140_16538.jpg","description":"王者荣耀：领悟装备中“唯一被动”的意思，别再被说不会出装了"},{"title":"王者荣耀：如何成为一名优秀的上单玩家？这十点意识你必须掌握！","image":"https://itea-cdn.qq.com/file/tgl/20190710/0ac88cfa3358a41a848a0996ba2980d1.1562760261.c6b7c09ebef1df462c7df296aa94cc46.230x140_7096.jpg","description":"王者荣耀：如何成为一名优秀的上单玩家？这十点意识你必须掌握！"},{"title":"王者荣耀：常用铭文搭配，真的很详细啦","image":"https://itea-cdn.qq.com/file/tgl/20190628/4134d9e2acb614ea98c12902490a8541.1561707086.1aea7d895e4c6afdca57e1547e6becfd.230x140_16538.jpg","description":"王者荣耀：常用铭文搭配，真的很详细啦"},{"title":"上分攻略︱这件装备虽然冷门，但却是射手英雄的翻盘利器！","image":"https://itea-cdn.qq.com/file/tgl/20190623/c81e728d9d4c2f636f067f89cc14862c.1561227097.8ed946a29c732181c6c469af7bd4a3ff.230x140_49973.jpg","description":"上分攻略︱这件装备虽然冷门，但却是射手英雄的翻盘利器！"},{"title":"王者荣耀：上单第一件出暗影战斧，难怪守塔守不住","image":"https://itea-cdn.qq.com/file/tgl/20190618/d612ae2e1245a287f727b3b758d70e9f.1560835832.6ea731298b68e947584a4a511fcf84f3.230x140_12022.jpg","description":"王者荣耀：上单第一件出暗影战斧，难怪守塔守不住"},{"title":"王者荣耀：很难出的装备，破晓ADC必出，破军看情况，贤者尴尬","image":"https://itea-cdn.qq.com/file/tgl/20190613/c81e728d9d4c2f636f067f89cc14862c.1560392596.4ac5f197c8c25020e1fec1e540afdf83.230x140_19684.jpg","description":"王者荣耀：很难出的装备，破晓ADC必出，破军看情况，贤者尴尬"},{"title":"王者荣耀S15法师通用铭文 新赛季法师铭文怎么搭配","image":"https://itea-cdn.qq.com/file/tgl/20190614/d64288cca2eed9b7fa8762d4822490f7.1560500295.0b3a8d01ce4aa02db7571f43e92598a1.230x140_19501.jpg","description":"王者荣耀S15法师通用铭文 新赛季法师铭文怎么搭配"},{"title":"打野修炼手册：作为打野，如何呼风唤雨，掌控节奏，拿下胜利？","image":"https://itea-cdn.qq.com/file/tgl/20190524/4dd8f10a65df6c0daadd17d9785d257f.1558712716.32f439e02d6092b071215d7b89d32355.230x140_5469.jpg","description":"打野修炼手册：作为打野，如何呼风唤雨，掌控节奏，拿下胜利？"},{"title":"【虎扑攻略】S15五排最简单上分法则：拒绝花里胡哨，保护我方输出","image":"https://shp.qpic.cn/cfwebcap/0/0b32c8593bcb7baf62365634c0c7493c/0/?width=230&height=140","description":"虎扑攻略"},{"title":"玩辅助不会站位开视野？这里教你轻松学会辅助的所有视野站位","image":"https://itea-cdn.qq.com/file/tgl/20190517/424de7a8a3c9bb09f108f4f24d597297.1558087000.ade3dafb7c7a4f67049e151830a3f768.230x140_9427.jpg","description":"玩辅助不会站位开视野？这里教你轻松学会辅助的所有视野站位"},{"title":"哪些装备好用？真正的作用你清楚吗？","image":"https://itea-cdn.qq.com/file/tgl/20190517/291e57f744222bcb7e7254061eb6d36b.1558070541.71ceed3d48109b68f78b5718e22e984e.230x140_50682.jpg","description":"哪些装备好用？真正的作用你清楚吗？"},{"title":"英雄故事 | 云中君：不是天使，胜是天使","image":"https://shp.qpic.cn/cfwebcap/0/4994706713e802d3b4985bfe52e51a2a/0/?width=230&height=140","description":""},{"title":"英雄小传 | 第一个全程飞的英雄，必承受更多痛苦！","image":"https://shp.qpic.cn/cfwebcap/0/3a877748232c96c1711904f872b88737/0/?width=230&height=140","description":"英雄小传 | 第一个全程飞的英雄，必承受更多痛苦！"},{"title":"王者大陆行 | 云中漠地-玉城","image":"https://shp.qpic.cn/cfwebcap/0/adade14f5990bc18d0e024dd8a175d27/0/?width=230&height=140","description":"王者大陆行 | 云中漠地-玉城"},{"title":"英雄故事 | 瑶-过去生于未来","image":"https://shp.qpic.cn/cfwebcap/0/33b05fb59efff9b2a4619dc3e1ea4ff7/0/?width=230&height=140","description":"英雄故事 | 瑶-过去生于未来"}]},{"name":"同人","strategies":[{"title":"《创世王者》——长城之战五   庆功宴","image":"https://itea-cdn.qq.com/file/tgl/20190829/eacd38458cfba7d1012065af5c0141d4.1567058487.cd3eda659d3b0371dc9376e2ca4b0625.230x140_80409.png","description":"《创世王者》——长城之战五   庆功宴"},{"title":"露娜 紫霞仙子 孙悟空 至尊宝cos：往哪跑？","image":"https://itea-cdn.qq.com/file/tgl/20190831/9c4e28a00fab8e6ff485c82daf7a1861.1567183527.a0dd21dbf3ca582cc920bc4d2f647d20.230x140_67799.JPG","description":"露娜 紫霞仙子 孙悟空 至尊宝cos：往哪跑？"},{"title":"同人插画：马超帅出新高度，面对千军万马无所畏惧","image":"https://itea-cdn.qq.com/file/tgl/20190828/3667f6a0c97490758d7dc9659d01ea34.1566958747.878a495b915f940ae21952408e90acdb.230x140_38067.jpg","description":"同人插画：马超帅出新高度，面对千军万马无所畏惧"},{"title":"我家李白不可能那么可爱31  夜猎1","image":"https://itea-cdn.qq.com/file/tgl/20190827/d63d9f8016e03a8d913cf6f4b6b1c02c.1566918578.b2f8d75c2c36b0383450330ed9fe1236.230x140_15097.jpg","description":"我家李白不可能那么可爱31  夜猎1"},{"title":"沈括｜多观察小地图这事，800年前他就懂！","image":"https://itea-cdn.qq.com/file/tgl/20190826/b6d767d2f8ed5d21a44b0e5886680cb9.1566806415.ede419ca10ee5ec66cde7d8ee4f77513.230x140_61786.png","description":"沈括｜多观察小地图这事，800年前他就懂！"},{"title":"王者荣耀：第48章  苏烈大战钟馗，百里玄策巧妙助战","image":"https://itea-cdn.qq.com/file/tgl/20190826/9521c1d7b2b90c010b533b0680e571c1.1566812249.dea17c7564ef2ccee85656c0314efa54.230x140_94092.png","description":"王者荣耀：第48章  苏烈大战钟馗，百里玄策巧妙助战"},{"title":"《创世王者》——第十章   长城之战四   清扫工作","image":"https://itea-cdn.qq.com/file/tgl/20190826/eacd38458cfba7d1012065af5c0141d4.1566829001.0fa871e960418491afedeb6028686f08.230x140_80409.png","description":"《创世王者》——第十章   长城之战四   清扫工作"},{"title":"王者小漫画：戏精的虞姬，项羽很无奈","image":"https://itea-cdn.qq.com/file/tgl/20190827/858635160cca233f0db06f0ee53df356.1566867252.27e00f816a40f98912b87d9df71a9662.230x140_72617.jpg","description":"王者小漫画：戏精的虞姬，项羽很无奈"},{"title":"【COS偶像季】第40期：蜕变的天鹅公主——小乔","image":"https://itea-cdn.qq.com/file/tgl/20190827/ca18223ccc9136c23ac25c3760d9954a.1566899068.2d3fa8f2cf03edec04dd4462a9682dfb.750x422_41845.jpg","description":"各位小主们好~今天喵酱为大家带来的是蜕变的天鹅公主——小乔"},{"title":"绝密公布！五虎上将团照上线！C位英雄居然有五把武器？！","image":"https://shp.qpic.cn/cfwebcap/0/10801fc69a79c3229961031e8a7af3a0/0/?width=230&height=140","description":"【五虎上将！集结！】五虎上将最后一位公布！！万众期待的马超性感上线~\n作者：鹿玖-小魏"},{"title":"同人文学：在路上——稷下学院的日常（番外一）{暑期篇}","image":"https://itea-cdn.qq.com/file/tgl/20190826/8799827c9418434cc47d7b6485e391f6.1566806457.73f25c65dfd871c72bdb516c4e0628e5.230x140_24708.jpg","description":"同人文学：在路上——稷下学院的日常（番外一）{暑期篇}"},{"title":"设计了一套稷下学院的现代风格校服","image":"https://itea-cdn.qq.com/file/tgl/20190824/90428f9bb1a9d0a64834195f7c5ac4cb.1566640478.1735f22f977d210b10da4c4a70ea1cd0.230x140_50770.jpg","description":"设计了一套稷下学院的现代风格校服"},{"title":"司马懿：黑夜是刺客潜行最好掩护，但冲破黑暗也需你足够的勇气！","image":"https://itea-cdn.qq.com/file/tgl/20190825/59349fcbec003eac9a992bcebd6ca9e3.1566705586.c4682cbc4447fcd54f58f28e89e2ee8f.230x140_13825.jpg","description":"司马懿：黑夜是刺客潜行最好掩护，但冲破黑暗也需你足够的勇气！"},{"title":"西施：就这样开始吧，曜，接下来还请多多指教呦，谢谢你","image":"https://itea-cdn.qq.com/file/tgl/20190825/7fb64646a792c3821388e79d189986eb.1566662469.ec1d6f757d56eae49d367ee77cc579c1.230x140_16918.jpg","description":"西施：就这样开始吧，曜，接下来还请多多指教呦，谢谢你0.0"},{"title":"【COS偶像季】第39期：青莲剑仙——李白","image":"https://itea-cdn.qq.com/file/tgl/20190823/6e7665f0778696a59cdc87c4ce9da604.1566543888.40999bce0e478634eda6ed2a51bc09a5.128x128_6670.jpg","description":"各位小主们好~今天喵酱为大家带来的是青莲剑仙——李白~"},{"title":"我的稷下学院   第六章   我赌你枪里没有子弹","image":"https://itea-cdn.qq.com/file/tgl/20190823/966a68ce35b7d043edb64b212c0cc441.1566575410.fbd21ef228a0174799e97e6720453598.230x140_16875.jpg","description":"我的稷下学院   第六章   我赌你枪里没有子弹"},{"title":"S16辅助国服荣耀战力排榜|鬼谷子稳居前三，黑马的她排在榜首","image":"https://itea-cdn.qq.com/file/tgl/20190731/6da9003b743b65f4c0ccd295cc484e57.1564558615.656819319d1c8b7b96b6be2137fb78b5.230x140_62701.jpg","description":"S16辅助国服荣耀战力排榜|鬼谷子稳居前三，黑马的她排在榜首"},{"title":"辅助英雄又引玩家们吐槽，三种出门思路到底该选哪一种好？","image":"https://itea-cdn.qq.com/file/tgl/20190731/903ce9225fca3e988c2af215d4e544d3.1564562825.6823dae008c0961396585188126858ce.230x140_14746.jpg","description":"辅助英雄又引玩家们吐槽，三种出门思路到底该选哪一种好？"},{"title":"峡谷小短腿，输出扛大旗——鲁班七号 进阶攻略","image":"https://shp.qpic.cn/cfwebcap/0/a8c46a69d38abc5c9892261e38185773/0/?width=230&height=140","description":"相信很多玩家都购买了S16的战令，在战令皮肤醒狮的加持下，很多玩家都会去试着重新接触这个被所有玩家调侃的小卤蛋。在几个版本的累积改动下，现阶段的鲁班除了无位移，已经是一个很成熟的射手英雄，具有后期超高的团战AOE输出，以及超强的前期推塔能力，发育能力，这篇攻略为大家带来鲁班的详细玩法。"},{"title":"S16上分三大辅助！用瑶拿金牌，用她稳星耀！他才是王者!","image":"https://itea-cdn.qq.com/file/tgl/20190730/0e5d3556154fd589bfd3fd1940ef2905.1564476384.d5ce7b3a5f6d90008d2e867cabddc0fc.230x140_58999.jpg","description":"S16上分三大辅助！用瑶拿金牌，用她稳星耀！他才是王者!"}]}]
    
    for (let cat of raw_data) {
      
      // 找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name: cat.name
      })
      cat.strategies.map(Strategy => {
        Strategy.categories = [category]
        return Strategy
      })
      // 录入英雄
      await Strategy.insertMany(cat.strategies)
    }
    res.send(await Strategy.find())
  })

  // 攻略列表
  router.get('/strategies/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name: "新闻分类"
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    // res.send(parent)
    const parent = await Category.findOne({
      name: "攻略分类"
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'strategies',
          localField: '_id',
          foreignField: 'categories',
          as: 'strategyList'
        }
      }
    ])
    // const subcats = cats.map(v => v._id)
    // cats.unshift({
    //   name: '热门',
    //   heroList: await Hero.find().where({
    //     categories: { $in: subcats }
    //   }).limit(10).lean()
    // })
    res.send(cats)
  })

  // 文章详情
  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).lean()
    data.related = await Article.find().where({
      categories: { $in: data.categories }
    }).limit(2)
    res.send(data)
  })


  // 英雄详情
  router.get('/heroes/:id', async (req, res) => {
    const data = await Hero
    .findById(req.params.id)
    .populate('categories items1 items2 summonerSkills mingwens partners.hero restrained.hero restrain.hero')
    .lean()
    res.send(data)
  })
  app.use('/web/api', router)
}