const Koa = require('koa');
const mongoose = require('mongoose');
const views = require('koa-views');
const {resolve} = require('path');
const {connect, initSchemas} = require('./database/init');

(async () => {
    await connect();
    initSchemas();
    const Movie = mongoose.model('Movie');
    const movies = await Movie.find({});
    console.log(movies)
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