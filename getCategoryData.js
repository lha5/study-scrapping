const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');

const data1 = [];
const data2 = [];
const data3 = [];
const data4 = [];

const selector = '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div.form_row:nth-child(1) > div';

async function getFirst(page) {
  const checkLength1 = await page.$$(
    `${selector} > div:nth-child(1) > ul > li`,
  );

  console.log('첫 번째 카테고리 갯수 : ', checkLength1.length);

  const content = await page.content();
  const $ = cheerio.load(content);
  const first = $(`${selector} > div:nth-child(1) > ul > li`);

  first.each((idx, category) => {
    const temp = {};

    const title = $(category).find('a').text();
    const dataid = $(category).find('a').get();

    temp.cid = dataid[0].attribs['data-cid'];
    temp.categoryName = title;

    data1.push(temp);
  })

  console.log(data1);

  let count1 = 1;
  let timer1 = setTimeout(async function run1() {
    console.log('첫 번째 카테고리 ', count1, '번째');

    // await page.click(`${selector} > div:nth-child(1)`);
    // await page.click(
    //   `${selector} > div:nth-child(1) > ul > li:nth-child(${count1})`,
    // );

    count1++;
    
    timer1 = setTimeout(run1, 500);
    
    if (count1 > checkLength1.length) {
      clearTimeout(timer1);

      console.log(' ');
      console.log('종료 ------------------------------------------------------------------------------- //');
    }
  }, 500);
}

function getData() {
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
  })();
}

getData();
