const Koa = require('koa');
const views = require('koa-views');
const {resolve} = require('path');
const {connect} = require('./database/init');

(async () => {
    await connect()
})();

let app = new Koa()
app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}));

app.use(async (ctx, next)=>{
    await ctx.render('index',{
        title: 'test',
        name: 'emmmm'
    })
});

app.listen(5555);