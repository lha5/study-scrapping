const puppeteer = require('puppeteer');
const fs = require('fs');

const keywordJson = require('./keywords/001.json');

let i = 0;
const j = i + 1000;

function repeater() {
  let keyword = keywordJson[i].keyword;

  if (i === j) {
    return console.log('끝');
  } else {
    dataGrapper(keyword).then(repeater);
    i++;
  }
}

function dataGrapper(keyword) {
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      console.log('검색 할 키워드:: ', keyword);

      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
    
        let data = [];
        let prevData = {};
        
        await page.goto(`https://search.shopping.naver.com/_next/data/c1rZd9HIrRxZrFpEg8uGa/search/all.json?query=${keyword}`);
    
        let temporaryData = await page.$('pre');
    
        prevData = await page.evaluate(data => data.textContent, temporaryData);
        prevData.slice(0, 1);
        prevData.slice(0, -1);
    
        data.push(prevData);
        
        fs.writeFile(`./data/001/1-0/${keyword}.json`, data, error => {
          if (error) {
            console.log('파일 생성 실패 ', error);
          }
        });
        
        await browser.close();
      })();    
      resolve();
    }, 700);
  })
}

repeater();
