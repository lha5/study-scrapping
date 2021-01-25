const puppeteer = require('puppeteer');
const fs = require('fs');
// const Q = require('q');

const keywordJson = require('./keywords/001.json');
const tempData = require('./tempData');

// async function getKeywordInfo() {
//   for (let i = 200; i < 210; i++) {
//     (async () => {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
  
//       let data = [];
//       let prevData = {};
      
//       await page.goto(`https://search.shopping.naver.com/_next/data/c1rZd9HIrRxZrFpEg8uGa/search/all.json?query=${keywordJson[i].keyword}`);
  
//       let temporaryData = await page.$('pre');
  
//       prevData = await page.evaluate(data => data.textContent, temporaryData);
//       prevData.slice(0, 1);
//       prevData.slice(0, -1);
  
//       data.push(prevData);
      
//       fs.writeFile(`./data/keywords01/000/${keywordJson[i].keyword}.json`, data, error => {
//         if (error) {
//           console.log('파일 생성 실패 ', error);
//         }
//       });
      
//       await browser.close();
//     })();    
//     setTimeout(() => {
//     }, 500);
//   }
// }

let i = 400;
const j = i + 100;

function test() {
  let keyword = keywordJson[i].keyword;

  if (i === j) {
    return console.log('끝');
  } else {
    test1(keyword).then(test);
    i++;
  }
}

function test1(keyword) {
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
        
        fs.writeFile(`./data/keywords01/000/${keyword}.json`, data, error => {
          if (error) {
            console.log('파일 생성 실패 ', error);
          }
        });
        
        await browser.close();
      })();    
      resolve();
    }, 1000);
  })
}

test();
