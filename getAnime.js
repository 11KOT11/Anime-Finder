const puppeteer = require('puppeteer-extra');
const config = require('./config.json');
const { mkdirSync, writeFileSync } = require('fs')
module.exports = (async()=>{
    const browser = await puppeteer.launch({
        executablePath: './chrome-win/chrome.exe',
        headless: config.UIDisable,
        ignoreHTTPSErrors:true
    });
    const page = await browser.newPage();
    try {
    await page.goto('https://animego.org/anime/random', { timeout: 8000 });
    const anime = await page.evaluate(() =>{
        const rank = parseInt(document.querySelector('#itemRatingBlock > div.itemRatingBlock.d-inline-flex.align-items-center.mb-1.position-relative > div.pr-2 > div.rating-count').innerText);
        const name = document.querySelector('#content > div > div.media.mb-3.d-none.d-block.d-md-flex > div.media-body > div.anime-title > div > h1').innerText;
        const url = window.location.href;
        if(rank>=1000){
            return {"Названия":name,"Ссылка":url,"Кол-во голосов":rank}
        }
    });
    if(config.autosave==true){
        mkdirSync(`./animeList/${anime['Названия']}`);
        writeFileSync(`./animeList/${anime['Названия']}/url.txt`, anime['Ссылка']);
        await page.screenshot({ path: `./animeList/${anime['Названия']}/anime.png` });
    }
    await browser.close();
    return anime;
    } catch (e) {await browser.close()}
})