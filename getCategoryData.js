const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');

const data1 = [];
const data2 = [];
const data3 = [];
const data4 = [];

const selector = '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div.form_row:nth-child(1) > div';

const timer = ms => new Promise(resolve => setTimeout(resolve, ms));

async function getThird(page, category1, category2) {
  const checkLength3 = await page.$$(`${selector} > div:nth-child(3) > ul > li`);

  const content = await page.content();
  const $ = cheerio.load(content);
  const third = $(`${selector} > div:nth-child(3) > ul > li`);

  third.each((idx, category) => {
    const temp = {};

    const title = $(category).find('a').text();
    const dataid = $(category).find('a').get();

    temp.cid = dataid[0].attribs['data-cid'];
    temp.categoryName = title;

    data3.push(temp);
  });

  for (let i = 1; i <= checkLength3.length; i++) {
    console.log('첫 번째 카테고리 ', category1, '두 번째 카테고리 ', category2, ' 세 번째 카테고리 ', i,'번째');

    await page.click(`${selector} > div:nth-child(3)`);
    await page.click(`${selector} > div:nth-child(3) > ul > li:nth-child(${i})`);

    await timer(100);

    if (await page.$(`${selector} > div:nth-child(4)`)) {
      const content = await page.content();
      const $ = cheerio.load(content);
      const fourth = $(`${selector} > div:nth-child(4) > ul > li`);

      console.log('네 번째 카테고리 갯수 : ', fourth.length);
    
      fourth.each((idx, category) => {
        const temp = {};
    
        const title = $(category).find('a').text();
        const dataid = $(category).find('a').get();
    
        temp.cid = dataid[0].attribs['data-cid'];
        temp.categoryName = title;
    
        data4.push(temp);
      });
    }

    await timer(200);
  }
}

async function getSecond(page, category1) {
  const checkLength2 = await page.$$(`${selector} > div:nth-child(2) > ul > li`);

  const content = await page.content();
  const $ = cheerio.load(content);
  const second = $(`${selector} > div:nth-child(2) > ul > li`);

  second.each((idx, category) => {
    const temp = {};

    const title = $(category).find('a').text();
    const dataid = $(category).find('a').get();

    temp.cid = dataid[0].attribs['data-cid'];
    temp.categoryName = title;

    data2.push(temp);
  });

  for (let i = 1; i <= checkLength2.length; i++) {
    await page.click(`${selector} > div:nth-child(2)`);
    await page.click(`${selector} > div:nth-child(2) > ul > li:nth-child(${i})`);

    await timer(100);

    await getThird(page, category1, i);

    await timer(200);
  }
}

async function getFirst(page) {
  const checkLength1 = await page.$$(`${selector} > div:nth-child(1) > ul > li`);

  // console.log('첫 번째 카테고리 갯수 : ', checkLength1.length);

  // const content = await page.content();
  // const $ = cheerio.load(content);
  // const first = $(`${selector} > div:nth-child(1) > ul > li`);

  // first.each((idx, category) => {
  //   const temp = {};

  //   const title = $(category).find('a').text();
  //   const dataid = $(category).find('a').get();

  //   temp.cid = dataid[0].attribs['data-cid'];
  //   temp.categoryName = title;

  //   data1.push(temp);
  // });

  // fs.writeFile(`./data/category/001.json`, JSON.stringify(data1, null, 2), error => {
  //   if (error) {
  //     console.log('파일 생성 실패 ', error);
  //   }
  // });

  for (let i = 1; i <= checkLength1.length; i++) {
    await page.click(`${selector} > div:nth-child(1)`);
    await page.click(`${selector} > div:nth-child(1) > ul > li:nth-child(${i})`);

    await timer(250);

    await getSecond(page, i);

    await timer(500);
  }

  fs.writeFile(`./data/category/002.json`, JSON.stringify(data2, null, 2), error => {
    if (error) {
      console.log('파일 생성 실패 ', error);
    }
  });

  fs.writeFile(`./data/category/003.json`, JSON.stringify(data3, null, 2), error => {
    if (error) {
      console.log('파일 생성 실패 ', error);
    }
  });

  fs.writeFile(`./data/category/004.json`, JSON.stringify(data4, null, 2), error => {
    if (error) {
      console.log('파일 생성 실패 ', error);
    }
  });

  await timer(500);
}

function getCategory() {
  (async () => {
    console.log('시작 ------------------------------------------------------------------------------- \\\\');
    console.log(' ');

    const browser = await puppeteer.launch({ headless: true });
    
    const page = await browser.newPage();

    // await page.setViewport({
    //   width: 1920,
    //   height: 937
    // });

    await page.goto(`https://datalab.naver.com/shoppingInsight/sCategory.naver`);

    await getFirst(page);

    await browser.close();

    console.log(' ');
    console.log('종료 ------------------------------------------------------------------------------- //');
  })();
}

getCategory();
