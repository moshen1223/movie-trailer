const Koa = require('koa');
const mongoose = require('mongoose');
const views = require('koa-views');
const {resolve} = require('path');
const {connect, initSchemas} = require('./database/init');
const router = require('./routes');

(async () => {
    await connect();
    initSchemas();
    require('./tasks/api')
})();

let app = new Koa()
app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}));

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx, next)=>{
    await ctx.render('index',{
        title: 'test',
        name: 'emmmm'
    })
});

app.listen(5555);