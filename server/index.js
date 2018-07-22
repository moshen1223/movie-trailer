const Koa = require('koa')
let app = new Koa()
const views = require('koa-views')
const {resolve} = require('path')

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))

app.use(async (ctx, next)=>{
    await ctx.render('index',{
        title: 'test',
        name: 'emmmm'
    })
})

app.listen(5555)