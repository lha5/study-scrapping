const puppeteer = require('puppeteer');
const fs = require('fs');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const Keyword = require('./model/Keyword');

const categorySelector = '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div.form_row:nth-child(1) > div';
const searchButton = '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > a';
const top500List = '#content > div.section_instie_area.space_top > div > div:nth-child(2) > div.section_insite_sub > div > div > div.rank_top1000_scroll > ul > li';
const nextButton = '#content > div.section_instie_area.space_top > div > div:nth-child(2) > div.section_insite_sub > div > div > div.top1000_btn_area > div > a.btn_page_next';

const timer = ms => new Promise(resolve => setTimeout(resolve, ms));

async function getKeywordFourth(page, depth2, depth3, depth4) {
  const keywordData4 = [];

  console.log(depth4, '-----------┐');

  for (let i = 1; i <= 25; i++) {
    if (i === 1) {
      // console.log(1, '번째');
    } else if (i > 1) {
      await page.click(nextButton);
      // console.log(i, '번째');
    }

    const content = await page.content();
    const $ = cheerio.load(content);
    const tempData = $(top500List);

    tempData.each((idx, data) => {
      const temp = {};
  
      const keyword = $(data).find('a').text();
      const href = $(data).find('a').get();
      const rank = $(data).find('span.rank_top1000_num').text();
  
      temp.cid = href[0].attribs['href'];
      temp.cid = temp['cid'].split('&cid=');
      temp.cid = temp['cid'][1];
      temp.keyword = keyword.replace(rank, '');
      temp.keyword = temp['keyword'].replace('\\n', '');
      temp.keyword = temp['keyword'].trim();

      keywordData4.push(temp);
      
      Keyword
        .create(temp)
        .then(keyword => {})
        .catch(err => console.log('DB에 데이터 생성 중 에러 발생:: ', err));
    });
  }
  
  console.log(keywordData4.length, '개 키워드');
  
  console.log(depth4, '-----------┘');

  await timer(150);
}

async function getKeyword(page, depth2, depth3) {
  const keywordData3 = [];

  console.log(depth3, '-----------┐');

  for (let i = 1; i <= 25; i++) {
    if (i === 1) {
      // console.log(1, '번째');
    } else if (i > 1) {
      await page.click(nextButton);
      // console.log(i, '번째');
    }

    const content = await page.content();
    const $ = cheerio.load(content);
    const tempData = $(top500List);

    tempData.each((idx, data) => {
      const temp = {};
  
      const keyword = $(data).find('a').text();
      const href = $(data).find('a').get();
      const rank = $(data).find('span.rank_top1000_num').text();
  
      temp.cid = href[0].attribs['href'];
      temp.cid = temp['cid'].split('&cid=');
      temp.cid = temp['cid'][1];
      temp.keyword = keyword.replace(rank, '');
      temp.keyword = temp['keyword'].replace('\\n', '');
      temp.keyword = temp['keyword'].trim();

      Keyword
        .create(temp)
        .then(keyword => {})
        .catch(err => console.log('DB에 데이터 생성 중 에러 발생:: ', err));
  
      keywordData3.push(temp);
    });
  }

  // fs.writeFile(`./data/keyword3/${depth2}-${depth3}.json`, JSON.stringify(keywordData3, null, 2), error => {
  //   if (error) {
  //     console.log('파일 생성 실패 ', error);
  //   }
  // });
  
  console.log(keywordData3.length, '개 키워드');
  
  console.log(depth3, '-----------┘');

  await timer(150);
}

async function select(page) {
  for (let idx = 2; idx <= 11; idx++) {
    await timer(1000);
    await page.click(`${categorySelector} > div:nth-child(1)`);
    await timer(1000);
    await page.click(`${categorySelector} > div:nth-child(1) > ul > li:nth-child(${idx})`);

    await timer(1000);

    const checkLength2 = await page.$$(
      `${categorySelector} > div:nth-child(2) > ul > li`,
    );
    console.log('[', idx, ']', '두 번째 카테고리 갯수:: ', checkLength2.length);

    for (let i = 1; i <= checkLength2.length; i++) {
      await page.click(`${categorySelector} > div:nth-child(2)`);
      await page.click(`${categorySelector} > div:nth-child(2) > ul > li:nth-child(${i})`);

      await timer(150);

      await page.click(searchButton);

      await timer(250);

      await getKeyword(page, null, i);

      await timer(150);

      // const checkLength3 = await page.$$(
      //   `${categorySelector} > div:nth-child(3) > ul > li`,
      // );
      // console.log('세 번째 카테고리 갯수:: ', checkLength3.length);

      // for (let j = 1; j <= checkLength3.length; j++) {
      //   await page.click(`${categorySelector} > div:nth-child(3)`);
      //   await page.click(
      //     `${categorySelector} > div:nth-child(3) > ul > li:nth-child(${j})`,
      //   );

      //   await timer(250);

      //   await page.click(searchButton);

      //   await timer(250);

      //   await getKeyword(page, i, j);

      //   if (await page.$(`${categorySelector} > div:nth-child(4)`)) {
      //     console.log('!! 네 번째 카테고리 있음 !!');

      //     await timer(250);

      //     const checkLength4 = await page.$$(
      //       `${categorySelector} > div:nth-child(4) > ul > li`,
      //     );
      //     for (let k = 1; k <= checkLength4.length; k++) {
      //       await page.click(`${categorySelector} > div:nth-child(4)`);
      //       await page.click(
      //         `${categorySelector} > div:nth-child(4) > ul > li:nth-child(${k})`,
      //       );

      //       await timer(250);

      //       await page.click(searchButton);

      //       await timer(250);

      //       await getKeywordFourth(page, i, j, k);

      //       await timer(250);
      //     }
      //   }

      //   await timer(250);
      // }
    }
  }
}

async function getFirst(page) {
  for (let i = 1; i <= 25; i++) {
    if (i === 1) {
      // console.log(1, '번째');
    } else if (i > 1) {
      await page.click(nextButton);
      // console.log(i, '번째');
    }

    const content = await page.content();
    const $ = cheerio.load(content);
    const tempData = $(top500List);

    tempData.each((idx, data) => {
      const temp = {};

      const keyword = $(data).find('a').text();
      const href = $(data).find('a').get();
      const rank = $(data).find('span.rank_top1000_num').text();

      temp.cid = href[0].attribs['href'];
      temp.cid = temp['cid'].split('&cid=');
      temp.cid = temp['cid'][1];
      temp.keyword = keyword.replace(rank, '');
      temp.keyword = temp['keyword'].replace('\\n', '');
      temp.keyword = temp['keyword'].trim();

      console.log(temp);

      Keyword
        .create(temp)
        .then((keyword) => {})
        .catch((err) => console.log('DB에 데이터 생성 중 에러 발생:: ', err));
    });
  }
}

async function getKeywordFirst(page) {
  for (let i = 1; i <= 11; i++) {
    await page.click(`${categorySelector} > div:nth-child(1)`);
    await page.click(`${categorySelector} > div:nth-child(1) > ul > li:nth-child(${i})`);

    await timer(150);

    await page.click(searchButton);
  
    await timer(250);

    console.log(i, '번째');

    await getFirst(page);

    await timer(250);
  }
}

function main() {
  mongoose
  .connect(
      'mongodb://localhost:27017/sellerbee',
      {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
      })
  .then(() => console.log('MongoDB is connected!'))
  .catch(err => console.log(err));

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

    await select(page);

    await browser.close();

    console.log(' ');
    console.log('종료 ------------------------------------------------------------------------------- //');
  })();
}

main();
