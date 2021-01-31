const puppeteer = require('puppeteer');
const fs = require('fs');
const cheerio = require('cheerio');

const categorySelector = '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div.form_row:nth-child(1) > div';
const searchButton = '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > a';
const top500List = '#content > div.section_instie_area.space_top > div > div:nth-child(2) > div.section_insite_sub > div > div > div.rank_top1000_scroll > ul > li';
const nextButton = '#content > div.section_instie_area.space_top > div > div:nth-child(2) > div.section_insite_sub > div > div > div.top1000_btn_area > div > a.btn_page_next';

const timer = ms => new Promise(resolve => setTimeout(resolve, ms));

async function getKeyword(page, depth1) {
  const keywordData = [];

  console.log(depth1, '-----------┐');

  for (let i = 1; i <= 26; i++) {
    if (i === 1) {
      console.log(1, '번째');
    } else if (i > 1) {
      await page.click(nextButton);
      console.log(i, '번째');
    }

    const content = await page.content();
    const $ = cheerio.load(content);
    const tempData = $(top500List);

    tempData.each((idx, data) => {
      const temp = {};
  
      const keyword = $(data).find('a').text();
      const href = $(data).find('a').get();
      const rank = $(data).find('span.rank_top1000_num').text();
  
      temp.link = href[0].attribs['href'];
      temp.keyword = keyword.replace(rank, '');
      temp.keyword = temp['keyword'].replace('\\n', '');
      temp.keyword = temp['keyword'].trim();
  
      keywordData.push(temp);
    });
  }
  
  console.log(keywordData.length, '개 키워드');

  fs.writeFile(`./data/keyword/00${depth1}.json`, JSON.stringify(keywordData, null, 2), error => {
    if (error) {
      console.log('파일 생성 실패 ', error);
    }
  });
  
  console.log(depth1, '-----------┘');

  await timer(150);
}

async function click(page) {
  for (let i = 1; i <= 2; i++) {
    await page.click(`${categorySelector} > div:nth-child(1)`);
    await page.click(`${categorySelector} > div:nth-child(1) > ul > li:nth-child(${i})`);

    await timer(150);

    await page.click(searchButton);

    await timer(250);

    await getKeyword(page, i);

    await timer(250);
  }
}

function main() {
  (async () => {
    console.log('시작 ------------------------------------------------------------------------------- \\\\');
    console.log(' ');

    const browser = await puppeteer.launch({ headless: false });
    
    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 937
    });

    await page.goto(`https://datalab.naver.com/shoppingInsight/sCategory.naver`);

    await click(page);

    await browser.close();

    console.log(' ');
    console.log('종료 ------------------------------------------------------------------------------- //');
  })();
}

main();
