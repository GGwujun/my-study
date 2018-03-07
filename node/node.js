var http = require('https');
var purl = 'https://coding.m.imooc.com/';
var swiperUrL = 'https://m.imooc.com/';
var classUrl = 'https://m.imooc.com/course/list';
var savePath = 'C:/Users/gwj12/Desktop/two-week/app/example/static/entries.js';
var fs = require('fs');
var cheerio = require('cheerio');
var ENTRIES1 = [], ENTRIES2 = [], list = [];

/**
 * 
 * @param {*string} path 
 * @param {*string} data 
 */

function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, function (err) {
            if (err) {
                return reject(err);
            }
            resolve("index.html was saved!");
        });
    })
}



/**
 * 
 * @param {*string} url 
 */

function getHtml(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            var html = '';
            res.on('data', data => html += data);
            res.on('end', () => resolve(html))
        }).on('error', () => reject('错误'))
    })
}

const flitSwiper = (html) => {
    var i = 0;
    var $ = cheerio.load(html);
    var chapters = $('.banner .swiper-slide');
    chapters.each((index, element) => {
        var chapterImg = $(element).find('img').attr('src');
        index = index++;
        ENTRIES1.push({
            id: index,
            uri: `https:${chapterImg}`
        })
    })
    var ENTRIES1Str = `export const ENTRIES1 = ${JSON.stringify(ENTRIES1)};`;
    return ENTRIES1Str

}

const filtClass = (html) => {
    var i = 0;
    var $ = cheerio.load(html);
    var chapters = $('.wbb-content');

    chapters.each((index, item) => {
        var chapterUl = $(item).find('li');
        chapterUl.each((indexi, items) => {
            ++i;
            var img = $(items).find('.course-img').css('background-image').split("(")[1].split(")")[0];
            var title = $(items).find('.course-label').text();
            ENTRIES2.push({
                id: i,
                title: title,
                uri: `https:${img}`
            })
        })
    })
    var ENTRIES2Str = `export const ENTRIES2 = ${JSON.stringify(ENTRIES2)};`;
    return ENTRIES2Str
}

const filtP = (html) => {
    var i = 0;
    var $ = cheerio.load(html);
    var chapters = $('.course-list dd');
    chapters.each((index, item) => {
        var id = $(item).find('a').attr('href').split('cid=')[1];
        var chapterImg = $(item).find('.course-img-bg').attr('data-original');
        var chapterTitle = $(item).find('.class-name').text();
        var chapterDesc = $(item).find('.class-desc').text();
        var chapterPrice = $(item).find('.now-price').text();
        index = index++;
        list.push({
            id: id,
            image: `https:${chapterImg}`,
            title: chapterTitle,
            content: chapterDesc,
            url: `https:${chapterImg}`,
            type: 1
        })
    })
    var listStr = `export const list = ${JSON.stringify(list)};`;
    return listStr
}

let funMap = {
    0: filtP,
    1: flitSwiper,
    2: filtClass
}

Promise
    .all([getHtml(purl), getHtml(swiperUrL), getHtml(classUrl)])
    .then(function (results) {
        var htmlStr = '';
        results.forEach(function (element, index) {
            htmlStr += funMap[index](element)
        });
        writeFile(savePath, htmlStr)
    });



