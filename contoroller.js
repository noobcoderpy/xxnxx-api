import fetch from "node-fetch";
import cheerio from 'cheerio'
import youtubedl from 'youtube-dl-exec'
export const TopList = async (num = 1) => {
    const res = await (await fetch(`https://es.xhamster3.com/pornstars/${num}`, { method: 'GET' })).text()
    const $ = cheerio.load(res)
    const page_count = $('ul.test-pager').find('li').eq(-2).text()

    const data = []

    const star = $('.pornstar-thumb-container').toArray()
    star.map((v, i) => {

        data.push({ channel_url: $(v).find('a.pornstar-thumb-container__image').attr('href'), name: v.attribs['data-name'].replace(/\n/g, '').replace(/ /g, ''), profilepic: $(v).find('img').attr('src'), viwes: $(v).find('.views').text().replace(/\n/g, '').replace(/ /g, ''), video_count: $(v).find('.videos').text().replace(/\n/g, '').replace(/ /g, ''), rank: $(v).find('.pornstar-thumb-container__place').text().replace(/\n/g, '').replace(/ /g, '') })
    })


    return ({ result: data, last_page: page_count.replace(/\n/g, '').replace(/ /g, '') });

}
export const channel = async (url) => {
    const res = await (await fetch(url)).text()
    const newst = await (await fetch(url + '/newest')).text()
    const best = await (await fetch(url + '/best')).text()
    const $ = cheerio.load(res)
    const video = $('.thumb-list__item').toArray()
    const sub = $('span.sub-button__counter').eq(0).text().replace(/\n/g, '').replace(/ /g, '');
    const data = { name: $('h1.category-title').text().replace(/\n/g, ''), rank: $('a.category-place').text().replace(/\n/g, '').replace(/ /g, ''), relname: $('.real-section').text().replace(/\n/g, ''), sub: sub, videos: { trending: [], Newest: [], Best: [] } }
    video.map((v, i) => {
        data.videos.trending.push({
            url: $(v).find('a').attr('href'),
            title: $(v).find('a.video-thumb-info__name').text().replace(/\n/g, '').replace(/ /g, ''),
            preview: $(v).find('a').attr('data-previewvideo'),
            img: $(v).find('img').attr('src'),
            duration: $(v).find('.thumb-image-container__duration').children('span').text().replace(/\n/g, '').replace(/ /g, ''),
            view: $(v).find('.views').children('span').text().replace(/\n/g, '').replace(/ /g, ''),
            rating: $(v).find('.rating').children('span').text().replace(/\n/g, '').replace(/ /g, '')
        })




    })
    const $1 = cheerio.load(newst)
    const video1 = $1('.thumb-list__item').toArray()
    video1.map((v, i) => {
        data.videos.Newest.push({
            url: $1(v).find('a').attr('href'),
            title: $1(v).find('a.video-thumb-info__name').text().replace(/\n/g, '').replace(/ /g, ''),
            preview: $1(v).find('a').attr('data-previewvideo'),
            img: $1(v).find('img').attr('src'),
            duration: $1(v).find('.thumb-image-container__duration').children('span').text().replace(/\n/g, '').replace(/ /g, ''),
            view: $1(v).find('.views').children('span').text().replace(/\n/g, '').replace(/ /g, ''),
            rating: $1(v).find('.rating').children('span').text().replace(/\n/g, '').replace(/ /g, '')
        })




    })
    const $2 = cheerio.load(best)
    const video2 = $2('.thumb-list__item').toArray()
    video2.map((v, i) => {
        data.videos.Best.push({
            url: $2(v).find('a').attr('href'),
            preview: $2(v).find('a').attr('data-previewvideo'),
            img: $2(v).find('img').attr('src'),
            title: $2(v).find('a.video-thumb-info__name').text().replace(/\n/g, '').replace(/ /g, ''),
            duration: $2(v).find('.thumb-image-container__duration').children('span').text().replace(/\n/g, '').replace(/ /g, ''),
            view: $2(v).find('.views').children('span').text().replace(/\n/g, '').replace(/ /g, ''),
            rating: $2(v).find('.rating').children('span').text().replace(/\n/g, '').replace(/ /g, '')
        })




    })
    return data
}
export const search = async (name) => {
    const res = await (await fetch(`https://xhamster3.com/search/${name}`)).text()
    const $ = cheerio.load(res)
    const video = $('.thumb-list__item').toArray()
    const data = []
    video.map((v, i) => {
        data.push({
            url: $(v).find('a').attr('href'),
            title: $(v).find('a.video-thumb-info__name').text().replace(/\n/g, '').replace(/ /g, ''),
            preview: $(v).find('a').attr('data-previewvideo'),
            img: $(v).find('img').attr('src'),
            duration: $(v).find('.thumb-image-container__duration').children('span').text().replace(/\n/g, '').replace(/ /g, ''),
            view: $(v).find('.views').children('span').text().replace(/\n/g, '').replace(/ /g, ''),
            rating: $(v).find('.rating').children('span').text().replace(/\n/g, '').replace(/ /g, '')
        })




    })
    return data
}
export const trending = async () => {
    const res = await (await fetch("https://xhamster3.com/")).text()

    const $ = cheerio.load(res)
    const video = $('.thumb-list__item').toArray()
    const data = []
    video.map((v, i) => {
        data.push({
            url: $(v).find('a').attr('href'),
            title: $(v).find('a.video-thumb-info__name').text().replace(/\n/g, '').replace(/ /g, ''),
            preview: $(v).find('a').attr('data-previewvideo'),
            img: $(v).find('img').attr('src'),
            duration: $(v).find('.thumb-image-container__duration').children('span').text().replace(/\n/g, '').replace(/ /g, ''),
            view: $(v).find('.views').children('span').text().replace(/\n/g, '').replace(/ /g, ''),
            rating: $(v).find('.rating').children('span').text().replace(/\n/g, '').replace(/ /g, '')
        })




    })
    return data
}
export const video = async (url) => {
    return await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
        referer: 'https://xhamster3.com/'
    })
}
