const { readdirSync } = require('fs');
let error={}
readdirSync('./').map(e=>{
    if(e.split('.')[1]=='js'&&e!='run.js'){
        try {
            require(`./${e}`)
            error[e]={status: '✅', error: 'none'};
        } catch (err) {
            error[e]={status: '❌', error: err.toString().split('').slice(0,70).join('')+'...'};
        }
    }
})
console.table(error);