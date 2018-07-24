const rp = require('request-promise-native');

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url);
    return res
}

(async () => {
    let movies = [
        { doubanId: 27034594,
            title: '少女☆歌剧 Revue Starlight',
            rate: 8.3,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2524422117.jpg' },
        { doubanId: 26366496,
            title: '邪不压正',
            rate: 7.1,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2526297221.jpg' }];
    movies.map(async (movie) => {
        let movieData = await fetchMovie(movie);
        try {
            movieData = JSON.parse(movieData);
        } catch (err) {
            console.log(err)
        }
        console.log(movieData.summary)
    })
    
})()

