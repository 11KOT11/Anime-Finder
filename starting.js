const animeGet = require('./getAnime');
const { readFileSync, writeFileSync } = require('fs');
const chalk = require('chalk');

console.log(chalk.blue(
`
█▄▄ █▄█   ▀█▀ █░█ █▀▀ █▄░█ █▀█ █▀▀ █ █▀
█▄█ ░█░   ░█░ █▀█ ██▄ █░▀█ █▄█ █▀░ █ ▄█
`)
);

let animeList = [];
const config = require('./config.json');
if(config.thread>5)console.log('Нельзя ставить больше пяти потоков!');
else for (let i=0;i<config.thread; i++)createAnime();


async function createAnime(){
    await animeGet().then((anime)=>{
        if(anime){
            animeList.push(anime);
        }
        return
    });
    if(config.log==true){
        console.clear();
        console.table(animeList)
    }
    await createAnime();
}
