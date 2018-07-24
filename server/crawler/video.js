const base = `https://movie.douban.com/subject/`;
let doubanId = '26752088'
const videoBase =  `https://movie.douban.com/trailer/233315`

const puppeteer = require('puppeteer');

let sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
});

(async () => {
  console.log('start')
  let browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      dumpio: false
  });
  let page = await browser.newPage();
  await page.goto(base + doubanId,{
      waitUntil: 'networkidle2'
  });

  await sleep(1000);

  const result = await page.evaluate(()=>{
      var $ = window.$;
      var it = $('.related-pic-video');
      if(it && it.length){
          var link = it.attr('href');
          var cover = it.attr('style').split(/(?=https)/)[1].split(/(?=\?\))/)[0];
          return {
              link,
              cover
          }
      }
  })
  let video 
  if(result.link){
      await page.goto(result.link,{
          waitUntil: 'networkidle2'
      });
      await sleep(2000)
      video = await page.evaluate(()=>{
        var $ = window.$;
        var it = $('source');
        if(it && it.length){
            return it.attr('src');
        }
      })
  }
  const data = {
      video,
      doubanId,
      cover: result.cover
  }
  browser.close();

  process.send({data})
  process.exit(0)
})();