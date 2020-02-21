
let Koa = require('koa')
let KoaRouter = require('koa-router');
let fly = require("flyio")


const app = new Koa();
const router = new KoaRouter();


let demoData = require('./datas/demo');
//引入数据

router.get('/demo', (ctx, next) => {
  ctx.body = demoData
});

//分类右侧内容对应数据
let cateLists = require('./datas/cateLists.json')
router.get('/cateLists', (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = cateLists
});

//分类左侧导航数据
let cateNavDatas = require('./datas/cateNavDatas.json')
router.get('/cateNavDatas', (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = cateNavDatas
});

//主页推荐 对应数据
let indexList = require('./datas/index.json')
router.get('/indexList', (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set("Access-Control-Allow-Origin","*");
    //允许的header类型
  ctx.set("Access-Control-Allow-Headers","content-type");
  ctx.body = indexList
});

//主页模块nav横向滑块对应数据
let indexCateModule = require('./datas/indexCateModule.json')
router.get('/indexCateModule', (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = indexCateModule
});

//点击商品搜索
router.get('/searchList', async (ctx, next) => {
	// ctx.set('Access-Control-Allow-Origin', '*')
	let result = await fly.post('https://m.you.163.com/xhr/search/init.json')
	ctx.body = result.data
});



app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen('4000', () => {
  console.log('服务器启动成功');
  console.log('服务器地址: http://localhost:4000');
})