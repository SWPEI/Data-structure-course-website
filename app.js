const Koa = require('koa');//调用KOA模块

//引用bodyParser
//从网页上那数据
const bodyParser = require('koa-bodyparser');

const controller = require('./controller');//引用controller在相同文件夹里

const templating = require('./templating');

const app = new Koa();//koa框架

const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
//app.use ->加载...函数
// async异步 ctx接受异步对象
// 配置路由
//DB

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
//运行controller.js
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');


