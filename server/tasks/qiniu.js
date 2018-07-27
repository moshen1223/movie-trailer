const qiniu = require('qiniu');
const nanoid = require('nanoid');
const config = require('../config/config');

const bucket = config.qiniu.bucket;
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
const cfg = new qiniu.conf.Config();
const client = new qiniu.rs.BucketManager(mac, cfg);

const uploadToQiniu = async (url, key) => {
    return new Promise((resolve, reject) => {
        client.fetch(url, bucket, key, (err, ret, info) => {
            if(err){
                reject(err)
            } else {
                if (info.statusCode === 200) {
                    resolve({key})
                } else {
                    reject(info)
                }
            }
        })
    })
};

(async () => {
    let movies = [{ 
        video: 'http://vt1.doubanio.com/201807262120/009d7f934c4aaa9566f5dd5f04a7e992/view/movie/M/402330091.mp4',
        poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2526297221.jpg',
        doubanId: '26366496',
        cover: 'https://img3.doubanio.com/img/trailer/medium/2526489612.jpg' 
    }];
    movies.map(async movie => {
        if (movie.video && !movie.key) {
            try {
                let videoData = await uploadToQiniu(movie.video, nanoid()+'.mp4');
                let coverData = await uploadToQiniu(movie.cover, nanoid()+'.png');
                let posterData = await uploadToQiniu(movie.poster, nanoid()+'.png');
                if(videoData.key){
                    movie.videoKey = videoData.key;
                }
                if(coverData.key){
                    movie.coverKey = coverData.key;
                }
                if(posterData.key){
                    movie.posterKey = posterData.key;
                }
                console.log(movie)
                /**
                 * 
                 { 
                    video: 'http://vt1.doubanio.com/201807262120/009d7f934c4aaa9566f5dd5f04a7e992/view/movie/M/402330091.mp4',
                    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2526297221.jpg',
                    doubanId: '26366496',
                    cover: 'https://img3.doubanio.com/img/trailer/medium/2526489612.jpg',
                    videoKey: '9IZAFo0kFGkhcUtzPxdiO.mp4',
                    coverKey: 'ztwD_2cMq5SMvvXfmdFH1.png',
                    posterKey: 'mp1ZIxK2XRJ5nPc3yCRnu.png'
                }
                 */
            } catch(e) {
                console.log(e) 
            }
        }
    })
})